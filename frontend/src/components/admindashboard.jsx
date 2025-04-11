import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    imageUrl: '',
    stock: ''
  });

  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [editingProductName, setEditingProductName] = useState('');

  const [clients, setClients] = useState([]); // 🆕 For client details
  const [showClients, setShowClients] = useState(false); // 🆕 Toggle view

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const addProduct = async () => {
    try {
      const response = await axios.post('https://ammanmedicals.onrender.com/api/products/add-product', {
        name: product.name,
        price: parseFloat(product.price),
        description: product.description,
        category: product.category,
        imageUrl: product.imageUrl,
        stock: parseInt(product.stock)
      });

      alert('✅ Product added successfully!');
      setProduct({ name: '', price: '', description: '', category: '', imageUrl: '', stock: '' });
      fetchProducts();
    } catch (error) {
      alert('❌ Failed to add product!');
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://ammanmedicals.onrender.com/api/products');
      setProducts(res.data);
      setShowProducts(true);
      setShowClients(false);
    } catch (err) {
      console.error('❌ Failed to fetch products:', err);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await axios.get('https://ammanmedicals.onrender.com/api/users'); // Adjust route if different
      setClients(res.data);
      setShowClients(true);
      setShowProducts(false);
    } catch (err) {
      console.error('❌ Failed to fetch clients:', err);
    }
  };

  const startEditProduct = (prod) => {
    setProduct({
      name: prod.name,
      price: prod.price,
      description: prod.description,
      category: prod.category,
      imageUrl: prod.imageUrl,
      stock: prod.stock
    });
    setIsEditing(true);
    setEditProductId(prod._id);
    setEditingProductName(prod.name);
  };

  const updateProduct = async () => {
    try {
      await axios.put(`https://ammanmedicals.onrender.com/api/products/${editProductId}`, {
        name: product.name,
        price: parseFloat(product.price),
        description: product.description,
        category: product.category,
        imageUrl: product.imageUrl,
        stock: parseInt(product.stock)
      });

      alert('✅ Product updated successfully!');
      setProduct({ name: '', price: '', description: '', category: '', imageUrl: '', stock: '' });
      setIsEditing(false);
      setEditProductId(null);
      fetchProducts();
    } catch (error) {
      alert('❌ Failed to update product!');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Dashboard</h2>

      {/* ➕ Add Product Section */}
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
        <h3>Add New Product</h3>
        <input name="name" placeholder="Product Name" value={product.name} onChange={handleChange} />
        <input name="price" placeholder="Price" value={product.price} onChange={handleChange} type="number" />
        <input name="description" placeholder="Description" value={product.description} onChange={handleChange} />
        <input name="category" placeholder="Category" value={product.category} onChange={handleChange} />
        <input name="imageUrl" placeholder="Image URL" value={product.imageUrl} onChange={handleChange} />
        <input name="stock" placeholder="Stock Quantity" value={product.stock} onChange={handleChange} type="number" />
        <button onClick={addProduct} style={{ marginTop: '10px' }}>Add Product</button>
        <button onClick={fetchProducts} style={{ marginTop: '10px' }}>View Products</button>
        <button onClick={fetchClients} style={{ marginTop: '10px' }}>View Clients</button> {/* 🆕 */}
      </div>

      
{/* 🛍️ Product List Section */}
{showProducts && (
  <div style={{ marginTop: '30px' }}>
    <h3>Uploaded Products</h3>
    {products.length === 0 ? (
      <p>No products available</p>
    ) : (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((prod) => (
          <div
            key={prod._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '15px',
              backgroundColor: '#f5f5f5',
              width: '250px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              transition: '0.3s ease',
            }}
          >
            {prod.imageUrl && (
              <img
                src={prod.imageUrl}
                alt={prod.name}
                style={{
                  width: '100%',
                  height: '160px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  marginBottom: '10px',
                }}
              />
            )}
            <h4 style={{ margin: '8px 0' }}>{prod.name}</h4>
            <p><strong>₹{prod.price}</strong></p>
            <p style={{ fontSize: '14px' }}>{prod.description}</p>
            <p><strong>Category:</strong> {prod.category}</p>
            <p><strong>Stock:</strong> {prod.stock}</p>

            <button
              onClick={() => startEditProduct(prod)}
              style={{
                marginTop: '10px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              ✏️ Edit
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
)}


      {/* 👥 Client List Section */}
{showClients && (
  <div style={{ marginTop: '30px' }}>
    <h3>Registered Clients</h3>
    {clients.length === 0 ? (
      <p>No client records found</p>
    ) : (
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Registered At</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id}>
              <td>{client.name || client.username}</td>
              <td>{client.email}</td>
              <td>{client.phone || 'N/A'}</td>
              <td>{client.address || 'N/A'}</td>
              <td>{new Date(client.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
)}


      {/* ✏️ Edit Product Section */}
      {isEditing && (
        <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '20px', maxWidth: '400px' }}>
          <h3>Editing: {editingProductName}</h3>
          <input name="name" placeholder="Product Name" value={product.name} onChange={handleChange} />
          <input name="price" placeholder="Price" value={product.price} onChange={handleChange} type="number" />
          <input name="description" placeholder="Description" value={product.description} onChange={handleChange} />
          <input name="category" placeholder="Category" value={product.category} onChange={handleChange} />
          <input name="imageUrl" placeholder="Image URL" value={product.imageUrl} onChange={handleChange} />
          <input name="stock" placeholder="Stock Quantity" value={product.stock} onChange={handleChange} type="number" />
          <button onClick={updateProduct} style={{ marginTop: '10px' }}>✅ Update Product</button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
