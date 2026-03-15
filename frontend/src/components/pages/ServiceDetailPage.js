import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import './ServiceDetailPage.scss';
import vec01 from "../../assets/vectors/01.png";
import vec02 from "../../assets/vectors/02.png";
import vec03 from "../../assets/vectors/03.png";
import vec04 from "../../assets/vectors/04.png";
import vec05 from "../../assets/vectors/05.png";
import vec06 from "../../assets/vectors/06.png";

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const services = [
    {
      id: "express-shipping",
      image: vec01,
      title: "Express Shipping",
      description: "Fast and reliable delivery service with guaranteed on-time arrival for urgent shipments.",
      longDescription: "Our Express Shipping service is designed for businesses and individuals who need their shipments delivered quickly and reliably. We guarantee on-time delivery for urgent parcels with real-time tracking and dedicated support throughout the journey.",
      features: ["Same-day & Next-day Options", "Real-time Tracking", "On-time Guarantee"],
      benefits: [
        "Priority handling for all express shipments",
        "Dedicated customer support 24/7",
        "Automated delivery notifications",
        "Proof of delivery confirmation"
      ],
      process: [
        "Book online or call our team",
        "Pickup scheduled within the hour",
        "Priority sorting and dispatch",
        "Real-time GPS tracking enabled",
        "Delivery with digital confirmation"
      ],
      pricing: "Starting from ₹299 per shipment",
      deliveryTime: "Same day to 24 hours",
      coverage: "500+ cities nationwide"
    },
    {
      id: "freight-services",
      image: vec02,
      title: "Freight Services",
      description: "Comprehensive freight solutions for bulk cargo, heavy machinery, and international trade.",
      longDescription: "Our Freight Services offer end-to-end solutions for moving large volumes of goods, heavy machinery, and bulk cargo both domestically and internationally. We handle the complexity of freight logistics so you can focus on your business.",
      features: ["Full Truckload (FTL)", "Less-than-Truckload (LTL)", "Heavy Machinery Transport"],
      benefits: [
        "Cost-effective bulk shipping rates",
        "Specialized equipment for heavy loads",
        "Customs clearance assistance",
        "Door-to-door freight management"
      ],
      process: [
        "Freight assessment and quote",
        "Packaging and labelling guidance",
        "Vehicle and route assignment",
        "In-transit monitoring",
        "Delivery and documentation"
      ],
      pricing: "Custom quotes based on volume",
      deliveryTime: "3-10 business days",
      coverage: "Pan-India & International routes"
    },
    {
      id: "warehousing",
      image: vec03,
      title: "Warehousing",
      description: "Secure storage facilities with advanced inventory management and climate control systems.",
      longDescription: "Our state-of-the-art warehousing facilities provide businesses with secure, scalable storage solutions. Equipped with climate control, CCTV surveillance, and advanced inventory management software, we ensure your goods are stored safely and retrieved efficiently.",
      features: ["Climate-Controlled Storage", "24/7 Security & CCTV", "Inventory Management Software"],
      benefits: [
        "Flexible short and long-term storage plans",
        "Real-time stock visibility",
        "Reduced storage and handling costs",
        "Seamless integration with your supply chain"
      ],
      process: [
        "Storage requirement consultation",
        "Facility allocation and setup",
        "Goods inward inspection",
        "Ongoing inventory management",
        "Outbound dispatch on demand"
      ],
      pricing: "Starting from ₹5,000/month",
      deliveryTime: "Available immediately",
      coverage: "10+ strategically located warehouses"
    },
    {
      id: "supply-chain",
      image: vec04,
      title: "Supply Chain",
      description: "End-to-end supply chain management with real-time tracking and optimization.",
      longDescription: "Our Supply Chain Management service covers the full lifecycle — from procurement and production to distribution and delivery. We use data-driven strategies and real-time visibility tools to minimize delays, reduce costs, and improve overall efficiency.",
      features: ["End-to-End Visibility", "Demand Forecasting", "Vendor Management"],
      benefits: [
        "Reduced lead times and operational costs",
        "Improved supplier relationships",
        "Data-driven decision making",
        "Scalable for growing businesses"
      ],
      process: [
        "Supply chain audit and analysis",
        "Strategy and optimization planning",
        "Technology integration",
        "Continuous monitoring and reporting",
        "Ongoing improvement cycles"
      ],
      pricing: "Custom pricing based on scope",
      deliveryTime: "Continuous service",
      coverage: "Global supply chain network"
    },
    {
      id: "last-mile-delivery",
      image: vec05,
      title: "Last Mile Delivery",
      description: "Efficient final-stage delivery to your customers doorstep with real-time updates.",
      longDescription: "Last Mile Delivery is the most critical part of the delivery experience. Our service ensures packages reach your customers quickly and reliably, with real-time tracking, flexible delivery windows, and contactless delivery options for a seamless customer experience.",
      features: ["Doorstep Delivery", "Flexible Delivery Slots", "Contactless Delivery"],
      benefits: [
        "Improved customer satisfaction",
        "Real-time delivery updates via SMS/email",
        "Rescheduling and return management",
        "Proof of delivery with photo confirmation"
      ],
      process: [
        "Order received from warehouse or hub",
        "Route optimization for delivery agent",
        "Customer notified with ETA",
        "Doorstep delivery attempt",
        "Digital proof of delivery captured"
      ],
      pricing: "Starting from ₹49 per delivery",
      deliveryTime: "Same day or next day",
      coverage: "1000+ pin codes served"
    },
    {
      id: "cold-chain",
      image: vec06,
      title: "Cold Chain",
      description: "Temperature-controlled logistics for pharmaceuticals, food, and sensitive products.",
      longDescription: "Our Cold Chain Logistics service maintains product integrity from origin to destination. Using refrigerated vehicles and temperature-monitored storage, we handle pharmaceuticals, fresh produce, dairy, and other sensitive goods with zero compromise on quality.",
      features: ["Refrigerated Transport", "Temperature Monitoring", "Pharma-Grade Handling"],
      benefits: [
        "Unbroken cold chain from pickup to delivery",
        "Compliance with food and pharma regulations",
        "IoT-based temperature logging",
        "Reduced product spoilage and waste"
      ],
      process: [
        "Cold chain requirement assessment",
        "Refrigerated vehicle/storage allocation",
        "Goods loaded under controlled conditions",
        "Continuous temperature monitoring in transit",
        "Delivery with temperature log report"
      ],
      pricing: "Starting from ₹1,500 per trip",
      deliveryTime: "24-72 hours depending on route",
      coverage: "Major metros and pharma hubs"
    }
  ];

  const service = services.find(s => s.id === serviceId);

  if (!service) {
    return (
      <div className="service-detail-page">
        <div className="sdp-error">
          <h1>Service Not Found</h1>
          <p>The service you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="service-detail-page">

      {/* ── Hero ── */}
      <section className="sdp-hero">
        <div className="sdp-hero__content">
          <button className="sdp-hero__back" onClick={() => navigate(-1)}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Services
          </button>

          <p className="sdp-hero__tag">Our Services</p>
          <h1 className="sdp-hero__title">{service.title}</h1>
          <p className="sdp-hero__desc">{service.longDescription}</p>

          <div className="sdp-hero__badges">
            {service.features.map((f, i) => (
              <span key={i} className="sdp-hero__badge">{f}</span>
            ))}
          </div>

          <div className="sdp-hero__cta">
            <button className="btn-primary" onClick={() => navigate('/contact')}>Get a Quote</button>
            <button className="btn-secondary" onClick={() => navigate('/booking')}>Book Now</button>
          </div>
        </div>

        <div className="sdp-hero__image-wrap">
          <img src={service.image} alt={service.title} />
        </div>
      </section>

      {/* ── Info Bar ── */}
      <div className="sdp-info-bar">
        <div className="sdp-info-bar__item">
          <span className="sdp-info-bar__label">Starting Price</span>
          <span className="sdp-info-bar__value">{service.pricing}</span>
        </div>
        <div className="sdp-info-bar__item">
          <span className="sdp-info-bar__label">Delivery Time</span>
          <span className="sdp-info-bar__value">{service.deliveryTime}</span>
        </div>
        <div className="sdp-info-bar__item">
          <span className="sdp-info-bar__label">Coverage</span>
          <span className="sdp-info-bar__value">{service.coverage}</span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="sdp-content">
        <p className="sdp-section-title">What We Offer</p>
        <h2 className="sdp-section-heading">Service Details</h2>

        <div className="sdp-grid">
          {/* Benefits */}
          <div className="sdp-card">
            <h3>Benefits</h3>
            <ul>
              {service.benefits.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>

          {/* Process */}
          <div className="sdp-card">
            <h3>Our Process</h3>
            <div className="sdp-process">
              {service.process.map((step, i) => (
                <div key={i} className="sdp-step">
                  <div className="sdp-step__num">{i + 1}</div>
                  <div className="sdp-step__text">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="sdp-cta">
        <h2>Ready to Get Started?</h2>
        <p>Contact us today to discuss your transportation needs and get a custom quote.</p>
        <div className="sdp-cta__buttons">
          <button className="btn-primary" onClick={() => navigate('/contact')}>Get Quote</button>
          <button className="btn-secondary" onClick={() => navigate('/services')}>View All Services</button>
        </div>
      </div>

    </div>
  );
};

export default ServiceDetailPage;
