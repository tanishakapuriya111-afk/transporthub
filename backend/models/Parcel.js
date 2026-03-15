const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema({
  cusName: { 
    type: String, 
    required: true 
  },
  destination: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  phoneCust: { 
    type: String, 
    required: true 
  },
  phoneReceiver: { 
    type: String, 
    required: true 
  },
  weight: { 
    type: String, 
    required: true 
  },
  qty: { 
    type: String, 
    required: true 
  },
  charge: { 
    type: String, 
    required: true 
  },
  delivered: { 
    type: Boolean, 
    default: false 
  },
  trackNo: { 
    type: Number, 
    required: true, 
    unique: true 
  },
  status: {
    type: String,
    enum: ['pending', 'in-transit', 'out-for-delivery', 'delivered'],
    default: 'pending'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { 
  timestamps: true 
});

// Generate unique tracking number
parcelSchema.statics.generateTrackingNumber = async function() {
  let trackNo;
  let exists = true;
  
  while (exists) {
    // Generate 11-digit random number
    trackNo = Math.floor(10000000000 + Math.random() * 90000000000);
    const parcel = await this.findOne({ trackNo });
    exists = !!parcel;
  }
  
  return trackNo;
};

module.exports = mongoose.model('Parcel', parcelSchema);
