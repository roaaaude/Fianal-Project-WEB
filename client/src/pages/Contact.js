import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane, FaClock, FaCheckCircle } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import '../assets/styles/contact.css';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t('nameRequired');
    if (!formData.email.trim()) newErrors.email = t('emailRequired');
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = t('emailInvalid');
    if (!formData.subject.trim()) newErrors.subject = t('subjectRequired');
    if (!formData.message.trim()) newErrors.message = t('messageRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  const contactInfo = [
    { icon: <FaMapMarkerAlt />, title: t('ourLocation'), value: t('locationValue') },
    { icon: <FaPhone />, title: t('phoneNumber'), value: '+972 59-227-0000' },
    { icon: <FaEnvelope />, title: t('emailAddress'), value: t('emailValue') },
  ];

  const hours = [t('hours1'), t('hours2'), t('hours3')];

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
            {t('contactTitle')}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem' }}>
            {t('contactSubtitle')}
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '4rem 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '3rem', alignItems: 'start' }}>

          {/* Contact Info */}
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--dark-color)' }}>
              {t('getInTouch')}
            </h2>
            <p style={{ color: 'var(--text-light)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem' }}>
              {t('contactDesc')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              {contactInfo.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '1rem',
                  padding: '1.25rem',
                  background: '#fff',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  transition: 'var(--transition)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary-color)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                >
                  <div style={{
                    width: '44px', height: '44px', flexShrink: 0, borderRadius: '10px',
                    background: 'linear-gradient(135deg, #0a0a0a, #1a1a1a)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--primary-color)', fontSize: '1.1rem',
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '0.25rem', color: 'var(--dark-color)', fontSize: '0.9rem', fontWeight: 700 }}>
                      {item.title}
                    </h4>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Business Hours */}
            <div style={{
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #0a0a0a, #1a1a1a)',
              borderRadius: '12px',
              border: '1px solid rgba(201,168,76,0.2)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <FaClock style={{ color: 'var(--primary-color)' }} />
                <h4 style={{ color: '#fff', fontSize: '1rem' }}>{t('businessHours')}</h4>
              </div>
              {hours.map((h, i) => (
                <p key={i} style={{
                  color: 'rgba(255,255,255,0.65)', fontSize: '0.88rem',
                  marginBottom: i < hours.length - 1 ? '0.4rem' : 0,
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                }}>
                  <FaCheckCircle style={{ color: 'var(--primary-color)', fontSize: '0.75rem', flexShrink: 0 }} />
                  {h}
                </p>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '2.5rem',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--box-shadow)',
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{
                  width: '70px', height: '70px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05))',
                  border: '2px solid rgba(201,168,76,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '2rem', color: 'var(--primary-color)',
                }}>
                  <FaCheckCircle />
                </div>
                <h2 style={{ marginBottom: '1rem', color: 'var(--dark-color)' }}>{t('thankYou')}</h2>
                <p style={{ color: 'var(--text-light)', marginBottom: '2rem', lineHeight: 1.8 }}>
                  {t('messageSent')}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => setSubmitted(false)}
                >
                  {t('sendAnother')}
                </button>
              </div>
            ) : (
              <>
                <h2 style={{ marginBottom: '1.75rem', color: 'var(--dark-color)', fontSize: '1.4rem' }}>
                  {t('sendMessage')}
                </h2>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">{t('yourName')}</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                        style={errors.name ? { borderColor: 'var(--danger-color)' } : {}}
                      />
                      {errors.name && <div className="form-error">{errors.name}</div>}
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">{t('yourEmail')}</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        style={errors.email ? { borderColor: 'var(--danger-color)' } : {}}
                      />
                      {errors.email && <div className="form-error">{errors.email}</div>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('subject')}</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-control"
                      style={errors.subject ? { borderColor: 'var(--danger-color)' } : {}}
                    />
                    {errors.subject && <div className="form-error">{errors.subject}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('yourMessage')}</label>
                    <textarea
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-control"
                      style={{ resize: 'vertical', ...(errors.message ? { borderColor: 'var(--danger-color)' } : {}) }}
                    />
                    {errors.message && <div className="form-error">{errors.message}</div>}
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    <FaPaperPlane /> {t('send')}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section style={{ background: 'var(--background-color)', padding: '4rem 0' }}>
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: '2rem' }}>
            {t('ourLocation')}
          </h2>
          <div style={{
            borderRadius: '16px', overflow: 'hidden',
            border: '1px solid rgba(201,168,76,0.3)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
          }}>
            <iframe
              title="Venesia Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13490.21523424!2d35.19970!3d31.90220!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d2bf5a4c55555%3A0x67f9b24d74af0ca7!2sRamallah!5e0!3m2!1sen!2sps!4v1640000000000!5m2!1sen!2sps"
              width="100%"
              height="350"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
