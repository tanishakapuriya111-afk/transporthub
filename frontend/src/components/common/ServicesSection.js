import React from "react";
import { useNavigate } from "react-router-dom";

const ServicesSection = () => {
  const navigate = useNavigate();
  
  const services = [
    {
      id: "sea-freight",
      icon: "🚢",
      title: "Sea Freight",
      description: "Global shipping solutions with competitive rates and reliable delivery times.",
      features: ["Container Shipping", "Bulk Cargo", "Refrigerated Transport"],
    },
    {
      id: "air-cargo",
      icon: "✈️",
      title: "Air Cargo",
      description: "Express air freight services for time-sensitive shipments worldwide.",
      features: ["Express Delivery", "Priority Handling", "Real-time Tracking"],
    },
    {
      id: "land-transport",
      icon: "🚛",
      title: "Land Transport",
      description: "Comprehensive ground transportation across continents and borders.",
      features: ["Truck Freight", "Rail Transport", "Cross-border Solutions"],
    },
    {
      id: "logistics",
      icon: "📦",
      title: "Logistics",
      description: "End-to-end supply chain management and warehousing solutions.",
      features: ["Warehousing", "Inventory Management", "Distribution"],
    },
  ];

  return (
    <section className="services-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Comprehensive transportation solutions tailored to your business needs</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
              <button 
                className="service-btn" 
                onClick={() => navigate(`/service/${service.id}`)}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
