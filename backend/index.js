const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectDB = require('./config/db');
const { seedAdmin } = require('./config/seed');
const passportConfig = require('./config/passport');

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const contactsRoutes = require('./routes/contacts');
const parcelsRoutes = require('./routes/parcels');
const bookingsRoutes = require('./routes/bookings');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session needed for Google OAuth flow
app.use(session({
  secret: process.env.SESSION_SECRET || 'transporthub-session-secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60, // 1 hour
  },
}));

app.use(passportConfig.initialize());
app.use(passportConfig.session());

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
