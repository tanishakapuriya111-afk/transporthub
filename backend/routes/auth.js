const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

router.post('/reset', async (req, res) => {
  try {
    // Stubbed for now
    return res.json({ success: true });
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
