import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import '../assets/styles/cart.css';

const Cart = () => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getSubtotal 
  } = useCart();

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button 
            className="close-cart" 
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <FaTimes />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link 
              to="/items" 
              className="continue-shopping"
              onClick={() => setIsCartOpen(false)}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="cart-item-image">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                    />
                  </div>
                  <div className="cart-item-details">
                    <h3 className="cart-item-title">
                      <Link 
                        to={`/items/${item._id}`}
                        onClick={() => setIsCartOpen(false)}
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <p className="cart-item-price">
                      {formatPrice(item.salePrice || item.price)}
                    </p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-control">
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <FaMinus />
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <button 
                      className="remove-item" 
                      onClick={() => removeFromCart(item._id)}
                      aria-label="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-summary">
                <div className="subtotal">
                  <span>Subtotal:</span>
                  <span>{formatPrice(getSubtotal())}</span>
                </div>
                <p className="tax-shipping-note">Taxes and shipping calculated at checkout</p>
              </div>
              
              <div className="cart-buttons">
                <button 
                  className="clear-cart" 
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
                <Link 
                  to="/checkout" 
                  className="checkout-btn"
                  onClick={() => setIsCartOpen(false)}
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart; 