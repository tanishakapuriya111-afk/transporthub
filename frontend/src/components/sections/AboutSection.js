import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaShieldAlt, FaClock, FaGlobe } from 'react-icons/fa';
import './AboutSection.scss';

const AboutSection = () => {
  const features = [
    {
      icon: <FaCheckCircle />,
      title: 'Reliable Service',
      description: 'On-time delivery guaranteed with 99.9% success rate'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Secure & Safe',
      description: 'Your cargo is protected with advanced security measures'
    },
    {
      icon: <FaClock />,
      title: '24/7 Support',
      description: 'Round-the-clock customer service for your convenience'
    },
    {
      icon: <FaGlobe />,
      title: 'Global Reach',
      description: 'Worldwide shipping network across 150+ countries'
    }
  ];

  const stats = [
    { value: '10K+', label: 'Happy Clients' },
    { value: '50K+', label: 'Deliveries' },
    { value: '150+', label: 'Countries' },
    { value: '99.9%', label: 'Success Rate' }
  ];

  return (
    <section className="about-section" id="about">
      <div className="about-section__container">
        <motion.div
          className="about-section__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="about-section__title">
            Why Choose <span className="highlight">TransportHub</span>?
          </h2>
          <p className="about-section__subtitle">
            We're not just a shipping company — we're your trusted logistics partner delivering excellence worldwide
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="about-stats">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="about-features">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
