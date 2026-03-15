const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('../config/passport');
const { sendResetEmail } = require('../config/email');

const signToken = (user) => {
  const payload = { id: user._id.toString(), email: user.email, displayName: user.displayName, role: user.role };
  const secret = process.env.JWT_SECRET || 'devsecret';
  return jwt.sign(payload, secret, { expiresIn: '7d' });
};

const userDTO = (u) => ({
  id: u._id.toString(),
  email: u.email,
  displayName: u.displayName,
  role: u.role,
  createdAt: u.createdAt,
  hasPassword: !!u.passwordHash,
});

router.post('/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already in use' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash, displayName: username || email.split('@')[0] });

    const token = signToken(user);
    return res.status(201).json({ user: userDTO(user), token });
  } catch (e) {
    console.error('Register error:', e);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken(user);
    return res.json({ user: userDTO(user), token });
  } catch (e) {
    console.error('Login error:', e);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Step 1 – Request reset: generate token, email the link
router.post('/reset', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });
    // Always respond success to avoid email enumeration
    if (!user) return res.json({ success: true });

    // Google-only accounts have no password — nothing to reset
    if (user.googleId && !user.passwordHash) {
      return res.json({ success: true });
    }

    // Generate a random token and store its SHA-256 hash
    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

    user.resetToken = hashedToken;
    user.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    const frontendUrl = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
    const resetUrl = `${frontendUrl}/reset-password?token=${rawToken}`;

    await sendResetEmail(email, resetUrl);

    return res.json({ success: true });
  } catch (e) {
    console.error('Reset error:', e);
    return res.status(500).json({ message: 'Failed to send reset email' });
  }
});

// Step 2 – Complete reset: validate token, set new password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ message: 'Token and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Reset link is invalid or has expired' });
    }

    user.passwordHash = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return res.json({ success: true, message: 'Password reset successfully' });
  } catch (e) {
    console.error('Reset-password error:', e);
    return res.status(500).json({ message: 'Server error' });
  }
});

// ─── Google OAuth ────────────────────────────────────────────────────────────

// Step 1: Redirect to Google
router.get('/google', (req, res, next) => {
  // Save optional return URL in cookie (5 min TTL)
  if (req.query.state) {
    res.cookie('oauth_state', req.query.state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 5 * 60 * 1000,
    });
  }
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })(req, res, next);
});

// Step 2: Google callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/api/auth/google/failure',
  }),
  async (req, res) => {
    try {
      const frontendUrl = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';

      if (!req.user) {
        return res.redirect(`${frontendUrl}?error=google_auth_failed`);
      }

      const user = req.user;
      const secret = process.env.JWT_SECRET || 'devsecret';
      const token = jwt.sign(
        { id: user._id.toString(), email: user.email, displayName: user.displayName, role: user.role },
        secret,
        { expiresIn: '7d' }
      );

      const userPayload = {
        id: user._id.toString(),
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        createdAt: user.createdAt,
      };

      const returnUrl = req.cookies?.oauth_state || null;
      if (returnUrl) res.clearCookie('oauth_state');

      const data = encodeURIComponent(
        JSON.stringify({ token, user: userPayload, returnUrl })
      );

      return res.redirect(`${frontendUrl}/auth/callback?data=${data}`);
    } catch (error) {
      const frontendUrl = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
      return res.redirect(`${frontendUrl}?error=${encodeURIComponent(error.message || 'auth_failed')}`);
    }
  }
);

// Failure fallback
router.get('/google/failure', (req, res) => {
  const frontendUrl = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
  res.redirect(`${frontendUrl}?error=google_auth_failed`);
});

module.exports = router;
