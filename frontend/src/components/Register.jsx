import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      if (res.data.success) {
        alert('Registration successful!');
        navigate('/');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Register</h2>

        <input name="name" placeholder="Name" onChange={handleChange} required style={styles.input} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required style={styles.input} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required style={styles.input} />
        <input name="address" placeholder="Address" onChange={handleChange} required style={styles.input} />
        <input name="phone" placeholder="Phone" onChange={handleChange} required style={styles.input} />

        <button type="submit" style={styles.button}>Register</button>

        <p style={styles.text}>
          Already registered?{' '}
          <span style={styles.link} onClick={() => navigate('/login')}>
            Please Login
          </span>
        </p>

        <button style={styles.adminButton} onClick={() => navigate('/admin-login')}>
          Admin Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f4f4f4',
    padding: '20px',
  },
  form: {
    background: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    boxSizing: 'border-box',
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '8px 0',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  text: {
    marginTop: '15px',
    textAlign: 'center',
    fontSize: '14px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  adminButton: {
    marginTop: '15px',
    width: '100%',
    padding: '10px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    cursor: 'pointer',
  },
};

export default Register;
