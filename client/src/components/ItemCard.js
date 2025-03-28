import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { favoriteService } from '../services/api';

const ItemCard = ({ item, onFavoriteToggle, isFavorite }) => {
  const { isAuthenticated } = useAuth();

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorite) {
        await favoriteService.removeFavorite(item._id);
      } else {
        await favoriteService.addFavorite(item._id);
      }
      onFavoriteToggle(item._id);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className="card">
      <Link to={`/items/${item._id}`}>
        <img src={item.imageUrl} alt={item.title} className="card-img" />
      </Link>
      <div className="card-body">
        <h3 className="card-title">
          <Link to={`/items/${item._id}`}>{truncateText(item.title, 40)}</Link>
        </h3>
        <p className="card-text">{truncateText(item.description, 100)}</p>
        <div className="card-price">${item.price.toFixed(2)}</div>
        <div className="card-rating">
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar
              key={index}
              color={index < item.rating ? '#ffc107' : '#e4e5e9'}
            />
          ))}
          <span style={{ marginLeft: '5px' }}>({item.numReviews})</span>
        </div>
      </div>
      <div className="card-footer">
        <Link to={`/items/${item._id}`} className="btn btn-primary">
          View Details
        </Link>
        {isAuthenticated && (
          <button
            className="btn btn-outline"
            onClick={handleFavoriteToggle}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? <FaHeart color="#e74c3c" /> : <FaRegHeart />}
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemCard; 