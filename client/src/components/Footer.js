import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import '../assets/styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-container">
          <div className="footer-about">
            <div className="footer-logo">
              <span>ShopEasy</span>
            </div>
            <p className="footer-text">
              ShopEasy is your one-stop shop for all your needs. We provide high-quality products
              at affordable prices with exceptional customer service.
            </p>
            <div className="social-media">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div className="footer-links-container">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/items" className="footer-link">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-links-container">
            <h4 className="footer-title">Categories</h4>
            <ul className="footer-links">
              <li>
                <Link to="/items?category=electronics" className="footer-link">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/items?category=clothing" className="footer-link">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/items?category=books" className="footer-link">
                  Books
                </Link>
              </li>
              <li>
                <Link to="/items?category=home" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/items?category=sports" className="footer-link">
                  Sports
                </Link>
              </li>
              <li>
                <Link to="/items?category=other" className="footer-link">
                  Other
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-title">Contact Us</h4>
            <div className="contact-item">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="contact-text">
                123 Main Street, Ramat Gan, Israel
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <FaPhone />
              </div>
              <div className="contact-text">050-5551111</div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <div className="contact-text">contact@shopeasy.com</div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} ShopEasy by Roaa. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 