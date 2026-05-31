import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaHeart, FaGlobe } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import CartIcon from './CartIcon';
import '../assets/styles/header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { t, toggleLang, lang } = useLanguage();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <div className="logo-container">
              <img
                src="/logo.png"
                alt="VENESIA Medical Laser Company"
                className="logo-img"
                onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
              <div className="logo-fallback" style={{ display: 'none' }}>
                <div className="logo-text">
                  <span className="logo-name">VENESIA</span>
                  <span className="logo-sub">Medical Laser Company</span>
                </div>
              </div>
            </div>
          </Link>

          <ul className="navbar-menu">
            <li className="navbar-item">
              <NavLink to="/" className="navbar-link" end>
                {t('home')}
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/items" className="navbar-link">
                {t('products')}
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/about" className="navbar-link">
                {t('about')}
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/contact" className="navbar-link">
                {t('contact')}
              </NavLink>
            </li>
            {isAuthenticated && (
              <li className="navbar-item">
                <NavLink to="/favorites" className="navbar-link">
                  <FaHeart style={{ marginInlineEnd: '4px' }} /> {t('favorites')}
                </NavLink>
              </li>
            )}
            {isAuthenticated && isAdmin() && (
              <li className="navbar-item">
                <NavLink to="/admin" className="navbar-link">
                  {t('admin')}
                </NavLink>
              </li>
            )}
          </ul>

          <div className="navbar-actions">
            <button className="lang-btn" onClick={toggleLang} title="Switch Language">
              <FaGlobe />
              <span>{lang === 'ar' ? 'EN' : 'عر'}</span>
            </button>

            {isAuthenticated ? (
              <div className="navbar-dropdown">
                <div className="navbar-link navbar-user">
                  <FaUser />
                  <span>{user.username}</span>
                </div>
                <div className="dropdown-menu">
                  <NavLink to="/profile" className="dropdown-item" onClick={closeMenu}>
                    {t('profile')}
                  </NavLink>
                  <div className="dropdown-item" onClick={handleLogout}>
                    <FaSignOutAlt style={{ marginInlineEnd: '6px' }} />
                    {t('logout')}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <NavLink to="/login" className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>
                  {t('login')}
                </NavLink>
                <NavLink to="/register" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>
                  {t('register')}
                </NavLink>
              </>
            )}
            <CartIcon />
          </div>

          <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <button className="mobile-menu-close" onClick={closeMenu}>
          <FaTimes />
        </button>

        <ul className="mobile-menu-items">
          <li><NavLink to="/" className="mobile-menu-link" onClick={closeMenu} end>{t('home')}</NavLink></li>
          <li><NavLink to="/items" className="mobile-menu-link" onClick={closeMenu}>{t('products')}</NavLink></li>
          <li><NavLink to="/about" className="mobile-menu-link" onClick={closeMenu}>{t('about')}</NavLink></li>
          <li><NavLink to="/contact" className="mobile-menu-link" onClick={closeMenu}>{t('contact')}</NavLink></li>
          {isAuthenticated && (
            <li><NavLink to="/favorites" className="mobile-menu-link" onClick={closeMenu}><FaHeart /> {t('favorites')}</NavLink></li>
          )}
          {isAuthenticated && isAdmin() && (
            <li><NavLink to="/admin" className="mobile-menu-link" onClick={closeMenu}>{t('admin')}</NavLink></li>
          )}
          <div className="mobile-menu-divider"></div>
          {isAuthenticated ? (
            <>
              <li><NavLink to="/profile" className="mobile-menu-link" onClick={closeMenu}><FaUser /> {t('profile')}</NavLink></li>
              <li><div className="mobile-menu-link" onClick={handleLogout}><FaSignOutAlt /> {t('logout')}</div></li>
            </>
          ) : (
            <>
              <li><NavLink to="/login" className="mobile-menu-link" onClick={closeMenu}>{t('login')}</NavLink></li>
              <li><NavLink to="/register" className="mobile-menu-link" onClick={closeMenu}>{t('register')}</NavLink></li>
            </>
          )}
          <div className="mobile-menu-divider"></div>
          <li>
            <button className="mobile-lang-btn" onClick={() => { toggleLang(); closeMenu(); }}>
              <FaGlobe /> {lang === 'ar' ? 'English' : 'العربية'}
            </button>
          </li>
        </ul>
      </div>

      <div className={`overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}></div>
    </header>
  );
};

export default Header;
