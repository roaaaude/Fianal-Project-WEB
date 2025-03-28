import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import '../assets/styles/cartIcon.css';

const CartIcon = () => {
  const { getTotalItems, toggleCart } = useCart();
  const itemCount = getTotalItems();

  return (
    <button className="cart-icon-button" onClick={toggleCart} aria-label="View cart">
      <FaShoppingCart className="cart-icon" />
      {itemCount > 0 && (
        <span className="cart-count">{itemCount}</span>
      )}
    </button>
  );
};

export default CartIcon; 