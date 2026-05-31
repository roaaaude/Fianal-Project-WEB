import React from 'react';
import { Link } from 'react-router-dom';
import { FaAward, FaHandshake, FaLightbulb, FaEye, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? FaArrowLeft : FaArrowRight;

  const values = [
    { icon: <FaAward size={28} />, title: t('value1'), desc: t('value1Desc') },
    { icon: <FaHandshake size={28} />, title: t('value2'), desc: t('value2Desc') },
    { icon: <FaLightbulb size={28} />, title: t('value3'), desc: t('value3Desc') },
    { icon: <FaEye size={28} />, title: t('value4'), desc: t('value4Desc') },
  ];

  const team = [
    { name: isRTL ? 'د. محمد العمر' : 'Dr. Mohammed Al-Omar', role: isRTL ? 'المدير العام' : 'General Manager' },
    { name: isRTL ? 'سارة الناصر' : 'Sara Al-Nasser', role: isRTL ? 'مديرة المبيعات' : 'Sales Manager' },
    { name: isRTL ? 'أحمد البكر' : 'Ahmad Al-Bakr', role: isRTL ? 'رئيس الدعم الفني' : 'Technical Support Lead' },
  ];

  return (
    <div>
      {/* Page Header */}
      <section style={{
        background: 'linear-gradient(135deg, #0a0a0a, #1a1a1a)',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center',
      }}>
        <div className="container">
          <h1 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #c9a84c, #e8c97a)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            {t('aboutTitle')}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem' }}>
            VENESIA Medical Laser Company
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section style={{ padding: '5rem 0', background: '#fff' }}>
        <div className="container">
          <div className="grid grid-2" style={{ gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{
                fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--dark-color)',
                borderInlineStart: '4px solid var(--primary-color)',
                paddingInlineStart: '1rem',
              }}>
                {t('aboutMission')}
              </h2>
              <p style={{ lineHeight: 1.9, marginBottom: '1.25rem', color: 'var(--text-light)', fontSize: '1.05rem' }}>
                {t('aboutMissionText1')}
              </p>
              <p style={{ lineHeight: 1.9, color: 'var(--text-light)', fontSize: '1.05rem' }}>
                {t('aboutMissionText2')}
              </p>
              <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {[
                  isRTL ? 'أجهزة ليزر طبي' : 'Medical Laser',
                  isRTL ? 'نحت الجسم' : 'Body Sculpting',
                  isRTL ? 'العناية بالبشرة' : 'Skin Care',
                  isRTL ? 'تجهيزات المراكز' : 'Center Supplies',
                ].map((tag, i) => (
                  <span key={i} style={{
                    padding: '0.4rem 1rem',
                    background: 'rgba(201,168,76,0.1)',
                    border: '1px solid rgba(201,168,76,0.3)',
                    borderRadius: '20px',
                    color: 'var(--primary-color)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #0a0a0a, #1a1a1a)',
              borderRadius: '16px',
              padding: '3rem 2rem',
              textAlign: 'center',
              border: '1px solid rgba(201,168,76,0.2)',
            }}>
              <div style={{
                width: '100px', height: '100px', borderRadius: '50%',
                background: 'rgba(201,168,76,0.1)',
                border: '3px solid rgba(201,168,76,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}>
                <svg width="50" height="50" viewBox="0 0 36 36" fill="none">
                  <polygon points="18,2 33,10 33,26 18,34 3,26 3,10" stroke="#c9a84c" strokeWidth="2" fill="none"/>
                  <rect x="11" y="13" width="6" height="10" rx="1" fill="#c9a84c"/>
                  <rect x="19" y="15" width="6" height="8" rx="3" fill="#c9a84c"/>
                  <line x1="9" y1="23" x2="27" y2="23" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="12" cy="24.5" r="1.5" fill="#c9a84c"/>
                  <circle cx="24" cy="24.5" r="1.5" fill="#c9a84c"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.8rem', fontWeight: 800, letterSpacing: '2px',
                background: 'linear-gradient(135deg, #c9a84c, #e8c97a)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                marginBottom: '0.5rem',
              }}>VENESIA</h3>
              <p style={{ color: 'rgba(201,168,76,0.6)', fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase' }}>
                Medical Laser Company
              </p>
              <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[['500+', isRTL ? 'عميل' : 'Clients'], ['10+', isRTL ? 'سنوات' : 'Years'], ['200+', isRTL ? 'منتج' : 'Products'], ['5+', isRTL ? 'دول' : 'Countries']].map(([n, l]) => (
                  <div key={l} style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '1.5rem', fontWeight: 800,
                      background: 'linear-gradient(135deg, #c9a84c, #e8c97a)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>{n}</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ padding: '5rem 0', background: 'var(--background-color)' }}>
        <div className="container">
          <h2 className="section-title">{t('ourValues')}</h2>
          <div className="grid grid-4" style={{ marginTop: '3rem', gap: '1.5rem' }}>
            {values.map((val, i) => (
              <div key={i} style={{
                textAlign: 'center', padding: '2.5rem 1.5rem',
                background: '#fff', borderRadius: '12px',
                border: '1px solid var(--border-color)',
                transition: 'var(--transition)',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--primary-color)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(201,168,76,0.12)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '65px', height: '65px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0a0a0a, #1a1a1a)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--primary-color)', margin: '0 auto 1.25rem',
                  border: '2px solid rgba(201,168,76,0.3)',
                }}>
                  {val.icon}
                </div>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--dark-color)', fontSize: '1.05rem' }}>
                  {val.title}
                </h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ padding: '5rem 0', background: '#fff' }}>
        <div className="container">
          <h2 className="section-title">{t('ourTeam')}</h2>
          <p className="section-subtitle">{t('teamDesc')}</p>
          <div className="grid grid-3" style={{ gap: '2rem' }}>
            {team.map((member, i) => (
              <div key={i} style={{
                textAlign: 'center', padding: '2.5rem 1.5rem',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                transition: 'var(--transition)',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--primary-color)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(201,168,76,0.12)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '80px', height: '80px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0a0a0a, #1a1a1a)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  border: '3px solid rgba(201,168,76,0.4)',
                  fontSize: '2rem',
                  color: 'var(--primary-color)',
                }}>
                  {member.name.charAt(0)}
                </div>
                <h3 style={{ marginBottom: '0.4rem', color: 'var(--dark-color)' }}>{member.name}</h3>
                <p style={{ color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: 600 }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '4rem 0',
        background: 'linear-gradient(135deg, #0a0a0a, #1a1a1a)',
        textAlign: 'center',
      }}>
        <div className="container">
          <h2 style={{
            fontSize: '1.8rem', marginBottom: '1rem',
            background: 'linear-gradient(135deg, #c9a84c, #e8c97a)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            {t('ctaTitle')}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '2rem' }}>{t('ctaDesc')}</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary">{t('ctaBtn')} <ArrowIcon /></Link>
            <Link to="/items" className="btn btn-outline-white">{t('products')}</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
