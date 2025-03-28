import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../assets/styles/checkout.css';

const Checkout = () => {
  const { isAuthenticated, user } = useAuth();
  const { cartItems, getSubtotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    paymentMethod: 'credit'
  });
  
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // If authenticated, prefill user information
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prevState => ({
        ...prevState,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || ''
      }));
    }
  }, [isAuthenticated, user]);
  
  // If cart is empty, redirect to items page
  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced) {
      navigate('/items');
    }
  }, [cartItems, navigate, orderPlaced]);
  
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
    
    // Required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode'];
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Zip code validation (assuming US format)
    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid zip code';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        document.getElementsByName(firstErrorField)[0]?.focus();
      }
      return;
    }
    
    // Simulate order placement
    setOrderPlaced(true);
    
    // Clear cart after order is placed
    clearCart();
    
    // In a real application, you would:
    // 1. Send the order data to your backend API
    // 2. Process payment
    // 3. Create order in database
    // 4. Send confirmation email
    // 5. Redirect to order confirmation page
  };
  
  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  // Calculate tax (e.g., 10%)
  const calculateTax = () => {
    return getSubtotal() * 0.1;
  };
  
  // Calculate shipping (free for orders over $50, otherwise $5.99)
  const calculateShipping = () => {
    return getSubtotal() > 50 ? 0 : 5.99;
  };
  
  // Calculate total
  const calculateTotal = () => {
    return getSubtotal() + calculateTax() + calculateShipping();
  };
  
  if (orderPlaced) {
    return (
      <div className="container">
        <div className="order-confirmation">
          <div className="order-success">
            <h1>Order Confirmed!</h1>
            <p>Thank you for your purchase. Your order has been received and is being processed.</p>
            <p>A confirmation email has been sent to <strong>{formData.email}</strong>.</p>
            <div className="order-number">
              <p>Order Number:</p>
              <p className="number">{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
            <Link to="/items" className="shop-more-btn">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container">
      <div className="checkout-page">
        <h1>Checkout</h1>
        
        <div className="checkout-grid">
          <div className="checkout-form-container">
            <form onSubmit={handleSubmit} className="checkout-form">
              <h2>Shipping Information</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? 'error' : ''}
                  />
                  {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? 'error' : ''}
                  />
                  {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
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
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && <div className="error-message">{errors.address}</div>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <div className="error-message">{errors.city}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={errors.state ? 'error' : ''}
                  />
                  {errors.state && <div className="error-message">{errors.state}</div>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="zipCode">Zip Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={errors.zipCode ? 'error' : ''}
                  />
                  {errors.zipCode && <div className="error-message">{errors.zipCode}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value="USA">United States</option>
                    <option value="CAN">Canada</option>
                    <option value="MEX">Mexico</option>
                    <option value="GBR">United Kingdom</option>
                  </select>
                </div>
              </div>
              
              <h2>Payment Method</h2>
              
              <div className="payment-methods">
                <div className="payment-option">
                  <input
                    type="radio"
                    id="credit"
                    name="paymentMethod"
                    value="credit"
                    checked={formData.paymentMethod === 'credit'}
                    onChange={handleChange}
                  />
                  <label htmlFor="credit">Credit Card</label>
                </div>
                
                <div className="payment-option">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleChange}
                  />
                  <label htmlFor="paypal">PayPal</label>
                </div>
              </div>
              
              {/* Credit Card Form (simplified) */}
              {formData.paymentMethod === 'credit' && (
                <div className="credit-card-form">
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      placeholder="**** **** **** ****"
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiry">Expiry Date</label>
                      <input
                        type="text"
                        id="expiry"
                        placeholder="MM/YY"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        placeholder="***"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="checkout-actions">
                <Link to="/items" className="continue-shopping-btn">Continue Shopping</Link>
                <button type="submit" className="place-order-btn">Place Order</button>
              </div>
            </form>
          </div>
          
          <div className="order-summary">
            <h2>Order Summary</h2>
            
            <div className="cart-items-summary">
              {cartItems.map((item) => (
                <div key={item._id} className="summary-item">
                  <div className="summary-item-image">
                    <img src={item.imageUrl} alt={item.title} />
                    <span className="summary-item-quantity">{item.quantity}</span>
                  </div>
                  <div className="summary-item-details">
                    <h3>{item.title}</h3>
                    <p className="summary-item-price">
                      {formatPrice(item.salePrice || item.price)} × {item.quantity}
                    </p>
                  </div>
                  <div className="summary-item-total">
                    {formatPrice((item.salePrice || item.price) * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="price-details">
              <div className="price-row">
                <span>Subtotal</span>
                <span>{formatPrice(getSubtotal())}</span>
              </div>
              <div className="price-row">
                <span>Tax (10%)</span>
                <span>{formatPrice(calculateTax())}</span>
              </div>
              <div className="price-row">
                <span>Shipping</span>
                <span>
                  {calculateShipping() === 0
                    ? 'Free'
                    : formatPrice(calculateShipping())}
                </span>
              </div>
              <div className="price-row total">
                <span>Total</span>
                <span>{formatPrice(calculateTotal())}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 