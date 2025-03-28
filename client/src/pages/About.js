import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingBag, FaUserCheck, FaHeart, FaSearch, FaFilter, FaShippingFast } from 'react-icons/fa';

const About = () => {
  return (
    <div className="about-page">
      <div className="container" style={{ padding: '3rem 0' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>About ShopEasy</h1>
        
        {/* Introduction Section */}
        <section style={{ marginBottom: '3rem' }}>
          <div className="grid grid-2" style={{ alignItems: 'center', gap: '2rem' }}>
            <div>
              <h2 style={{ marginBottom: '1rem' }}>Our Mission</h2>
              <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
                At ShopEasy, our mission is to create a simple, enjoyable, and accessible shopping experience for everyone. 
                We believe shopping should be easy, hence our name!
              </p>
              <p style={{ lineHeight: '1.6' }}>
                Founded in 2025 by Roaa, ShopEasy has quickly grown to become a trusted marketplace for quality products 
                across multiple categories including electronics, clothing, books, home goods, and more.
              </p>
            </div>
            <div style={{ 
              background: 'url(https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80) center/cover no-repeat',
              height: '300px',
              borderRadius: 'var(--border-radius)',
            }}></div>
          </div>
        </section>
        
        {/* How to Use Section */}
        <section style={{ marginBottom: '3rem', backgroundColor: 'var(--light-color)', padding: '2rem', borderRadius: 'var(--border-radius)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>How to Use ShopEasy</h2>
          
          <div className="grid grid-3" style={{ gap: '2rem' }}>
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>
                <FaUserCheck />
              </div>
              <h3 style={{ marginBottom: '1rem' }}>1. Create an Account</h3>
              <p>Sign up for a free account to access all features including saving favorites and tracking orders.</p>
              <Link to="/register" className="btn btn-primary" style={{ marginTop: '1rem' }}>Register Now</Link>
            </div>
            
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>
                <FaSearch />
              </div>
              <h3 style={{ marginBottom: '1rem' }}>2. Browse & Search</h3>
              <p>Browse our categories or use the search feature to find exactly what you're looking for.</p>
              <Link to="/items" className="btn btn-primary" style={{ marginTop: '1rem' }}>Start Shopping</Link>
            </div>
            
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>
                <FaHeart />
              </div>
              <h3 style={{ marginBottom: '1rem' }}>3. Save Favorites</h3>
              <p>Mark items as favorites to save them for later and build your wishlist.</p>
              <Link to="/favorites" className="btn btn-primary" style={{ marginTop: '1rem' }}>View Favorites</Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Key Features</h2>
          
          <div className="grid grid-2" style={{ gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ color: 'var(--primary-color)', fontSize: '1.5rem', marginTop: '0.2rem' }}>
                <FaSearch />
              </div>
              <div>
                <h3 style={{ marginBottom: '0.5rem' }}>Powerful Search</h3>
                <p>Quickly find what you need with our advanced search and filtering system.</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ color: 'var(--primary-color)', fontSize: '1.5rem', marginTop: '0.2rem' }}>
                <FaUserCheck />
              </div>
              <div>
                <h3 style={{ marginBottom: '0.5rem' }}>Secure Authentication</h3>
                <p>Your account is protected with secure login and authentication methods.</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ color: 'var(--primary-color)', fontSize: '1.5rem', marginTop: '0.2rem' }}>
                <FaHeart />
              </div>
              <div>
                <h3 style={{ marginBottom: '0.5rem' }}>Favorites Management</h3>
                <p>Save your favorite items to access them quickly in the future.</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ color: 'var(--primary-color)', fontSize: '1.5rem', marginTop: '0.2rem' }}>
                <FaFilter />
              </div>
              <div>
                <h3 style={{ marginBottom: '0.5rem' }}>Advanced Filtering</h3>
                <p>Filter products by category, price range, rating, and more.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section style={{ 
          textAlign: 'center',
          padding: '3rem',
          backgroundColor: 'var(--primary-color)',
          color: 'white',
          borderRadius: 'var(--border-radius)',
        }}>
          <h2 style={{ marginBottom: '1rem' }}>Ready to Start Shopping?</h2>
          <p style={{ marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            Join thousands of satisfied customers since 2025 and discover why ShopEasy by Roaa is the best online shopping destination of 2025.
          </p>
          <div>
            <Link to="/register" className="btn" style={{ 
              backgroundColor: 'white',
              color: 'var(--primary-color)',
              margin: '0 0.5rem',
            }}>
              Create an Account
            </Link>
            <Link to="/items" className="btn btn-outline" style={{ 
              margin: '0 0.5rem',
              border: '1px solid white',
              color: 'white',
            }}>
              Browse Products
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 