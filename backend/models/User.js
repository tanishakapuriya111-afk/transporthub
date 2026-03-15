const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String },
  googleId: { type: String, unique: true, sparse: true },
  displayName: { type: String },
  role: { type: String, default: 'user' },
  city: { type: String },
  phone: { type: String },
  utype: { type: String, default: 'user' },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
