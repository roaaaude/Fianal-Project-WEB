import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaBoxOpen } from 'react-icons/fa';
import { itemService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';

const categoryLabels = {
  laser: 'أجهزة الليزر / Laser',
  'body-sculpting': 'نحت الجسم / Body Sculpting',
  'skin-care': 'العناية بالبشرة / Skin Care',
  'center-supplies': 'تجهيزات المراكز / Center Supplies',
  other: 'أخرى / Other',
};

const Admin = () => {
  const { user } = useAuth();
  const { isRTL } = useLanguage();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await itemService.getItems();
      setItems(response.data.data);
    } catch (err) {
      setError('فشل تحميل المنتجات / Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const msg = isRTL ? 'هل أنت متأكد من حذف هذا المنتج؟' : 'Are you sure you want to delete this product?';
    if (!window.confirm(msg)) return;
    setError('');
    setSuccess('');
    try {
      await itemService.deleteItem(id);
      setSuccess(isRTL ? 'تم حذف المنتج بنجاح.' : 'Product deleted successfully.');
      fetchItems();
    } catch (err) {
      setError(isRTL ? 'فشل حذف المنتج.' : 'Failed to delete product.');
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-light)' }}>
        {isRTL ? 'ليس لديك صلاحية الوصول لهذه الصفحة.' : 'You do not have access to this page.'}
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--background-color)', minHeight: '100vh', padding: '2.5rem 0' }}>
      <div className="container">

        {/* Page Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0a0a0a, #1a1a1a)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          border: '1px solid rgba(201,168,76,0.2)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
        }}>
          <div>
            <h1 style={{
              fontSize: '1.75rem', fontWeight: 800,
              background: 'linear-gradient(135deg, #c9a84c, #e8c97a)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              marginBottom: '0.25rem',
            }}>
              {isRTL ? 'لوحة الإدارة' : 'Admin Dashboard'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
              VENESIA Medical Laser Company
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/admin/add-item')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <FaPlus />
            {isRTL ? 'إضافة منتج جديد' : 'Add New Product'}
          </button>
        </div>

        {error && <Alert type="danger" message={error} onClose={() => setError('')} />}
        {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

        {/* Stats Bar */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem', marginBottom: '2rem',
        }}>
          {[
            { label: isRTL ? 'إجمالي المنتجات' : 'Total Products', value: items.length },
            { label: isRTL ? 'أجهزة الليزر' : 'Laser Devices', value: items.filter(i => i.category === 'laser').length },
            { label: isRTL ? 'نحت الجسم' : 'Body Sculpting', value: items.filter(i => i.category === 'body-sculpting').length },
            { label: isRTL ? 'العناية بالبشرة' : 'Skin Care', value: items.filter(i => i.category === 'skin-care').length },
          ].map((stat, i) => (
            <div key={i} style={{
              background: '#fff', padding: '1.25rem', borderRadius: '12px',
              border: '1px solid var(--border-color)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-color)' }}>{stat.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Products Table */}
        <div style={{
          background: '#fff', borderRadius: '16px',
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
          boxShadow: 'var(--box-shadow)',
        }}>
          <div style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}>
            <FaBoxOpen style={{ color: 'var(--primary-color)' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>
              {isRTL ? 'قائمة المنتجات' : 'Products List'}
            </h3>
          </div>

          {loading ? (
            <div style={{ padding: '3rem' }}><Spinner /></div>
          ) : items.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-light)' }}>
              <FaBoxOpen size={40} style={{ color: 'var(--border-color)', marginBottom: '1rem' }} />
              <p>{isRTL ? 'لا توجد منتجات بعد. ابدأ بإضافة أول منتج!' : 'No products yet. Start by adding your first product!'}</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--background-color)' }}>
                    {[
                      isRTL ? 'الصورة' : 'Image',
                      isRTL ? 'اسم المنتج' : 'Product Name',
                      isRTL ? 'التصنيف' : 'Category',
                      isRTL ? 'السعر' : 'Price',
                      isRTL ? 'الإجراءات' : 'Actions',
                    ].map((h, i) => (
                      <th key={i} style={{
                        padding: '0.9rem 1rem', textAlign: isRTL ? 'right' : 'left',
                        fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-light)',
                        textTransform: 'uppercase', letterSpacing: '0.5px',
                        borderBottom: '1px solid var(--border-color)',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item._id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.03)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div style={{
                          width: '50px', height: '50px', borderRadius: '8px',
                          overflow: 'hidden', border: '1px solid var(--border-color)',
                          background: 'var(--background-color)',
                        }}>
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <FaBoxOpen style={{ color: 'var(--border-color)' }} />
                            </div>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: 'var(--dark-color)' }}>
                        {item.title}
                      </td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600,
                          background: 'rgba(201,168,76,0.1)', color: 'var(--primary-color)',
                          border: '1px solid rgba(201,168,76,0.2)',
                        }}>
                          {categoryLabels[item.category] || item.category}
                        </span>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--primary-color)' }}>
                        ${item.price?.toFixed(2)}
                      </td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            className="btn btn-outline"
                            onClick={() => navigate(`/admin/edit-item/${item._id}`)}
                            style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                          >
                            <FaEdit /> {isRTL ? 'تعديل' : 'Edit'}
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(item._id)}
                            style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                          >
                            <FaTrash /> {isRTL ? 'حذف' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
