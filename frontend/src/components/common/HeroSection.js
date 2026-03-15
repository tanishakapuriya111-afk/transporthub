import React from "react";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Modern Transportation
            <span className="hero-highlight"> Solutions</span>
          </h1>
          <p className="hero-description">
            Experience seamless logistics and transportation services with our cutting-edge platform. From cargo
            shipping to passenger transport, we connect the world efficiently.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">150+</span>
              <span className="stat-label">Countries Served</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Success Rate</span>
            </div>
          </div>
          <div className="hero-buttons">
            <button className="cta-primary">Get Started</button>
            <button className="cta-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-cards">
            <div className="card card-1">
              <div className="card-icon">🚢</div>
              <h3>Sea Freight</h3>
              <p>Global shipping solutions</p>
            </div>
            <div className="card card-2">
              <div className="card-icon">✈️</div>
              <h3>Air Cargo</h3>
              <p>Fast delivery worldwide</p>
            </div>
            <div className="card card-3">
              <div className="card-icon">🚛</div>
              <h3>Land Transport</h3>
              <p>Reliable ground shipping</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
