import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaTimes, FaImage } from 'react-icons/fa';
import { itemService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Alert from '../components/Alert';

const categories = [
  { value: 'laser', labelAr: 'أجهزة الليزر', labelEn: 'Laser Devices' },
  { value: 'body-sculpting', labelAr: 'نحت الجسم', labelEn: 'Body Sculpting' },
  { value: 'skin-care', labelAr: 'العناية بالبشرة', labelEn: 'Skin Care' },
  { value: 'center-supplies', labelAr: 'تجهيزات المراكز', labelEn: 'Center Supplies' },
  { value: 'other', labelAr: 'أخرى', labelEn: 'Other' },
];

const AddItem = () => {
  const { user } = useAuth();
  const { isRTL } = useLanguage();
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    tags: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!user || user.role !== 'admin') {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-light)' }}>
        {isRTL ? 'ليس لديك صلاحية الوصول.' : 'You do not have access to this page.'}
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const itemData = {
        ...form,
        price: parseFloat(form.price),
        tags: form.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      };
      await itemService.createItem(itemData);
      setSuccess(isRTL ? 'تمت إضافة المنتج بنجاح!' : 'Product added successfully!');
      setTimeout(() => navigate('/admin'), 1200);
    } catch (err) {
      setError(isRTL ? 'فشل إضافة المنتج. تحقق من البيانات.' : 'Failed to add product. Check the data.');
    } finally {
      setLoading(false);
    }
  };

  const label = (ar, en) => isRTL ? ar : en;

  return (
    <div style={{ background: 'var(--background-color)', minHeight: '100vh', padding: '2.5rem 0' }}>
      <div className="container" style={{ maxWidth: '700px' }}>

        {/* Page Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0a0a0a, #1a1a1a)',
          borderRadius: '16px', padding: '1.75rem 2rem', marginBottom: '2rem',
          border: '1px solid rgba(201,168,76,0.2)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <h1 style={{
            fontSize: '1.5rem', fontWeight: 800,
            background: 'linear-gradient(135deg, #c9a84c, #e8c97a)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            {label('إضافة منتج جديد', 'Add New Product')}
          </h1>
          <button
            type="button"
            onClick={() => navigate('/admin')}
            style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
              padding: '0.4rem 0.7rem', fontSize: '1rem',
            }}
          >
            <FaTimes />
          </button>
        </div>

        {error && <Alert type="danger" message={error} onClose={() => setError('')} />}
        {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

        <div style={{
          background: '#fff', borderRadius: '16px', padding: '2rem',
          border: '1px solid var(--border-color)', boxShadow: 'var(--box-shadow)',
        }}>
          <form onSubmit={handleSubmit}>

            {/* Image Preview */}
            {form.imageUrl && (
              <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <img
                  src={form.imageUrl}
                  alt="preview"
                  style={{ maxHeight: '180px', maxWidth: '100%', borderRadius: '10px', border: '1px solid var(--border-color)', objectFit: 'cover' }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">{label('اسم المنتج *', 'Product Name *')}</label>
                <input type="text" name="title" value={form.title} onChange={handleChange} className="form-control" required placeholder={label('مثال: جهاز ليزر إزالة الشعر', 'e.g. Hair Removal Laser Device')} />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">{label('وصف المنتج *', 'Product Description *')}</label>
                <textarea name="description" value={form.description} onChange={handleChange} className="form-control" required rows="4" placeholder={label('اكتب وصفاً تفصيلياً للمنتج...', 'Write a detailed description...')} style={{ resize: 'vertical' }} />
                <small style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>
                  {label('الحد الأدنى 10 أحرف', 'Minimum 10 characters')}
                </small>
              </div>

              <div className="form-group">
                <label className="form-label">{label('السعر (USD) *', 'Price (USD) *')}</label>
                <input type="number" name="price" value={form.price} onChange={handleChange} className="form-control" required min="0" step="0.01" placeholder="0.00" />
              </div>

              <div className="form-group">
                <label className="form-label">{label('التصنيف *', 'Category *')}</label>
                <select name="category" value={form.category} onChange={handleChange} className="form-control" required>
                  <option value="">{label('اختر التصنيف', 'Select category')}</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {isRTL ? cat.labelAr : cat.labelEn}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">
                  <FaImage style={{ marginInlineEnd: '0.4rem', color: 'var(--primary-color)' }} />
                  {label('رابط صورة المنتج *', 'Product Image URL *')}
                </label>
                <input type="url" name="imageUrl" value={form.imageUrl} onChange={handleChange} className="form-control" required placeholder="https://example.com/image.jpg" />
                <small style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>
                  {label('أدخل رابط صورة المنتج', 'Enter the product image URL')}
                </small>
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">{label('الكلمات المفتاحية (مفصولة بفاصلة)', 'Tags (comma separated)')}</label>
                <input type="text" name="tags" value={form.tags} onChange={handleChange} className="form-control" placeholder={label('مثال: ليزر, تجميل, بشرة', 'e.g. laser, beauty, skin')} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 1, justifyContent: 'center' }}>
                <FaSave /> {loading ? (label('جاري الحفظ...', 'Saving...')) : label('حفظ المنتج', 'Save Product')}
              </button>
              <button type="button" className="btn btn-outline" onClick={() => navigate('/admin')} style={{ flex: 1, justifyContent: 'center' }}>
                <FaTimes /> {label('إلغاء', 'Cancel')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
