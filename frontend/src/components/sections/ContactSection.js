import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ContactSection.scss';

const ContactSection = () => {
  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email Us',
      value: 'support@transporthub.com',
      link: 'mailto:support@transporthub.com'
    },
    {
      icon: <FaPhone />,
      title: 'Call Us',
      value: '+91 85535 35342',
      link: 'tel:+918553535342'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Visit Us',
      value: '123 Logistics Ave, NY 10001',
      link: 'https://maps.google.com'
    },
    {
      icon: <FaClock />,
      title: 'Working Hours',
      value: 'Mon - Fri: 9 AM - 6 PM',
      link: null
    }
  ];

  return (
    <section className="contact-section" id="contact">
      <div className="contact-section__container">
        <motion.div
          className="contact-section__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="contact-section__title">
            Get In <span className="highlight">Touch</span>
          </h2>
          <p className="contact-section__subtitle">
            Have questions? We're here to help! Reach out to our team anytime
          </p>
        </motion.div>

        <div className="contact-grid">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              className="contact-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item.link ? (
                <a href={item.link} className="contact-card-link" target="_blank" rel="noopener noreferrer">
                  <div className="contact-icon">{item.icon}</div>
                  <h3 className="contact-title">{item.title}</h3>
                  <p className="contact-value">{item.value}</p>
                </a>
              ) : (
                <div className="contact-card-content">
                  <div className="contact-icon">{item.icon}</div>
                  <h3 className="contact-title">{item.title}</h3>
                  <p className="contact-value">{item.value}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="contact-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="cta-text">Need detailed assistance?</p>
          <Link to="/contact" className="cta-button">
            Go to Contact Page
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
