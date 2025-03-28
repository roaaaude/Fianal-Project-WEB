import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart, FaSearch, FaUser, FaSignOutAlt, FaHeart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import CartIcon from './CartIcon';
import '../assets/styles/header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/items?search=${searchTerm.trim()}`);
      setSearchTerm('');
      closeMenu();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="navbar-logo">
            <span>ShopEasy</span>
          </Link>

          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search for items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn search-button">
              <FaSearch />
            </button>
          </form>

          <ul className="navbar-menu">
            <li className="navbar-item">
              <NavLink to="/" className="navbar-link">
                Home
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/items" className="navbar-link">
                Shop
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/about" className="navbar-link">
                About
              </NavLink>
            </li>
            {isAuthenticated ? (
              <>
                <li className="navbar-item">
                  <NavLink to="/favorites" className="navbar-link">
                    <FaHeart /> Favorites
                  </NavLink>
                </li>
                {isAdmin() && (
                  <li className="navbar-item">
                    <NavLink to="/admin" className="navbar-link">
                      Admin
                    </NavLink>
                  </li>
                )}
                <li className="navbar-item navbar-dropdown">
                  <div className="navbar-link navbar-user">
                    <FaUser /> {user.username}
                  </div>
                  <div className="dropdown-menu">
                    <NavLink to="/profile" className="dropdown-item">
                      My Profile
                    </NavLink>
                    <div className="dropdown-item" onClick={handleLogout}>
                      <FaSignOutAlt /> Logout
                    </div>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="navbar-item">
                  <NavLink to="/login" className="navbar-link">
                    Login
                  </NavLink>
                </li>
                <li className="navbar-item">
                  <NavLink to="/register" className="navbar-link">
                    Register
                  </NavLink>
                </li>
              </>
            )}
            <li className="navbar-item">
              <CartIcon />
            </li>
          </ul>

          <button className="navbar-toggle" onClick={toggleMenu}>
            <FaBars />
          </button>
          
          <div className="header-actions">
            <CartIcon />
          </div>
        </nav>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <button className="mobile-menu-close" onClick={closeMenu}>
          <FaTimes />
        </button>
        
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search for items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn search-button">
            <FaSearch />
          </button>
        </form>
        
        <ul className="mobile-menu-items">
          <li className="mobile-menu-item">
            <NavLink to="/" className="mobile-menu-link" onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li className="mobile-menu-item">
            <NavLink to="/items" className="mobile-menu-link" onClick={closeMenu}>
              Shop
            </NavLink>
          </li>
          <li className="mobile-menu-item">
            <NavLink to="/about" className="mobile-menu-link" onClick={closeMenu}>
              About
            </NavLink>
          </li>
          {isAuthenticated ? (
            <>
              <li className="mobile-menu-item">
                <NavLink to="/favorites" className="mobile-menu-link" onClick={closeMenu}>
                  <FaHeart /> Favorites
                </NavLink>
              </li>
              {isAdmin() && (
                <li className="mobile-menu-item">
                  <NavLink to="/admin" className="mobile-menu-link" onClick={closeMenu}>
                    Admin
                  </NavLink>
                </li>
              )}
              <div className="mobile-menu-divider"></div>
              <li className="mobile-menu-item">
                <NavLink to="/profile" className="mobile-menu-link" onClick={closeMenu}>
                  <FaUser /> My Profile
                </NavLink>
              </li>
              <li className="mobile-menu-item">
                <div className="mobile-menu-link" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </div>
              </li>
            </>
          ) : (
            <>
              <div className="mobile-menu-divider"></div>
              <li className="mobile-menu-item">
                <NavLink to="/login" className="mobile-menu-link" onClick={closeMenu}>
                  Login
                </NavLink>
              </li>
              <li className="mobile-menu-item">
                <NavLink to="/register" className="mobile-menu-link" onClick={closeMenu}>
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className={`overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}></div>
    </header>
  );
};

export default Header; 