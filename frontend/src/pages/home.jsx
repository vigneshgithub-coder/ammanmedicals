import React from "react";
//import "./Home.css";

const Home = () => {
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

      <section className="contact-section" id="contact">
        <h2>Contact Us</h2>
        <p>Email: info@ammanmedicals.com</p>
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
