import React, { useEffect, useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import { useCart } from "../context/cartcontext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  const {
    cartItems,
    addToCart,
    removeFromCart,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();
=======
import { useCart } from "../context/cartcontext"; // 📦 Import Cart Context

const Home = () => {
  const [products, setProducts] = useState([]);
  const { cartItems, addToCart, removeFromCart, totalItems, totalPrice } = useCart(); // 🛒 Cart hooks
>>>>>>> 01fcc50a8a183c4e64b05a7fae0f383ef00042e4

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

<<<<<<< HEAD
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//code.tidio.co/YOUR-TIDIO-PUBLIC-ID.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const filteredProducts = products
    .filter((p) =>
      (filterCategory === "All" || p.category === filterCategory) &&
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((p) => !showInStockOnly || p.stock > 0)
    .sort((a, b) => {
      if (sortOrder === "low") return a.price - b.price;
      if (sortOrder === "high") return b.price - a.price;
      return 0;
    });

  const placeOrder = () => {
    alert("✅ Your order has been placed successfully!");
    clearCart();
  };

  const sectionStyle = {
    padding: "60px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: "#333" }}>
      {/* NAVBAR */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 40px", backgroundColor: "#009879", color: "#fff",
        position: "sticky", top: 0, zIndex: 999,
      }}>
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Amman Medicals</div>
        <ul style={{ display: "flex", gap: "30px", listStyle: "none", margin: 0 }}>
          {["Home", "About", "Services", "Contact"].map((text) => (
            <li key={text}>
              <a href={`#${text.toLowerCase()}`} style={{ color: "#fff", textDecoration: "none" }}>{text}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <header style={{
        background: "linear-gradient(to right, #56ab2f, #a8e063)",
        padding: "100px 20px", textAlign: "center", color: "#fff"
      }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>Welcome to Amman Medicals</h1>
        <p style={{ fontSize: "1.25rem" }}>Your trusted pharmacy partner in Coimbatore</p>
      </header>

      {/* ABOUT */}
      <section id="about" style={sectionStyle}>
        <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>About Us</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
          We offer top quality medicines and healthcare products at affordable prices. Our mission is to provide fast,
          reliable service to our community.
        </p>
      </section>

      {/* SERVICES */}
      <section id="services" style={sectionStyle}>
        <h2 style={{ fontSize: "2rem", marginBottom: "30px" }}>Our Services</h2>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { title: "Online Order", text: "Order medicines online and get them delivered to your doorstep." },
            { title: "24/7 Support", text: "We’re here for you anytime, any day of the week." },
            { title: "Genuine Products", text: "We provide only verified and quality-checked medical products." },
          ].map((s, i) => (
            <div key={i} style={{
              flex: "1 1 250px", background: "#fff", border: "1px solid #ddd",
              padding: "25px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ color: "#009879" }}>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section style={sectionStyle}>
        <h2 style={{ fontSize: "2rem", marginBottom: "30px" }}>Available Products</h2>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "30px" }}>
          <input type="text" placeholder="Search products..." value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "6px", flex: "1" }} />
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
            style={{ padding: "10px", borderRadius: "6px" }}>
            <option value="All">All Categories</option>
            {[...new Set(products.map((p) => p.category))].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}
            style={{ padding: "10px", borderRadius: "6px" }}>
            <option value="none">Sort by Price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
          <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input type="checkbox" checked={showInStockOnly}
              onChange={(e) => setShowInStockOnly(e.target.checked)} />
            In Stock Only
          </label>
        </div>

        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "25px" }}>
            {filteredProducts.map((prod) => (
              <div key={prod._id} style={{
                background: "#fff", padding: "20px", borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)", textAlign: "center"
              }}>
                {prod.imageUrl && (
                  <img src={prod.imageUrl} alt={prod.name}
                    style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "8px" }} />
                )}
                <h4 style={{ marginTop: "10px" }}>{prod.name}</h4>
                <p style={{ fontWeight: "bold", color: "#009879" }}>₹{prod.price}</p>
                <p style={{ fontSize: "0.9rem" }}>{prod.description}</p>
                <p><strong>Category:</strong> {prod.category}</p>
                <p><strong>Stock:</strong> {prod.stock}</p>
                <button onClick={() => addToCart(prod)} style={{
                  marginTop: "10px", background: "#009879", color: "#fff",
                  padding: "8px 15px", border: "none", borderRadius: "5px", cursor: "pointer"
                }}>
=======
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

      {/* ✅ PRODUCTS SECTION */}
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
>>>>>>> 01fcc50a8a183c4e64b05a7fae0f383ef00042e4
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

<<<<<<< HEAD
      {/* CART SECTION */}
      <section style={{ ...sectionStyle, background: "#f7fdfd", borderTop: "1px solid #ddd" }}>
=======
      {/* ✅ CART SECTION */}
      <section style={{ padding: "30px 20px", backgroundColor: "#eef6f6" }}>
>>>>>>> 01fcc50a8a183c4e64b05a7fae0f383ef00042e4
        <h2>Your Cart 🛒</h2>
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
<<<<<<< HEAD
          <>
            {cartItems.map((item) => (
              <div key={item._id} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px", borderBottom: "1px solid #ccc"
              }}>
                <div><strong>{item.name}</strong> x {item.quantity}</div>
                <div>₹{item.quantity * item.price}</div>
                <button onClick={() => removeFromCart(item._id)} style={{
                  background: "#d9534f", color: "#fff", border: "none", padding: "6px 12px",
                  borderRadius: "5px", cursor: "pointer"
                }}>
=======
          <div>
            {cartItems.map((item) => (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <div>
                  <strong>{item.name}</strong> x {item.quantity}
                </div>
                <div>₹{item.quantity * item.price}</div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  style={{
                    background: "crimson",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
>>>>>>> 01fcc50a8a183c4e64b05a7fae0f383ef00042e4
                  Remove
                </button>
              </div>
            ))}
<<<<<<< HEAD
            <div style={{
              marginTop: "20px", padding: "15px", backgroundColor: "#e0f8f5",
              border: "1px solid #b2dfdb", borderRadius: "10px", fontSize: "1.1rem",
              fontWeight: "bold", textAlign: "right"
            }}>
              <p>Total Items: <span style={{ fontWeight: "normal" }}>{totalItems}</span></p>
              <p>Total Price: <span style={{ fontWeight: "normal", color: "#009879" }}>₹{totalPrice}</span></p>
              <button onClick={placeOrder} style={{
                marginTop: "10px", background: "#28a745", color: "#fff",
                padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer"
              }}>
                Place Order
              </button>
            </div>
          </>
        )}
      </section>

      {/* CONTACT */}
      <section id="contact" style={sectionStyle}>
        <h2>Contact Us</h2>
        <p>Email: <a href="mailto:info@ammanmedicals.com">info@ammanmedicals.com</a></p>
=======
            <div style={{ marginTop: "20px", fontWeight: "bold" }}>
              Total Items: {totalItems} <br />
              Total Price: ₹{totalPrice}
            </div>
          </div>
        )}
      </section>

      <section className="contact-section" id="contact">
        <h2>Contact Us</h2>
        <p>Email: info@ammanmedicals.com</p>
>>>>>>> 01fcc50a8a183c4e64b05a7fae0f383ef00042e4
        <p>Phone: +91 98765 43210</p>
        <p>Address: Coimbatore, Tamil Nadu</p>
      </section>

<<<<<<< HEAD
      {/* FOOTER */}
      <footer style={{
        textAlign: "center", padding: "20px 0", backgroundColor: "#009879", color: "#fff"
      }}>
        &copy; 2025 Amman Medicals. All rights reserved.
=======
      <footer className="footer">
        <p>&copy; 2025 Amman Medicals. All rights reserved.</p>
>>>>>>> 01fcc50a8a183c4e64b05a7fae0f383ef00042e4
      </footer>
    </div>
  );
};

export default Home;
<<<<<<< HEAD












=======
>>>>>>> 01fcc50a8a183c4e64b05a7fae0f383ef00042e4
