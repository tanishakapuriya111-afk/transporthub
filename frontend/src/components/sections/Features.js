import React from 'react';
import { motion } from 'framer-motion';
import './Features.scss';

const Features = () => {
  const features = [
    {
      id: 1,
      title: 'Real-Time Tracking',
      description: 'Track your shipments 24/7 with our advanced GPS tracking system and get instant updates.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 2,
      title: 'Secure Delivery',
      description: 'Your packages are protected with insurance coverage and tamper-proof packaging.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 3,
      title: '24/7 Support',
      description: 'Our customer support team is available round the clock to assist you with any queries.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: 4,
      title: 'Fast Processing',
      description: 'Quick order processing and dispatch within 24 hours for express shipments.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    }
  ];

  return (
    <section className="features">
      <div className="features__container">
        <motion.div
          className="features__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="features__title">Why Choose TransportHub?</h2>
        </motion.div>

        <div className="features__grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="feature-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="feature-card__icon">
                {feature.icon}
              </div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
