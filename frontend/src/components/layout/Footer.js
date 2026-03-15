import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Logo from '../common/Logo';
import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Our Services', path: '/services' },
    { name: 'Track Parcel', path: '/tracking' },
    { name: 'Contact', path: '/contact' }
  ];

  const services = [
    { name: 'Express Shipping', path: '/services' },
    { name: 'Freight Services', path: '/services' },
    { name: 'Warehousing', path: '/services' },
    { name: 'Supply Chain', path: '/services' }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaTwitter />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaInstagram />, url: 'https://instagram.com', label: 'Instagram' }
  ];

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Top Section */}
        <div className="footer__top">
          {/* Company Info */}
          <div className="footer__column footer__about">
            <Logo size="medium" />
            <p className="footer__description">
              Your trusted global logistics partner delivering excellence with speed, security, and reliability. 
              Shipping made simple, worldwide.
            </p>
            <div className="footer__social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__column">
            <h3 className="footer__heading">Quick Links</h3>
            <ul className="footer__links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer__column">
            <h3 className="footer__heading">Our Services</h3>
            <ul className="footer__links">
              {services.map((service, index) => (
                <li key={index}>
                  <Link to={service.path}>{service.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer__column">
            <h3 className="footer__heading">Contact Us</h3>
            <ul className="footer__contact">
              <li>
                <FaEnvelope className="contact-icon" />
                <a href="mailto:support@transporthub.com">support@transporthub.com</a>
              </li>
              <li>
                <FaPhone className="contact-icon" />
                <a href="tel:+918553535342">+91 85535 35342</a>
              </li>
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <span>123 Logistics Ave, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer__bottom">
          <div className="footer__copyright">
            <p>&copy; {currentYear} TransportHub. All rights reserved.</p>
          </div>
          <div className="footer__legal">
            <Link to="/privacy">Privacy Policy</Link>
            <span className="separator">•</span>
            <Link to="/terms">Terms of Service</Link>
            <span className="separator">•</span>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
