import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import '../assets/styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #0a0a0a 0%, #050505 100%)',
      color: 'rgba(255,255,255,0.75)',
      borderTop: '1px solid rgba(201,168,76,0.2)',
    }}>
      <div className="container" style={{ padding: '4rem 1rem 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem',
        }}>
          {/* Brand Column */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
                <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                  <polygon points="18,2 33,10 33,26 18,34 3,26 3,10" stroke="#c9a84c" strokeWidth="2" fill="none"/>
                  <rect x="11" y="13" width="6" height="10" rx="1" fill="#c9a84c"/>
                  <rect x="19" y="15" width="6" height="8" rx="3" fill="#c9a84c"/>
                  <line x1="9" y1="23" x2="27" y2="23" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="12" cy="24.5" r="1.5" fill="#c9a84c"/>
                  <circle cx="24" cy="24.5" r="1.5" fill="#c9a84c"/>
                </svg>
                <div>
                  <div style={{
                    fontSize: '1.1rem', fontWeight: 800, letterSpacing: '2px',
                    background: 'linear-gradient(135deg, #c9a84c, #e8c97a)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>VENESIA</div>
                  <div style={{ fontSize: '0.6rem', color: 'rgba(201,168,76,0.6)', letterSpacing: '1.5px' }}>
                    MEDICAL LASER COMPANY
                  </div>
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', marginBottom: '1.5rem' }}>
              {t('footerAbout')}
            </p>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {[
                { icon: <FaFacebookF />, href: '#' },
                { icon: <FaInstagram />, href: '#' },
                { icon: <FaWhatsapp />, href: 'https://wa.me/97259227000' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: 'rgba(201,168,76,0.1)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--primary-color)', fontSize: '0.9rem',
                  transition: 'var(--transition)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.25)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.1)'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              color: 'var(--primary-color)', marginBottom: '1.25rem',
              fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
            }}>
              {t('quickLinks')}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { to: '/', label: t('home') },
                { to: '/items', label: t('products') },
                { to: '/about', label: t('about') },
                { to: '/contact', label: t('contact') },
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.to} style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '0.88rem',
                    transition: 'var(--transition)',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary-color)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 style={{
              color: 'var(--primary-color)', marginBottom: '1.25rem',
              fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
            }}>
              {t('ourProducts')}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[t('prod1'), t('prod2'), t('prod3'), t('prod4')].map((prod, i) => (
                <li key={i}>
                  <Link to="/items" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', transition: 'var(--transition)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary-color)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                  >
                    {prod}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              color: 'var(--primary-color)', marginBottom: '1.25rem',
              fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase',
            }}>
              {t('contactUs')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {[
                { icon: <FaMapMarkerAlt />, text: t('locationValue') },
                { icon: <FaPhone />, text: '+972 59-227-0000' },
                { icon: <FaEnvelope />, text: t('emailValue') },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--primary-color)', flexShrink: 0, marginTop: '2px', fontSize: '0.85rem' }}>
                    {item.icon}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(201,168,76,0.1)',
          paddingTop: '1.5rem',
          textAlign: 'center',
          color: 'rgba(255,255,255,0.3)',
          fontSize: '0.82rem',
        }}>
          &copy; {currentYear} VENESIA Medical Laser Company. {t('allRights')}.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
