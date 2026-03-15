const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  // User Information
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  
  // Pickup Details
  pickupAddress: {
    type: String,
    required: true
  },
  pickupCity: {
    type: String,
    required: true
  },
  pickupDate: {
    type: Date,
    required: true
  },
  
  // Delivery Details
  deliveryAddress: {
    type: String,
    required: true
  },
  deliveryCity: {
    type: String,
    required: true
  },
  
  // Package Details
  packageType: {
    type: String,
    enum: ['document', 'parcel', 'freight', 'express'],
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  description: {
    type: String
  },
  
  // Booking Details
  serviceType: {
    type: String,
    enum: ['standard', 'express', 'overnight', 'international'],
    default: 'standard'
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'picked-up', 'in-transit', 'out-for-delivery', 'delivered', 'cancelled'],
    default: 'pending'
  },
  trackingNumber: {
    type: String,
    unique: true
  },
  estimatedCost: {
    type: Number
  },
  actualCost: {
    type: Number
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  
  // Additional Info
  notes: {
    type: String
  },
  adminNotes: {
    type: String
  }
}, {
  timestamps: true
});

// Generate unique tracking number
bookingSchema.statics.generateTrackingNumber = async function() {
  let trackingNumber;
  let exists = true;
  
  while (exists) {
    // Generate format: BK-YYYYMMDD-XXXX (e.g., BK-20250101-A5B7)
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    trackingNumber = `BK-${dateStr}-${randomStr}`;
    
    const booking = await this.findOne({ trackingNumber });
    exists = !!booking;
  }
  
  return trackingNumber;
};

// Auto-generate tracking number before saving
bookingSchema.pre('save', async function(next) {
  if (!this.trackingNumber) {
    this.trackingNumber = await this.constructor.generateTrackingNumber();
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
