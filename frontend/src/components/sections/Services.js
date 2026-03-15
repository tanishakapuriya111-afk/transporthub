import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Services.scss';
import vec01 from '../../assets/vectors/01.png';
import vec02 from '../../assets/vectors/02.png';
import vec03 from '../../assets/vectors/03.png';
import vec04 from '../../assets/vectors/04.png';
import vec05 from '../../assets/vectors/05.png';
import vec06 from '../../assets/vectors/06.png';

const Services = ({ hideHeader = false }) => {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      slug: 'express-shipping',
      title: 'Express Shipping',
      description: 'Fast and reliable delivery service with guaranteed on-time arrival for urgent shipments.',
      image: vec01
    },
    {
      id: 2,
      slug: 'freight-services',
      title: 'Freight Services',
      description: 'Comprehensive freight solutions for bulk cargo, heavy machinery, and international trade.',
      image: vec02
    },
    {
      id: 3,
      slug: 'warehousing',
      title: 'Warehousing',
      description: 'Secure storage facilities with advanced inventory management and climate control systems.',
      image: vec03
    },
    {
      id: 4,
      slug: 'supply-chain',
      title: 'Supply Chain',
      description: 'End-to-end supply chain management with real-time tracking and optimization.',
      image: vec04
    },
    {
      id: 5,
      slug: 'last-mile-delivery',
      title: 'Last Mile Delivery',
      description: 'Efficient final-stage delivery to your customers doorstep with real-time updates.',
      image: vec05
    },
    {
      id: 6,
      slug: 'cold-chain',
      title: 'Cold Chain',
      description: 'Temperature-controlled logistics for pharmaceuticals, food, and sensitive products.',
      image: vec06
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
              onClick={() => navigate(`/service/${service.slug}`)}
            >
              <div className="service-card__icon">
                <img src={service.image} alt={service.title} />
              </div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">{service.description}</p>
              <button
                className="service-card__link"
                onClick={(e) => { e.stopPropagation(); navigate(`/service/${service.slug}`); }}
              >
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
