import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import { getItem } from '../services/itemService';
import { addFavorite, removeFavorite, getFavorites } from '../services/favoriteService';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import '../assets/styles/itemDetail.css';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Fetch item data
  useEffect(() => {
    const fetchItemData = async () => {
      setLoading(true);
      setError('');
      
      try {
        const response = await getItem(id);
        setItem(response.data.data);
        
        // Check if item is in favorites
        if (isAuthenticated) {
          try {
            const favoriteResponse = await getFavorites();
            const favorites = favoriteResponse.data.data || [];
            const isFav = favorites.some(fav => 
              fav.item && (fav.item._id === id || fav.itemId === id)
            );
            setIsFavorite(isFav);
          } catch (err) {
            console.error('Error checking favorite:', err);
          }
        }
      } catch (err) {
        console.error('Error fetching item:', err);
        setError('Failed to load item details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchItemData();
  }, [id, isAuthenticated]);
  
  // Handle favorite toggle
  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    try {
      if (isFavorite) {
        await removeFavorite(id);
        setIsFavorite(false);
      } else {
        await addFavorite(id);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
      setError('Failed to update favorites. Please try again.');
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    addToCart(item, quantity);
    setAddedToCart(true);
    
    // Reset the added to cart message after 3 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };
  
  // Generate star rating
  const renderStarRating = (rating) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar 
            key={star} 
            className={star <= rating ? 'star filled' : 'star'} 
          />
        ))}
        <span className="rating-text">
          {rating.toFixed(1)} ({item.numReviews} reviews)
        </span>
      </div>
    );
  };
  
  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  if (loading) {
    return <Spinner size="large" text="Loading item details..." fullPage={true} />;
  }
  
  if (error) {
    return (
      <div className="container">
        <Alert 
          type="danger" 
          message={error} 
          dismissible={false} 
        />
        <div className="back-link">
          <Link to="/items">
            <FaArrowLeft /> Back to Items
          </Link>
        </div>
      </div>
    );
  }
  
  if (!item) {
    return (
      <div className="container">
        <Alert 
          type="warning" 
          message="Item not found" 
          dismissible={false} 
        />
        <div className="back-link">
          <Link to="/items">
            <FaArrowLeft /> Back to Items
          </Link>
        </div>
      </div>
    );
  }
  
  // Use placeholder image if no images available
  const images = item.images && item.images.length > 0 
    ? item.images 
    : item.imageUrl ? [item.imageUrl] : ['/placeholder.jpg'];
  
  return (
    <div className="container">
      <div className="item-detail">
        <div className="back-link">
          <Link to="/items">
            <FaArrowLeft /> Back to Items
          </Link>
        </div>
        
        <div className="item-detail-grid">
          {/* Item images */}
          <div className="item-images">
            <div className="main-image">
              <img 
                src={images[activeImage]} 
                alt={item.title} 
                className="item-main-image" 
              />
            </div>
            
            {images.length > 1 && (
              <div className="image-thumbnails">
                {images.map((image, index) => (
                  <div 
                    key={index}
                    className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={image} alt={`${item.title} thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Item details */}
          <div className="item-info">
            <h1 className="item-title">{item.title}</h1>
            
            {item.rating !== undefined && renderStarRating(item.rating)}
            
            <div className="item-price">
              {item.salePrice && item.salePrice < item.price ? (
                <>
                  <span className="original-price">{formatPrice(item.price)}</span>
                  <span className="sale-price">{formatPrice(item.salePrice)}</span>
                  <span className="discount">
                    -{Math.round(((item.price - item.salePrice) / item.price) * 100)}%
                  </span>
                </>
              ) : (
                <span className="current-price">{formatPrice(item.price)}</span>
              )}
            </div>
            
            {item.inStock ? (
              <div className="stock in-stock">In Stock</div>
            ) : (
              <div className="stock out-of-stock">Out of Stock</div>
            )}
            
            <div className="item-actions">
              <div className="quantity-wrapper">
                <label htmlFor="quantity">Quantity:</label>
                <div className="quantity-input">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                    disabled={quantity <= 1}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <input 
                    id="quantity"
                    type="number" 
                    min="1" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="quantity-field"
                  />
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <button 
                className="add-to-cart-btn"
                disabled={!item.inStock}
                onClick={handleAddToCart}
              >
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              
              <button 
                className="favorite-btn"
                onClick={handleFavoriteToggle}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
            
            <div className="item-description">
              <h2>Description</h2>
              <p>{item.description}</p>
            </div>
            
            <div className="item-details-list">
              <h2>Product Details</h2>
              <ul>
                <li>
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">{item.category}</span>
                </li>
                <li>
                  <span className="detail-label">Brand:</span>
                  <span className="detail-value">{item.brand}</span>
                </li>
                {item.color && (
                  <li>
                    <span className="detail-label">Color:</span>
                    <span className="detail-value">{item.color}</span>
                  </li>
                )}
                {item.size && (
                  <li>
                    <span className="detail-label">Size:</span>
                    <span className="detail-value">{item.size}</span>
                  </li>
                )}
                {item.weight && (
                  <li>
                    <span className="detail-label">Weight:</span>
                    <span className="detail-value">{item.weight} kg</span>
                  </li>
                )}
                {item.dimensions && (
                  <li>
                    <span className="detail-label">Dimensions:</span>
                    <span className="detail-value">{item.dimensions}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail; 