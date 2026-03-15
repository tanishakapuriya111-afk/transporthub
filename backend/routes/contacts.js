const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const Contact = require('../models/Contact');
const { sendReplyEmail } = require('../config/email');

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
  replyMessage: c.replyMessage,
  repliedAt: c.repliedAt,
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

// Admin reply to contact via email
router.post('/:id/reply', auth, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { replyMessage } = req.body;
    if (!replyMessage || !replyMessage.trim()) {
      return res.status(400).json({ message: 'Reply message is required' });
    }
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    await sendReplyEmail(contact.email, contact.name, contact.subject, replyMessage.trim());

    contact.status = 'replied';
    contact.read = true;
    contact.replyMessage = replyMessage.trim();
    contact.repliedAt = new Date();
    await contact.save();

    return res.json({ success: true, contact: contactDTO(contact) });
  } catch (e) {
    console.error('Reply contact error:', e);
    return res.status(500).json({ message: 'Failed to send reply email' });
  }
});

module.exports = router;
