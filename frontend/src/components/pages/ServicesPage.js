import React from "react";
import Services from "../sections/Services";
import { motion } from 'framer-motion';
import './ServicesPage.scss';

const ServicesPage = () => {
  return (
    <div className="services-page">
      <section className="services-page-hero">
        <div className="services-page-hero__container">
          <motion.h1
            className="services-page-hero__title"
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            Our <span className="highlight">Services</span>
          </motion.h1>
          <motion.p
            className="services-page-hero__subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Comprehensive transportation solutions tailored to your business needs
          </motion.p>
        </div>
      </section>
      
      <Services hideHeader={true} />
    </div>
  );
};

export default ServicesPage;
