const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function seedAdmin() {
  try {
    const email = process.env.ADMIN_EMAIL || 'admin@gmail.com';
    const password = process.env.ADMIN_PASSWORD || 'admin@123';

    let user = await User.findOne({ email });
    if (!user) {
      const passwordHash = await bcrypt.hash(password, 10);
      user = await User.create({
        email,
        passwordHash,
        displayName: 'Admin',
        role: 'admin',
      });
      console.log('Admin user created:', email);
    } else {
      let modified = false;
      if (user.role !== 'admin') {
        user.role = 'admin';
        modified = true;
      }
      if (modified) {
        await user.save();
        console.log('Admin role ensured for:', email);
      } else {
        console.log('Admin user exists:', email);
      }
    }
  } catch (e) {
    console.error('Admin seed error:', e.message);
  }
}

module.exports = { seedAdmin };
