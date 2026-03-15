import React from "react";
import Hero from "../sections/Hero";
import Services from "../sections/Services";
import AboutSection from "../sections/AboutSection";
import ContactSection from "../sections/ContactSection";
import Footer from "../layout/Footer";

const HomePage = () => {
  return (
    <div style={{ background: '#0a0a0a' }}>
      <Hero />
      <Services />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default HomePage;
