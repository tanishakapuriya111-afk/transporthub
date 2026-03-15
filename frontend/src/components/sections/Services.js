import React from 'react';
import { motion } from 'framer-motion';
import './Services.scss';

const Services = ({ hideHeader = false }) => {
  const services = [
    {
      id: 1,
      title: 'Express Shipping',
      description: 'Fast and reliable delivery service with guaranteed on-time arrival for urgent shipments.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 2,
      title: 'Freight Services',
      description: 'Comprehensive freight solutions for bulk cargo, heavy machinery, and international trade.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="3" width="15" height="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 8H20L23 11V16H16V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 3,
      title: 'Warehousing',
      description: 'Secure storage facilities with advanced inventory management and climate control systems.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 4,
      title: 'Supply Chain',
      description: 'End-to-end supply chain management with real-time tracking and optimization.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 5,
      title: 'Last Mile Delivery',
      description: 'Efficient final-stage delivery to your customers doorstep with real-time updates.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 6,
      title: 'Cold Chain',
      description: 'Temperature-controlled logistics for pharmaceuticals, food, and sensitive products.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 14.76V3.5C14 2.83696 13.7366 2.20107 13.2678 1.73223C12.7989 1.26339 12.163 1 11.5 1C10.837 1 10.2011 1.26339 9.73223 1.73223C9.26339 2.20107 9 2.83696 9 3.5V14.76C8.04471 15.3906 7.31534 16.308 6.9141 17.3773C6.51285 18.4466 6.45753 19.6143 6.75607 20.7169C7.05462 21.8195 7.69202 22.8005 8.57633 23.521C9.46064 24.2415 10.5474 24.6626 11.675 24.7265C12.8026 24.7905 13.9256 24.4938 14.8825 23.8769C15.8395 23.26 16.5817 22.3528 17.0046 21.2791C17.4275 20.2054 17.5104 19.0188 17.242 17.8919C16.9735 16.7651 16.3667 15.7547 15.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <section className="services">
      <div className="services__container">
        {!hideHeader && (
          <motion.div
            className="services__header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="services__tag">WHAT WE OFFER</p>
            <h2 className="services__title">Our Services</h2>
            <p className="services__subtitle">
              Comprehensive transportation solutions tailored to your business needs
            </p>
          </motion.div>
        )}

        <div className="services__grid">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="service-card__icon">
                {service.icon}
              </div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">{service.description}</p>
              <button className="service-card__link">
                Learn More
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
