const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const User = require('../models/User');

const userDTO = (u) => ({
  id: u._id.toString(),
  _id: u._id.toString(),
  email: u.email,
  displayName: u.displayName,
  username: u.displayName,
  role: u.role,
  phone: u.phone,
  city: u.city,
  createdAt: u.createdAt,
  hasPassword: !!u.passwordHash,
});

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json({ user: userDTO(user) });
});

router.put('/me', auth, async (req, res) => {
  const { displayName } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (displayName !== undefined) user.displayName = displayName;
  await user.save();
  return res.json({ user: userDTO(user) });
});

router.patch('/me/password', auth, async (req, res) => {
  try {
    const { password } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    const bcrypt = require('bcryptjs');
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.passwordHash = await bcrypt.hash(password, 10);
    await user.save();
    return res.json({ success: true, hasPassword: true });
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/me', auth, async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  return res.json({ success: true });
});

// Admin endpoints
router.get('/', auth, isAdmin, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.json({ users: users.map(userDTO) });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Create new user (Admin only)
router.post('/', auth, isAdmin, async (req, res) => {
  try {
    const { email, displayName, role, password, phone, city } = req.body;
    const bcrypt = require('bcryptjs');
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password || 'defaultPassword123', 10);
    
    const newUser = new User({
      email,
      passwordHash,
      displayName: displayName || email.split('@')[0],
      role: role || 'user',
      phone,
      city
    });
    
    await newUser.save();
    return res.status(201).json({ user: userDTO(newUser), message: 'User created successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// Update user (Admin only)
router.put('/:id', auth, isAdmin, async (req, res) => {
  try {
    const { email, displayName, role, password, phone, city } = req.body;
    const bcrypt = require('bcryptjs');
    
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Update fields
    if (email) user.email = email;
    if (displayName !== undefined) user.displayName = displayName;
    if (role && ['user', 'admin'].includes(role)) user.role = role;
    if (phone !== undefined) user.phone = phone;
    if (city !== undefined) user.city = city;
    if (password) {
      user.passwordHash = await bcrypt.hash(password, 10);
    }
    
    await user.save();
    return res.json({ user: userDTO(user), message: 'User updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

router.patch('/:id/role', auth, isAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ user: userDTO(user) });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

module.exports = router;
