import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft, FaBolt, FaStar, FaShieldAlt, FaTruck, FaHeadset, FaCheckCircle, FaRunning, FaLeaf, FaCogs } from 'react-icons/fa';
import { itemService, favoriteService } from '../services/api';
import ItemCard from '../components/ItemCard';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const { isAuthenticated } = useAuth();
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        const response = await itemService.getItems({ limit: 6, sort: '-rating' });
        setFeaturedItems(response.data.data);
      } catch (error) {
        console.error('Error fetching featured items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedItems();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchFavorites = async () => {
      try {
        const response = await favoriteService.getFavorites();
        setFavorites(response.data.data.map(fav => fav.item._id));
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };
    fetchFavorites();
  }, [isAuthenticated]);

  const handleFavoriteToggle = (itemId) => {
    setFavorites(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const ArrowIcon = isRTL ? FaArrowLeft : FaArrowRight;

  const services = [
    {
      icon: <FaBolt size={38} />,
      title: t('service1Title'),
      desc: t('service1Desc'),
    },
    {
      icon: <FaRunning size={38} />,
      title: t('service2Title'),
      desc: t('service2Desc'),
    },
    {
      icon: <FaLeaf size={38} />,
      title: t('service3Title'),
      desc: t('service3Desc'),
    },
    {
      icon: <FaCogs size={38} />,
      title: t('service4Title'),
      desc: t('service4Desc'),
    },
  ];

  const stats = [
    { number: '500+', label: t('stat1') },
    { number: '200+', label: t('stat2') },
    { number: '10+', label: t('stat3') },
    { number: '5+', label: t('stat4') },
  ];

  const whyUs = [
    { icon: <FaShieldAlt />, title: t('why1Title'), desc: t('why1Desc') },
    { icon: <FaStar />, title: t('why2Title'), desc: t('why2Desc') },
    { icon: <FaTruck />, title: t('why3Title'), desc: t('why3Desc') },
    { icon: <FaHeadset />, title: t('why4Title'), desc: t('why4Desc') },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1207 50%, #0a0a0a 100%)',
        color: 'white',
        padding: '6rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(201,168,76,0.05) 0%, transparent 50%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)',
            borderRadius: '20px', padding: '0.4rem 1rem', marginBottom: '2rem',
            fontSize: '0.85rem', color: 'var(--primary-color)',
          }}>
            <FaCheckCircle size={12} />
            <span>VENESIA Medical Laser Company</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #fff 0%, #c9a84c 50%, #fff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 800,
            lineHeight: 1.2,
          }}>
            {t('heroTitle')}
          </h1>

          <p style={{
            fontSize: '1.15rem', marginBottom: '2.5rem',
            maxWidth: '650px', margin: '0 auto 2.5rem',
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.8,
          }}>
            {t('heroSubtitle')}
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/items" className="btn btn-primary" style={{ fontSize: '1rem' }}>
              {t('heroBtn1')} <ArrowIcon />
            </Link>
            <Link to="/about" className="btn btn-outline-white" style={{ fontSize: '1rem' }}>
              {t('heroBtn2')}
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={{ padding: '5rem 0', background: '#fff' }}>
        <div className="container">
          <h2 className="section-title">{t('servicesTitle')}</h2>
          <div className="grid grid-4" style={{ marginTop: '3rem', gap: '1.5rem' }}>
            {services.map((service, i) => (
              <div key={i} style={{
                textAlign: 'center', padding: '2.5rem 1.5rem',
                background: '#fff',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                transition: 'var(--transition)',
                cursor: 'default',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--primary-color)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(201,168,76,0.15)';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  color: 'var(--primary-color)', marginBottom: '1.25rem',
                  display: 'flex', justifyContent: 'center',
                }}>
                  {service.icon}
                </div>
                <h3 style={{ marginBottom: '0.75rem', fontSize: '1.1rem', color: 'var(--dark-color)' }}>
                  {service.title}
                </h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '4rem 0',
        background: 'linear-gradient(135deg, #0a0a0a, #1a1a1a)',
        color: 'white',
      }}>
        <div className="container">
          <h2 style={{
            textAlign: 'center', marginBottom: '3rem', fontSize: '1.8rem',
            background: 'linear-gradient(135deg, #c9a84c, #e8c97a)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            {t('statsTitle')}
          </h2>
          <div className="grid grid-4" style={{ gap: '1rem' }}>
            {stats.map((stat, i) => (
              <div key={i} style={{
                textAlign: 'center', padding: '2rem 1rem',
                border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: '12px',
                background: 'rgba(201,168,76,0.05)',
              }}>
                <div style={{
                  fontSize: '2.5rem', fontWeight: 800,
                  background: 'linear-gradient(135deg, #c9a84c, #e8c97a)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  marginBottom: '0.5rem',
                }}>
                  {stat.number}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '5rem 0', background: 'var(--background-color)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--dark-color)' }}>{t('featuredTitle')}</h2>
            <Link to="/items" className="btn btn-outline" style={{ padding: '0.5rem 1.25rem' }}>
              {t('viewAll')} <ArrowIcon />
            </Link>
          </div>

          {loading ? (
            <Spinner />
          ) : featuredItems.length > 0 ? (
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
            <p style={{ textAlign: 'center', color: 'var(--text-light)', padding: '3rem' }}>
              {t('noProducts')}
            </p>
          )}
        </div>
      </section>

      {/* Why Us Section */}
      <section style={{ padding: '5rem 0', background: '#fff' }}>
        <div className="container">
          <h2 className="section-title">{t('whyUsTitle')}</h2>
          <div className="grid grid-4" style={{ marginTop: '3rem', gap: '1.5rem' }}>
            {whyUs.map((item, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                textAlign: 'center', padding: '2rem 1.25rem',
                background: 'var(--background-color)',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
              }}>
                <div style={{
                  width: '60px', height: '60px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))',
                  border: '2px solid rgba(201,168,76,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', color: 'var(--primary-color)', marginBottom: '1.25rem',
                }}>
                  {item.icon}
                </div>
                <h3 style={{ marginBottom: '0.6rem', fontSize: '1rem', color: 'var(--dark-color)' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.88rem', lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '5rem 0',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1207 50%, #0a0a0a 100%)',
        color: 'white',
        textAlign: 'center',
      }}>
        <div className="container">
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: '1rem',
            background: 'linear-gradient(135deg, #c9a84c, #e8c97a)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            {t('ctaTitle')}
          </h2>
          <p style={{ marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
            {t('ctaDesc')}
          </p>
          <Link to="/contact" className="btn btn-primary" style={{ fontSize: '1.05rem' }}>
            {t('ctaBtn')} <ArrowIcon />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
