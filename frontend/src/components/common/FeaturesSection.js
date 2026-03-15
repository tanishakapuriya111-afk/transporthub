import React from "react";

const FeaturesSection = () => {
  const features = [
    {
      icon: "🌍",
      title: "Global Network",
      description: "Connect with partners across 150+ countries for seamless international shipping.",
    },
    {
      icon: "⚡",
      title: "Fast Delivery",
      description: "Express shipping options with guaranteed delivery times and real-time tracking.",
    },
    {
      icon: "🔒",
      title: "Secure Transport",
      description: "Advanced security measures and insurance coverage for your valuable cargo.",
    },
    {
      icon: "📊",
      title: "Smart Analytics",
      description: "Comprehensive reporting and analytics to optimize your supply chain.",
    },
    {
      icon: "💰",
      title: "Cost Effective",
      description: "Competitive pricing with transparent costs and no hidden fees.",
    },
    {
      icon: "🛠️",
      title: "24/7 Support",
      description: "Round-the-clock customer support to handle your shipping needs anytime.",
    },
  ];

  return (
    <section className="features-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">Leading the industry with innovative solutions and exceptional service</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
