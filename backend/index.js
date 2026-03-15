const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { seedAdmin } = require('./config/seed');

dotenv.config();

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const contactsRoutes = require('./routes/contacts');
const parcelsRoutes = require('./routes/parcels');
const bookingsRoutes = require('./routes/bookings');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || '*'}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/parcels', parcelsRoutes);
app.use('/api/bookings', bookingsRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

(async () => {
  await connectDB();
  await seedAdmin();
  app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
  });
})();
