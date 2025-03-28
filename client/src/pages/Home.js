import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaShoppingCart } from 'react-icons/fa';
import { itemService, favoriteService } from '../services/api';
import ItemCard from '../components/ItemCard';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        const response = await itemService.getItems({ limit: 6, sort: '-rating' });
        setFeaturedItems(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured items:', error);
        setLoading(false);
      }
    };

    fetchFeaturedItems();
  }, []);

  useEffect(() => {
    // Fetch user's favorites if authenticated
    const fetchFavorites = async () => {
      if (isAuthenticated) {
        try {
          const response = await favoriteService.getFavorites();
          const favoriteIds = response.data.data.map(fav => fav.item._id);
          setFavorites(favoriteIds);
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      }
    };

    fetchFavorites();
  }, [isAuthenticated]);

  const handleFavoriteToggle = (itemId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(itemId)) {
        return prevFavorites.filter(id => id !== itemId);
      } else {
        return [...prevFavorites, itemId];
      }
    });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero" style={{ 
        background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '6rem 0',
        textAlign: 'center',
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Welcome to ShopEasy</h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Your one-stop shop for all your shopping needs with amazing products at unbeatable prices. Created by Roaa to make your shopping experience easier and more enjoyable!
          </p>
          <div>
            <Link to="/items" className="btn btn-primary" style={{ margin: '0 0.5rem' }}>
              Shop Now <FaArrowRight style={{ marginLeft: '0.5rem' }} />
            </Link>
            <Link to="/about" className="btn btn-outline" style={{ 
              margin: '0 0.5rem', 
              backgroundColor: 'transparent',
              color: 'white',
              border: '1px solid white',
            }}>
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--light-color)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Shop by Category</h2>
          <div className="grid grid-3">
            <Link to="/items?category=electronics" className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>🖥️</div>
              <h3>Electronics</h3>
            </Link>
            <Link to="/items?category=clothing" className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>👕</div>
              <h3>Clothing</h3>
            </Link>
            <Link to="/items?category=books" className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>📚</div>
              <h3>Books</h3>
            </Link>
          </div>
          <div className="grid grid-3" style={{ marginTop: '1rem' }}>
            <Link to="/items?category=home" className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>🏠</div>
              <h3>Home</h3>
            </Link>
            <Link to="/items?category=sports" className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>⚽</div>
              <h3>Sports</h3>
            </Link>
            <Link to="/items?category=other" className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>🎁</div>
              <h3>Other</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>Featured Products</h2>
            <Link to="/items" className="btn btn-outline">
              View All <FaArrowRight style={{ marginLeft: '0.5rem' }} />
            </Link>
          </div>
          
          {featuredItems.length > 0 ? (
            <div className="grid grid-3">
              {featuredItems.map(item => (
                <ItemCard
                  key={item._id}
                  item={item}
                  isFavorite={favorites.includes(item._id)}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center' }}>No products available at the moment.</p>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section style={{ 
        padding: '4rem 0', 
        backgroundColor: 'var(--primary-color)', 
        color: 'white',
        textAlign: 'center',
      }}>
        <div className="container">
          <h2 style={{ marginBottom: '1rem' }}>Start Shopping Today</h2>
          <p style={{ marginBottom: '2rem', maxWidth: '700px', margin: '0 auto 2rem' }}>
            Join thousands of satisfied customers since 2025 and discover why ShopEasy by Roaa is the best online shopping destination of 2025.
          </p>
          <Link to="/register" className="btn" style={{ 
            backgroundColor: 'white',
            color: 'var(--primary-color)',
          }}>
            Create an Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 