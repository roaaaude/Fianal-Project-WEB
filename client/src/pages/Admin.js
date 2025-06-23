import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { itemService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';

const Admin = () => {
  const { user } = useAuth();
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
      setError('Failed to load items.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    setError('');
    setSuccess('');
    try {
      await itemService.deleteItem(id);
      setSuccess('Item deleted successfully.');
      fetchItems();
    } catch (err) {
      setError('Failed to delete item.');
    }
  };

  if (!user || user.role !== 'admin') {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>You do not have access to this page.</div>;
  }

  return (
    <div style={{ background: '#f6f8fa', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: '2rem' }}>
        <h1 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: '1.5rem', color: '#2d3748' }}>Admin Dashboard</h1>
        <button className="btn btn-primary" style={{ marginBottom: '1.5rem', fontWeight: 600, fontSize: '1rem', padding: '0.5rem 1.5rem' }} onClick={() => navigate('/admin/add-item')}>
          + Add New Item
        </button>
        {error && <Alert type="danger" message={error} onClose={() => setError('')} />}
        {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}
        {loading ? (
          <Spinner />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <thead style={{ background: '#f1f5f9' }}>
                <tr>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#4a5568', fontWeight: 600 }}>Title</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#4a5568', fontWeight: 600 }}>Category</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#4a5568', fontWeight: 600 }}>Price</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#4a5568', fontWeight: 600 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 500 }}>{item.title}</td>
                    <td style={{ padding: '0.75rem', textTransform: 'capitalize' }}>{item.category}</td>
                    <td style={{ padding: '0.75rem' }}>${item.price.toFixed(2)}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <button className="btn btn-outline" onClick={() => navigate(`/admin/edit-item/${item._id}`)} style={{ marginRight: '0.5rem', fontWeight: 500 }}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(item._id)} style={{ fontWeight: 500 }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin; 