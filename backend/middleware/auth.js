const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const header = req.headers['authorization'] || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    req.user = payload; // { id, email, displayName, role }
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const isAdmin = (req, res, next) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'lucky@gmail.com';
  if (req.user?.email === adminEmail || req.user?.role === 'admin') return next();
  return res.status(403).json({ message: 'Forbidden' });
};

module.exports = { auth, authenticateToken: auth, isAdmin };
