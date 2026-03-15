const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const Contact = require('../models/Contact');

const contactDTO = (c) => ({
  id: c._id.toString(),
  name: c.name,
  email: c.email,
  company: c.company,
  subject: c.subject,
  message: c.message,
  createdAt: c.createdAt,
  status: c.status,
  read: c.read,
});

// Public contact submit
router.post('/', async (req, res) => {
  try {
    const { name, email, company, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const saved = await Contact.create({ name, email, company, subject, message });
    return res.status(201).json({ id: saved._id.toString(), message: 'Message sent successfully!' });
  } catch (e) {
    console.error('Create contact error:', e);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Admin list contacts
router.get('/', auth, isAdmin, async (req, res) => {
  try {
    const list = await Contact.find().sort({ createdAt: -1 });
    return res.json(list.map(contactDTO));
  } catch (e) {
    console.error('List contacts error:', e);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Admin mark as read
router.patch('/:id/read', auth, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Contact.findByIdAndUpdate(id, { read: true, status: 'read' }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    return res.json({ success: true });
  } catch (e) {
    console.error('Mark read error:', e);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
