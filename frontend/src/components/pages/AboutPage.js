import React from 'react';
import { motion } from 'framer-motion';
import { FaShip as ShipIcon, FaPlane as PlaneIcon, FaHeart, FaShieldAlt, FaRocket, FaUsers } from 'react-icons/fa';
import './AboutPage.scss';

const AboutPage = () => {
  const values = [
    { 
      icon: <FaHeart />,
      title: 'Customer First',
      description: 'Your satisfaction is our top priority. We go above and beyond to exceed expectations.'
    },
    { 
      icon: <FaShieldAlt />,
      title: 'Safety & Security',
      description: 'Every shipment is handled with utmost care and protected with comprehensive insurance.'
    },
    { 
      icon: <FaRocket />,
      title: 'Speed & Efficiency',
      description: 'Fast, reliable delivery with real-time tracking to keep you informed every step.'
    },
    { 
      icon: <FaUsers />,
      title: 'Expert Team',
      description: 'Experienced professionals dedicated to providing seamless transportation solutions.'
    }
  ];

  const services = [
    {
      title: 'Sea Freight',
      description: 'Global shipping solutions with competitive rates and reliable delivery times.',
      features: ['Container Shipping', 'Bulk Cargo', 'Refrigerated Transport'],
      icon: <ShipIcon />
    },
    {
      title: 'Air Cargo',
      description: 'Express air freight services for time-sensitive shipments worldwide.',
      features: ['Express Delivery', 'Priority Handling', 'Real-time Tracking'],
      icon: <PlaneIcon />
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero__container">
          <motion.h1
            className="about-hero__title"
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            About <span className="highlight">Transport Hub</span>
          </motion.h1>
          <motion.p
            className="about-hero__subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Connecting the world through innovative transportation solutions since 1998
          </motion.p>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="about-values__container">
          <motion.div
            className="about-values__header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="about-values__tag">OUR CORE VALUES</p>
            <h2 className="about-values__title">What Drives Us</h2>
            <p className="about-values__subtitle">
              Built on trust, powered by innovation, delivered with excellence
            </p>
          </motion.div>
          
          <div className="about-values__grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="value-card__icon">{value.icon}</div>
                <h3 className="value-card__title">{value.title}</h3>
                <p className="value-card__description">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="about-services">
        <div className="about-services__container">
          <motion.div
            className="about-services__header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="about-services__tag">WHAT WE OFFER</p>
            <h2 className="about-services__title">Our Services</h2>
            <p className="about-services__subtitle">
              Comprehensive transportation solutions tailored to your business needs
            </p>
          </motion.div>

          <div className="about-services__grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-box"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="service-box__icon">{service.icon}</div>
                <h3 className="service-box__title">{service.title}</h3>
                <p className="service-box__description">{service.description}</p>
                <ul className="service-box__features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
