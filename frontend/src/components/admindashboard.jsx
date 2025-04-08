import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://ammanmedicals.onrender.com');
      if (res.data.success) {
        setProducts(res.data.products);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://ammanmedicals.onrender.com', formData);
      if (res.data.success) {
        alert('Product added!');
        fetchProducts();
        setFormData({ name: '', price: '', description: '', image: '' });
      }
    } catch (err) {
      alert('Failed to add product');
    }
}};

  // UI is same as before...


const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f7f9fb',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '0 auto 2rem',
    gap: '1rem',
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    resize: 'vertical',
    minHeight: '80px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#1e88e5',
    color: '#fff',
    border: 'none',
    fontSize: '16px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '1rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  title: {
    marginTop: '10px',
    fontSize: '18px',
    color: '#333',
  },
  desc: {
    fontSize: '14px',
    color: '#666',
    margin: '8px 0',
  },
  price: {
    fontWeight: 'bold',
    color: '#1e88e5',
  },
};

export default AdminDashboard;
