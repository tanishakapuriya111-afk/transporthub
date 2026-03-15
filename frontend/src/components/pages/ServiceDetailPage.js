import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const services = [
    {
      id: "sea-freight",
      icon: "🚢",
      title: "Sea Freight",
      description: "Global shipping solutions with competitive rates and reliable delivery times.",
      longDescription: "Our sea freight services provide comprehensive ocean transportation solutions for businesses worldwide. We specialize in container shipping, bulk cargo, and refrigerated transport, ensuring your goods reach their destination safely and on time.",
      features: ["Container Shipping", "Bulk Cargo", "Refrigerated Transport"],
      benefits: [
        "Cost-effective for large shipments",
        "Environmentally friendly option",
        "Global network coverage",
        "Flexible scheduling options"
      ],
      process: [
        "Initial consultation and quote",
        "Documentation preparation",
        "Container booking and pickup",
        "Ocean transit with tracking",
        "Customs clearance assistance",
        "Final delivery to destination"
      ],
      pricing: "Starting from $800 per container",
      deliveryTime: "15-45 days depending on route",
      coverage: "200+ countries worldwide"
    },
    {
      id: "air-cargo",
      icon: "✈️",
      title: "Air Cargo",
      description: "Express air freight services for time-sensitive shipments worldwide.",
      longDescription: "When time is of the essence, our air cargo services deliver. We provide express air freight solutions with priority handling and real-time tracking, ensuring your urgent shipments reach their destination quickly and securely.",
      features: ["Express Delivery", "Priority Handling", "Real-time Tracking"],
      benefits: [
        "Fastest delivery option available",
        "Priority handling and customs clearance",
        "Real-time shipment tracking",
        "Door-to-door service available"
      ],
      process: [
        "Express quote and booking",
        "Priority pickup and handling",
        "Airport-to-airport transit",
        "Customs clearance expedited",
        "Final delivery within hours"
      ],
      pricing: "Starting from $5/kg",
      deliveryTime: "1-7 days depending on destination",
      coverage: "150+ countries with daily flights"
    },
    {
      id: "land-transport",
      icon: "🚛",
      title: "Land Transport",
      description: "Comprehensive ground transportation across continents and borders.",
      longDescription: "Our land transport services cover everything from local deliveries to cross-continental trucking and rail transport. We provide reliable ground transportation solutions with extensive network coverage.",
      features: ["Truck Freight", "Rail Transport", "Cross-border Solutions"],
      benefits: [
        "Flexible scheduling and routing",
        "Cost-effective for medium distances",
        "Real-time GPS tracking",
        "Cross-border expertise"
      ],
      process: [
        "Route planning and optimization",
        "Vehicle assignment and pickup",
        "In-transit monitoring",
        "Border crossing assistance",
        "Final delivery and confirmation"
      ],
      pricing: "Starting from $2.50 per km",
      deliveryTime: "2-10 days depending on distance",
      coverage: "North America, Europe, Asia"
    },
    {
      id: "logistics",
      icon: "📦",
      title: "Logistics",
      description: "End-to-end supply chain management and warehousing solutions.",
      longDescription: "Our comprehensive logistics services provide complete supply chain management, from warehousing and inventory management to distribution and fulfillment. We optimize your entire logistics operation for maximum efficiency.",
      features: ["Warehousing", "Inventory Management", "Distribution"],
      benefits: [
        "Complete supply chain visibility",
        "Reduced operational costs",
        "Improved delivery times",
        "Scalable solutions"
      ],
      process: [
        "Supply chain analysis",
        "Warehouse setup and optimization",
        "Inventory management implementation",
        "Distribution network design",
        "Ongoing monitoring and optimization"
      ],
      pricing: "Custom pricing based on requirements",
      deliveryTime: "Varies by service type",
      coverage: "Global network with local expertise"
    }
  ];

  const service = services.find(s => s.id === serviceId);

  if (!service) {
    return (
      <div className="service-detail-page">
        <div className="container">
          <div className="error-content">
            <h1>Service Not Found</h1>
            <p>The service you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/')} className="cta-primary">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="service-detail-page">
      <div className="container">
        {/* Header */}
        <div className="service-header">
          <button onClick={() => navigate('/')} className="back-btn">
            ← Back to Services
          </button>
          <div className="service-hero">
            <div className="service-hero-icon">{service.icon}</div>
            <h1 className="service-hero-title">{service.title}</h1>
            <p className="service-hero-description">{service.longDescription}</p>
          </div>
        </div>

        {/* Service Details */}
        <div className="service-details">
          <div className="service-grid">
            {/* Features */}
            <div className="service-card">
              <h3>Key Features</h3>
              <ul className="feature-list">
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="service-card">
              <h3>Benefits</h3>
              <ul className="benefit-list">
                {service.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div className="service-card process-card">
              <h3>Our Process</h3>
              <div className="process-steps">
                {service.process.map((step, index) => (
                  <div key={index} className="process-step">
                    <div className="step-number">{index + 1}</div>
                    <div className="step-content">{step}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing & Info */}
            <div className="service-card info-card">
              <h3>Service Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Starting Price:</span>
                  <span className="info-value">{service.pricing}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Delivery Time:</span>
                  <span className="info-value">{service.deliveryTime}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Coverage:</span>
                  <span className="info-value">{service.coverage}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="service-cta">
          <h2>Ready to Get Started?</h2>
          <p>Contact us today to discuss your transportation needs and get a custom quote.</p>
          <div className="cta-buttons">
            <button onClick={() => navigate('/contact')} className="cta-primary">
              Get Quote
            </button>
            <button onClick={() => navigate('/services')} className="cta-secondary">
              View All Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
