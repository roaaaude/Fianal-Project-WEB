import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { itemService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/Alert';

const categories = [
  'electronics',
  'clothing',
  'books',
  'home',
  'sports',
  'other',
];

const EditItem = () => {
  const { user } = useAuth();
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line
  }, [id]);

  const fetchItem = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await itemService.getItemById(id);
      const item = response.data.data;
      setForm({
        title: item.title || '',
        description: item.description || '',
        price: item.price || '',
        imageUrl: item.imageUrl || '',
        category: item.category || '',
        tags: (item.tags || []).join(', '),
      });
    } catch (err) {
      setError('Failed to load item.');
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'admin') {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>You do not have access to this page.</div>;
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
      await itemService.updateItem(id, itemData);
      setSuccess('Item updated successfully!');
      setTimeout(() => navigate('/admin'), 1000);
    } catch (err) {
      setError('Failed to update item.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 0', maxWidth: 600 }}>
      <h2>Edit Item</h2>
      {error && <Alert type="danger" message={error} onClose={() => setError('')} />}
      {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} className="form-control" required min="0" step="0.01" />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input type="text" name="imageUrl" value={form.imageUrl} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="form-control" required>
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Tags (comma separated)</label>
            <input type="text" name="tags" value={form.tags} onChange={handleChange} className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" className="btn btn-outline" style={{ marginLeft: '1rem' }} onClick={() => navigate('/admin')}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default EditItem; 