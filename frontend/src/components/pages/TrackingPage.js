import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './TrackingPage.scss';

const TrackingPage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    // Mock tracking data
    setTrackingResult({
      number: trackingNumber,
      status: 'In Transit',
      location: 'New York Distribution Center',
      estimatedDelivery: 'March 25, 2024',
      steps: [
        { status: 'Order Placed', date: 'Mar 20, 2024', completed: true },
        { status: 'Package Picked Up', date: 'Mar 21, 2024', completed: true },
        { status: 'In Transit', date: 'Mar 23, 2024', completed: true },
        { status: 'Out for Delivery', date: 'Pending', completed: false },
        { status: 'Delivered', date: 'Pending', completed: false }
      ]
    });
  };

  return (
    <div className="tracking-page">
      <section className="tracking-hero">
        <div className="tracking-hero__container">
          <motion.h1 className="tracking-hero__title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            Track Your Parcel
          </motion.h1>
          <motion.p className="tracking-hero__subtitle" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Enter your tracking number to get real-time updates
          </motion.p>
        </div>
      </section>

      <section className="tracking-form-section">
        <div className="tracking-form-section__container">
          <motion.div className="tracking-form-wrapper" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <form onSubmit={handleTrack} className="tracking-form">
              <input
                type="text"
                placeholder="Enter tracking number (e.g., 53327472734)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                required
                className="tracking-input"
              />
              <button
                type="submit"
                className="tracking-submit-btn"
              >
                Track Package
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {trackingResult && (
        <section className="tracking-result">
          <div className="tracking-result__container">
            <motion.div
              className="result-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="result-header">
                <h2>Tracking #{trackingResult.number}</h2>
                <span className="status-badge">{trackingResult.status}</span>
              </div>
              <div className="result-info">
                <p><strong>Current Location:</strong> {trackingResult.location}</p>
                <p><strong>Estimated Delivery:</strong> {trackingResult.estimatedDelivery}</p>
              </div>

              <div className="timeline">
                {trackingResult.steps.map((step, index) => (
                  <div key={index} className={`timeline-item ${step.completed ? 'completed' : ''}`}>
                    <div className="timeline-icon">
                      {step.completed ? '✓' : '○'}
                    </div>
                    <div className="timeline-content">
                      <h4>{step.status}</h4>
                      <p>{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default TrackingPage;
