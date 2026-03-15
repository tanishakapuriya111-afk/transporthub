import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTruck, FaMapMarkerAlt, FaBox, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import bookingService from '../../services/bookingService';
import './BookingPage.scss';

const BookingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    // Customer Info
    customerName: '',
    email: '',
    phone: '',
    
    // Pickup Details
    pickupAddress: '',
    pickupCity: '',
    pickupDate: '',
    
    // Delivery Details
    deliveryAddress: '',
    deliveryCity: '',
    
    // Package Details
    packageType: 'parcel',
    weight: '',
    description: '',
    
    // Service
    serviceType: 'standard',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.customerName || !formData.email || !formData.phone) {
          toast.error('Please fill all customer details');
          return false;
        }
        return true;
      case 2:
        if (!formData.pickupAddress || !formData.pickupCity || !formData.pickupDate) {
          toast.error('Please fill all pickup details');
          return false;
        }
        return true;
      case 3:
        if (!formData.deliveryAddress || !formData.deliveryCity) {
          toast.error('Please fill all delivery details');
          return false;
        }
        return true;
      case 4:
        if (!formData.weight) {
          toast.error('Please enter package weight');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep()) return;

    setLoading(true);
    try {
      const bookingData = {
        ...formData,
        weight: parseFloat(formData.weight)
      };

      const response = await bookingService.createBooking(bookingData);
      
      toast.success(`Booking created! Tracking Number: ${response.booking.trackingNumber}`);
      
      // Redirect to tracking page or my bookings
      setTimeout(() => {
        navigate('/my-bookings');
      }, 2000);
      
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Customer Info', icon: <FaTruck /> },
    { number: 2, title: 'Pickup Details', icon: <FaMapMarkerAlt /> },
    { number: 3, title: 'Delivery Details', icon: <FaMapMarkerAlt /> },
    { number: 4, title: 'Package Details', icon: <FaBox /> },
    { number: 5, title: 'Confirm', icon: <FaCheckCircle /> }
  ];

  return (
    <div className="booking-page">
      <div className="booking-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="booking-header"
        >
          <h1>Book Transportation</h1>
          <p>Fill in the details to create your booking</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="progress-steps">
          {steps.map((s) => (
            <div
              key={s.number}
              className={`step ${step >= s.number ? 'active' : ''} ${step === s.number ? 'current' : ''}`}
            >
              <div className="step-icon">{s.icon}</div>
              <div className="step-title">{s.title}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {/* Step 1: Customer Info */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="form-step"
              >
                <h2>Customer Information</h2>
                
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="1234567890"
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="button" onClick={nextStep} className="btn-next">
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Pickup Details */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="form-step"
              >
                <h2>Pickup Details</h2>
                
                <div className="form-group">
                  <label>Pickup Address *</label>
                  <input
                    type="text"
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Pickup City *</label>
                  <input
                    type="text"
                    name="pickupCity"
                    value={formData.pickupCity}
                    onChange={handleChange}
                    placeholder="Mumbai"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Pickup Date *</label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="button" onClick={prevStep} className="btn-back">
                    Back
                  </button>
                  <button type="button" onClick={nextStep} className="btn-next">
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Delivery Details */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="form-step"
              >
                <h2>Delivery Details</h2>
                
                <div className="form-group">
                  <label>Delivery Address *</label>
                  <input
                    type="text"
                    name="deliveryAddress"
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    placeholder="456 Park Avenue"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Delivery City *</label>
                  <input
                    type="text"
                    name="deliveryCity"
                    value={formData.deliveryCity}
                    onChange={handleChange}
                    placeholder="Delhi"
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="button" onClick={prevStep} className="btn-back">
                    Back
                  </button>
                  <button type="button" onClick={nextStep} className="btn-next">
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Package Details */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="form-step"
              >
                <h2>Package Details</h2>
                
                <div className="form-group">
                  <label>Package Type *</label>
                  <select
                    name="packageType"
                    value={formData.packageType}
                    onChange={handleChange}
                    required
                  >
                    <option value="document">Document</option>
                    <option value="parcel">Parcel</option>
                    <option value="freight">Freight</option>
                    <option value="express">Express</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Weight (kg) *</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="5"
                    step="0.1"
                    min="0.1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Service Type *</label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    required
                  >
                    <option value="standard">Standard</option>
                    <option value="express">Express</option>
                    <option value="overnight">Overnight</option>
                    <option value="international">International</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Description (Optional)</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Brief description of package contents"
                    rows="3"
                  />
                </div>

                <div className="form-actions">
                  <button type="button" onClick={prevStep} className="btn-back">
                    Back
                  </button>
                  <button type="button" onClick={nextStep} className="btn-next">
                    Review
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Confirmation */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="form-step confirmation-step"
              >
                <h2>Review & Confirm</h2>
                
                <div className="review-section">
                  <h3>Customer Information</h3>
                  <p><strong>Name:</strong> {formData.customerName}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                </div>

                <div className="review-section">
                  <h3>Pickup Details</h3>
                  <p><strong>Address:</strong> {formData.pickupAddress}</p>
                  <p><strong>City:</strong> {formData.pickupCity}</p>
                  <p><strong>Date:</strong> {formData.pickupDate}</p>
                </div>

                <div className="review-section">
                  <h3>Delivery Details</h3>
                  <p><strong>Address:</strong> {formData.deliveryAddress}</p>
                  <p><strong>City:</strong> {formData.deliveryCity}</p>
                </div>

                <div className="review-section">
                  <h3>Package Details</h3>
                  <p><strong>Type:</strong> {formData.packageType}</p>
                  <p><strong>Weight:</strong> {formData.weight} kg</p>
                  <p><strong>Service:</strong> {formData.serviceType}</p>
                  {formData.description && (
                    <p><strong>Description:</strong> {formData.description}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Additional Notes (Optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any special instructions..."
                    rows="3"
                  />
                </div>

                <div className="form-actions">
                  <button type="button" onClick={prevStep} className="btn-back">
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className="btn-submit"
                    disabled={loading}
                  >
                    {loading ? 'Creating Booking...' : 'Confirm Booking'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
