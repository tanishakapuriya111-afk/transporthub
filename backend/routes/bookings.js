const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const User = require('../models/User');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// @route   POST /api/bookings
// @desc    Create new booking (User)
// @access  Private
router.post('/', authenticateToken, async (req, res) => {
  try {
    const bookingData = {
      ...req.body,
      userId: req.user.id
    };

    const booking = new Booking(bookingData);
    await booking.save();

    // Populate user data
    await booking.populate('userId', 'displayName email');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
});

// @route   GET /api/bookings
// @desc    Get all bookings (Admin) or user's own bookings (User)
// @access  Private
router.get('/', authenticateToken, async (req, res) => {
  try {
    let query = {};
    
    // If not admin, only show user's own bookings
    if (req.user.role !== 'admin') {
      query.userId = req.user.id;
    }

    const bookings = await Booking.find(query)
      .populate('userId', 'displayName email phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error('Fetch bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
});

// @route   GET /api/bookings/track/:trackingNumber
// @desc    Track booking by tracking number (Public)
// @access  Public
router.get('/track/:trackingNumber', async (req, res) => {
  try {
    const booking = await Booking.findOne({ 
      trackingNumber: req.params.trackingNumber 
    }).populate('userId', 'displayName email');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Track booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error tracking booking',
      error: error.message
    });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get single booking by ID
// @access  Private
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('userId', 'displayName email phone');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns this booking or is admin
    if (req.user.role !== 'admin' && booking.userId._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this booking'
      });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Fetch booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error: error.message
    });
  }
});

// @route   PUT /api/bookings/:id
// @desc    Update booking (Admin only)
// @access  Private/Admin
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('userId', 'displayName email phone');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking updated successfully',
      booking
    });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating booking',
      error: error.message
    });
  }
});

// @route   PATCH /api/bookings/:id/status
// @desc    Update booking status (Admin only)
// @access  Private/Admin
router.patch('/:id/status', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('userId', 'displayName email phone');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Status updated successfully',
      booking
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating status',
      error: error.message
    });
  }
});

// @route   DELETE /api/bookings/:id
// @desc    Delete booking (Admin only)
// @access  Private/Admin
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting booking',
      error: error.message
    });
  }
});

// @route   GET /api/bookings/stats/dashboard
// @desc    Get comprehensive dashboard statistics (Admin only)
// @access  Private/Admin
router.get('/stats/dashboard', authenticateToken, isAdmin, async (req, res) => {
  try {
    // Basic counts
    const totalBookings = await Booking.countDocuments();
    const totalUsers = await User.countDocuments();
    const pending = await Booking.countDocuments({ status: 'pending' });
    const confirmed = await Booking.countDocuments({ status: 'confirmed' });
    const inTransit = await Booking.countDocuments({ status: 'in-transit' });
    const delivered = await Booking.countDocuments({ status: 'delivered' });
    const cancelled = await Booking.countDocuments({ status: 'cancelled' });

    // Calculate total revenue (assuming weight-based pricing)
    const bookings = await Booking.find();
    const totalRevenue = bookings.reduce((sum, booking) => {
      let price = 0;
      if (booking.serviceType === 'express') price = booking.weight * 150;
      else if (booking.serviceType === 'overnight') price = booking.weight * 200;
      else if (booking.serviceType === 'international') price = booking.weight * 300;
      else price = booking.weight * 100; // standard
      return sum + price;
    }, 0);

    // Get last 7 days bookings trend
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      
      const count = await Booking.countDocuments({
        createdAt: { $gte: date, $lt: nextDay }
      });
      
      last7Days.push({
        date: date.toISOString().split('T')[0],
        bookings: count
      });
    }

    // Service type distribution
    const serviceTypes = await Booking.aggregate([
      {
        $group: {
          _id: '$serviceType',
          count: { $sum: 1 }
        }
      }
    ]);

    // Package type distribution
    const packageTypes = await Booking.aggregate([
      {
        $group: {
          _id: '$packageType',
          count: { $sum: 1 }
        }
      }
    ]);

    // Recent bookings
    const recentBookings = await Booking.find()
      .populate('userId', 'displayName email')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      stats: {
        totalBookings,
        totalUsers,
        totalRevenue: Math.round(totalRevenue),
        activeBookings: pending + confirmed + inTransit,
        statusDistribution: {
          pending,
          confirmed,
          inTransit,
          delivered,
          cancelled
        },
        bookingsTrend: last7Days,
        serviceTypes: serviceTypes.map(s => ({
          name: s._id || 'Unknown',
          value: s.count
        })),
        packageTypes: packageTypes.map(p => ({
          name: p._id || 'Unknown',
          value: p.count
        })),
        recentBookings: recentBookings.map(b => ({
          id: b._id,
          trackingNumber: b.trackingNumber,
          customerName: b.customerName,
          status: b.status,
          serviceType: b.serviceType,
          createdAt: b.createdAt
        }))
      }
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
});

module.exports = router;
