import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Hero.scss';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__background">
        <div className="hero__gradient"></div>
        {/* Animated Transportation Routes */}
        <div className="animated-routes">
          <svg className="route-line route-1" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,20 50,50 T100,50" fill="none" stroke="rgba(255,107,53,0.2)" strokeWidth="2" strokeDasharray="5,5">
              <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="1s" repeatCount="indefinite" />
            </path>
          </svg>
          <svg className="route-line route-2" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,30 Q50,60 100,30" fill="none" stroke="rgba(255,107,53,0.15)" strokeWidth="2" strokeDasharray="5,5">
              <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="1.5s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
        {/* Floating Transportation Icons */}
        <div className="floating-icons">
          <motion.div 
            className="float-icon truck"
            animate={{ 
              y: [0, -20, 0],
              x: [0, 10, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M1 3H15V13H1V3Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M15 5H19L23 9V13H15V5Z" stroke="currentColor" strokeWidth="2"/>
              <circle cx="6" cy="17" r="2" stroke="currentColor" strokeWidth="2"/>
              <circle cx="18" cy="17" r="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M6 15V13M18 15V13" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </motion.div>
          <motion.div 
            className="float-icon plane"
            animate={{ 
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor"/>
            </svg>
          </motion.div>
          <motion.div 
            className="float-icon ship"
            animate={{ 
              y: [0, -15, 0],
              x: [0, -15, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 20C5.33 20 7 18.33 7 16V12L3 14V20Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 20C18.67 20 17 18.33 17 16V12L21 14V20Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 7L3 12L12 17L21 12L12 7Z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
            </svg>
          </motion.div>
        </div>
        {/* Animated Dots/Particles */}
        <div className="particles">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              initial={{ 
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{
                y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                opacity: [0.2, 0.8, 0.2]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="hero__content">
        <motion.div
          className="hero__text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero__title">
            <span className="hero__title-main">Fast & Reliable</span>
            <span className="hero__title-gradient">Transportation Solutions</span>
          </h1>
          
          <p className="hero__description">
            Experience world-class logistics services with real-time tracking, 
            secure delivery, and 24/7 customer support. Your trusted partner in transportation.
          </p>
          
          <div className="hero__buttons">
            <Link to="/track" className="btn btn--primary">
              <span>Track Shipment</span>
              <svg className="btn__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            
            <Link to="/services" className="btn btn--secondary">
              <span>Our Services</span>
            </Link>
          </div>
        </motion.div>
        
        <motion.div
          className="hero__stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="stat-card">
            <div className="stat-card__icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-card__content">
              <h3 className="stat-card__number">1M+</h3>
              <p className="stat-card__label">Deliveries</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-card__icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-card__content">
              <h3 className="stat-card__number">500+</h3>
              <p className="stat-card__label">Team Members</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-card__icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-card__content">
              <h3 className="stat-card__number">150+</h3>
              <p className="stat-card__label">Countries</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
