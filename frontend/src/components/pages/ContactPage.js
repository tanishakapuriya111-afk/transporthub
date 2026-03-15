import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { submitContactForm } from '../../services/contactService';
import Footer from '../layout/Footer';
import './ContactPage.scss';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await submitContactForm(formData);
      
      if (result.success) {
        toast.success('Message sent successfully!', {
          position: 'top-right',
          autoClose: 3000,
          theme: 'dark'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(result.message || 'Failed to send message!', {
          position: 'top-right',
          autoClose: 3000,
          theme: 'dark'
        });
      }
    } catch (error) {
      toast.error('Network error! Try again.', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'dark'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <ToastContainer />
      <section className="contact-form-section">
        <div className="contact-form-section__hero">
          <motion.h1 
            className="contact-hero__title" 
            initial={{ opacity: 0, y: -50, rotateX: -15 }} 
            animate={{ opacity: 1, y: 0, rotateX: 0 }} 
            transition={{ 
              duration: 1, 
              ease: [0.6, -0.05, 0.01, 0.99],
              delay: 0.2
            }}
          >
            Get In <span className="highlight">Touch</span>
          </motion.h1>
          <motion.p 
            className="contact-hero__subtitle" 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 0.5
            }}
          >
            Have questions? We're here to help! Fill out the form below and our team will get back to you shortly.
          </motion.p>
        </div>
        <div className="contact-form-section__container">
          <div className="contact-form-grid">
            <motion.div 
              className="contact-illustration"
              initial={{ opacity: 0, x: -100, rotate: -10 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.43, 0.13, 0.23, 0.96],
                delay: 0.7
              }}
            >
              <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="250" cy="250" r="200" fill="rgba(255, 107, 53, 0.1)" />
                <circle cx="250" cy="250" r="150" fill="rgba(255, 107, 53, 0.15)" />
                <path d="M250 100 L350 250 L250 400 L150 250 Z" fill="#ff6b35" opacity="0.3" />
                <circle cx="250" cy="250" r="80" fill="#ff6b35" />
              </svg>
            </motion.div>

            <motion.div 
              className="contact-form-wrapper" 
              initial={{ opacity: 0, x: 100, scale: 0.95 }} 
              animate={{ opacity: 1, x: 0, scale: 1 }} 
              transition={{ 
                duration: 1, 
                ease: [0.43, 0.13, 0.23, 0.96],
                delay: 0.8
              }}
            >
              <form onSubmit={handleSubmit} className="contact-form">
                <motion.div 
                  className="form-group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <input 
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </motion.div>
                <motion.div 
                  className="form-group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                >
                  <input 
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </motion.div>
                <motion.div 
                  className="form-group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <input 
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </motion.div>
                <motion.div 
                  className="form-group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                >
                  <textarea 
                    name="message"
                    placeholder="Message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </motion.div>
                <motion.button 
                  type="submit" 
                  className="form-submit-btn"
                  disabled={loading}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(255, 107, 53, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactPage;
