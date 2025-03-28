import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaTrash, FaExclamationTriangle } from 'react-icons/fa';
import { getFavorites, removeFavorite } from '../services/favoriteService';
import { useAuth } from '../context/AuthContext';
import ItemCard from '../components/ItemCard';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import '../assets/styles/favorites.css';

const Favorites = () => {
  const { isAuthenticated } = useAuth();
  
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (isAuthenticated) {
      fetchFavorites();
    }
  }, [isAuthenticated]);
  
  const fetchFavorites = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await getFavorites();
      setFavorites(response.data.data || []);
    } catch (err) {
      console.error('Error fetching favorites:', err);
      setError('Failed to load your favorites. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleRemoveFavorite = async (itemId) => {
    try {
      await removeFavorite(itemId);
      // Remove the item from the local state
      setFavorites(favorites.filter(fav => fav.itemId !== itemId));
    } catch (err) {
      console.error('Error removing favorite:', err);
      setError('Failed to remove item from favorites. Please try again.');
    }
  };
  
  if (loading) {
    return <Spinner size="large" text="Loading your favorites..." />;
  }
  
  return (
    <div className="container favorites-page">
      <div className="favorites-header">
        <h1 className="favorites-title">
          <FaHeart className="title-icon" /> My Favorites
        </h1>
        <p className="favorites-subtitle">
          Items you've saved to revisit later
        </p>
      </div>
      
      {error && (
        <Alert 
          type="danger" 
          message={error} 
          dismissible={true} 
          onClose={() => setError('')} 
        />
      )}
      
      {!favorites || favorites.length === 0 ? (
        <div className="no-favorites">
          <FaExclamationTriangle className="no-favorites-icon" />
          <h2>No favorites yet</h2>
          <p>Items you save as favorites will appear here</p>
          <Link to="/items" className="browse-items-btn">
            Browse Items
          </Link>
        </div>
      ) : (
        <div className="favorites-container">
          <div className="favorites-count">
            {favorites.length} {favorites.length === 1 ? 'item' : 'items'}
          </div>
          
          <div className="favorites-grid">
            {favorites.map(favorite => (
              <div key={favorite.itemId} className="favorite-item">
                <ItemCard
                  item={favorite.item}
                  isFavorite={true}
                  onFavoriteToggle={() => handleRemoveFavorite(favorite.itemId)}
                />
                <button 
                  className="remove-favorite-btn"
                  onClick={() => handleRemoveFavorite(favorite.itemId)}
                  aria-label="Remove from favorites"
                >
                  <FaTrash /> Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites; 