import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/cartcontext";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, cartItems } = useCart(); // ✅ cartItems added here
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://ammanmedicals.onrender.com/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-wrapper">
      <nav className="navbar">
        <div className="logo">Amman Medicals</div>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        {/* ✅ Cart Icon with Notification Badge */}
        <div
          className="cart-icon"
          onClick={() => navigate("/cart")}
          style={{
            cursor: "pointer",
            fontSize: "24px",
            marginLeft: "20px",
            color: "#fff",
            position: "relative",
          }}
        >
          <FaShoppingCart />

          {/* 🔴 Notification Count */}
          {cartItems.length > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-10px",
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {cartItems.length}
            </span>
          )}
        </div>
      </nav>

      <header className="hero-section">
        <div className="hero-text">
          <h1>Welcome to Amman Medicals</h1>
          <p>Your trusted pharmacy partner in Coimbatore</p>
        </div>
      </header>

      <section className="about-section" id="about">
        <h2>About Us</h2>
        <p>We offer top quality medicines and healthcare products at affordable prices. Our mission is to provide fast, reliable service to our community.</p>
      </section>

      <section className="services-section" id="services">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Online Order</h3>
            <p>Order medicines online and get them delivered to your doorstep.</p>
          </div>
          <div className="service-card">
            <h3>24/7 Support</h3>
            <p>We’re here for you anytime, any day of the week.</p>
          </div>
          <div className="service-card">
            <h3>Genuine Products</h3>
            <p>We provide only verified and quality-checked medical products.</p>
          </div>
        </div>
      </section>

      <section className="products-section" style={{ padding: '40px 20px' }}>
        <h2>Available Products</h2>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {products.map((prod) => (
              <div
                key={prod._id}
                style={{
                  border: '1px solid #ccc',
                  padding: '15px',
                  width: '200px',
                  borderRadius: '8px',
                  background: '#f9f9f9',
                }}
              >
                {prod.imageUrl && (
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '5px',
                    }}
                  />
                )}
                <h4>{prod.name}</h4>
                <p><strong>₹{prod.price}</strong></p>
                <p>{prod.description}</p>
                <p><strong>Category:</strong> {prod.category}</p>
                <p><strong>Stock:</strong> {prod.stock}</p>
                <button
                  onClick={() => addToCart(prod)}
                  style={{
                    marginTop: '10px',
                    padding: '5px 10px',
                    background: '#009879',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="contact-section" id="contact">
        <h2>Contact Us</h2>
        <p>Email: ammanmedicalscbe@gmail.com</p>
        <p>Phone: +91 98765 43210</p>
        <p>Address: Coimbatore, Tamil Nadu</p>
      </section>

      <footer className="footer">
        <p>&copy; 2025 Amman Medicals. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
