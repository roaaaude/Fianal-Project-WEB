import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import '../assets/styles/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, you would send the form data to your backend API here
      console.log('Form submitted:', formData);
      
      // Show success message
      setSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }
  };
  
  return (
    <div className="contact-page">
      <div className="container">
        <h1 className="page-title">Contact Us</h1>
        
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>
              We'd love to hear from you! Whether you have a question about our products,
              need help with an order, or just want to say hello, feel free to reach out to us.
              Roaa personally reviews all customer inquiries to ensure you get the best service possible since 2025.
            </p>
            
            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h3>Our Location</h3>
                  <p>123 Main Street, Ramat Gan, Israel</p>
                </div>
              </div>
              
              <div className="contact-detail-item">
                <div className="contact-icon">
                  <FaPhone />
                </div>
                <div>
                  <h3>Phone Number</h3>
                  <p>050-5551111</p>
                </div>
              </div>
              
              <div className="contact-detail-item">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div>
                  <h3>Email Address</h3>
                  <p>contact@shopeasy.com</p>
                </div>
              </div>
            </div>
            
            <div className="business-hours">
              <h3>Business Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
          
          <div className="contact-form-container">
            {submitted ? (
              <div className="thank-you-message">
                <h2>Thank You!</h2>
                <p>Your message has been sent successfully. We'll get back to you as soon as possible.</p>
                <button 
                  className="send-another-btn"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2>Send Us a Message</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <div className="error-message">{errors.name}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={errors.subject ? 'error' : ''}
                    />
                    {errors.subject && <div className="error-message">{errors.subject}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className={errors.message ? 'error' : ''}
                    ></textarea>
                    {errors.message && <div className="error-message">{errors.message}</div>}
                  </div>
                  
                  <button type="submit" className="submit-btn">
                    <FaPaperPlane /> Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
        
        <div className="map-container">
          <h2>Find Us on the Map</h2>
          <div className="map-placeholder">
            {/* In a real application, you would integrate a Google Maps component here */}
            <img 
              src="https://maps.googleapis.com/maps/api/staticmap?center=Ramat+Gan,Israel&zoom=14&size=800x300&markers=color:red%7CRamat+Gan,Israel&key=YOUR_API_KEY" 
              alt="Map of our location" 
              className="map-image" 
            />
            <div className="map-overlay">
              <p>For demonstration purposes only. In a real application, an interactive map would be embedded here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 