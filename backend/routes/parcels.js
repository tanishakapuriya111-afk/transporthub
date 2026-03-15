const express = require('express');
const router = express.Router();
const Parcel = require('../models/Parcel');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// Get all parcels (Admin only)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const parcels = await Parcel.find()
      .sort({ createdAt: -1 })
      .populate('createdBy', 'email displayName');
    res.json(parcels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching parcels', error: error.message });
  }
});

// Get parcel by tracking number (Public)
router.get('/track/:trackNo', async (req, res) => {
  try {
    const parcel = await Parcel.findOne({ trackNo: req.params.trackNo });
    if (!parcel) {
      return res.status(404).json({ message: 'Parcel not found' });
    }
    res.json(parcel);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching parcel', error: error.message });
  }
});

// Create new parcel (Admin only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { cusName, destination, email, phoneCust, phoneReceiver, weight, qty, charge } = req.body;
    
    // Generate unique tracking number
    const trackNo = await Parcel.generateTrackingNumber();
    
    const parcel = new Parcel({
      cusName,
      destination,
      email,
      phoneCust,
      phoneReceiver,
      weight,
      qty,
      charge,
      trackNo,
      createdBy: req.user.id
    });
    
    await parcel.save();
    res.status(201).json({ 
      message: 'Parcel created successfully', 
      parcel,
      trackNo 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating parcel', error: error.message });
  }
});

// Update parcel (Admin only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { cusName, destination, email, phoneCust, phoneReceiver, weight, qty, charge, status, delivered } = req.body;
    
    const parcel = await Parcel.findByIdAndUpdate(
      req.params.id,
      {
        cusName,
        destination,
        email,
        phoneCust,
        phoneReceiver,
        weight,
        qty,
        charge,
        status,
        delivered
      },
      { new: true }
    );
    
    if (!parcel) {
      return res.status(404).json({ message: 'Parcel not found' });
    }
    
    res.json({ message: 'Parcel updated successfully', parcel });
  } catch (error) {
    res.status(500).json({ message: 'Error updating parcel', error: error.message });
  }
});

// Delete parcel (Admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const parcel = await Parcel.findByIdAndDelete(req.params.id);
    if (!parcel) {
      return res.status(404).json({ message: 'Parcel not found' });
    }
    res.json({ message: 'Parcel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting parcel', error: error.message });
  }
});

// Get parcel statistics (Admin only)
router.get('/stats/dashboard', authenticateToken, isAdmin, async (req, res) => {
  try {
    const totalParcels = await Parcel.countDocuments();
    const deliveredParcels = await Parcel.countDocuments({ delivered: true });
    const pendingParcels = await Parcel.countDocuments({ delivered: false });
    const inTransit = await Parcel.countDocuments({ status: 'in-transit' });
    
    res.json({
      totalParcels,
      deliveredParcels,
      pendingParcels,
      inTransit
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
});

module.exports = router;
