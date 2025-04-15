import React, { useState } from "react";
import { useCart } from "../context/cartcontext";
import axios from "axios";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [phone, setPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const sendOTP = async () => {
    setError("");
    if (!email.includes("@")) return setError("Enter valid email address.");
    try {
      const res = await axios.post("https://ammanmedicals.onrender.com/api/send-otp", { email });
      if (res.data.success) {
        setOtpSent(true);
        setError("");
      } else {
        setError("Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      setError("Error sending OTP.");
    }
  };

  const verifyOTP = async () => {
    try {
      const res = await axios.post("https://ammanmedicals.onrender.com/api/verify-email-otp", { email, otp });
      if (res.data.success) {
        setVerified(true);
        setError("");
      } else {
        setError("Invalid OTP.");
      }
    } catch (err) {
      console.error(err);
      setError("Error verifying OTP.");
    }
  };

  const placeOrder = async () => {
    if (!address || !email || !phone) return setError("All fields are required.");
    if (!verified) return setError("Email not verified.");

    // Ensure cartItems are correctly structured before sending
    const itemsToSend = cartItems.map(item => ({
      productId: item._id, // Ensure you're sending the correct field here (maybe item._id or item.productId)
      quantity: item.quantity
    }));

    try {
      const res = await axios.post("https://ammanmedicals.onrender.com/api/orders/create", {
        items: itemsToSend,
        totalAmount: totalPrice,
        deliveryAddress: address,
        email,
        phone,
        altPhone
      });

      if (res.data.success) {
        setSuccess("Order placed successfully!");
        clearCart();
        setAddress("");
        setEmail("");
        setOtp("");
        setOtpSent(false);
        setVerified(false);
      } else {
        setError("Order failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Error placing order.");
    }
  };

  return (
    <section style={{ padding: "30px 20px", backgroundColor: "#eef6f6" }}>
      <h2>Your Cart 🛒</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} style={styles.itemRow}>
              <div><strong>{item.name}</strong></div>
              <div>
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)} disabled={item.quantity <= 1}>−</button>
                <span style={{ margin: "0 8px" }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)} disabled={item.quantity >= item.stock}>+</button>
              </div>
              <div>₹{item.price * item.quantity}</div>
              <button onClick={() => removeFromCart(item._id)} style={styles.removeBtn}>Remove</button>
            </div>
          ))}

          <div style={{ marginTop: "20px", fontWeight: "bold" }}>
            Total Items: {cartItems.length} <br />
            Total Price: ₹{totalPrice}
          </div>

          {/* Delivery Info */}
          <div style={{ marginTop: "30px" }}>
            <h3>Delivery Info</h3>
            <input type="text" placeholder="Delivery Address" value={address} onChange={(e) => setAddress(e.target.value)} style={styles.input} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
            <input type="number" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} style={styles.input} />
            <input type="number" placeholder="Alternate Phone Number" value={altPhone} onChange={(e) => setAltPhone(e.target.value)} style={styles.input} />

            {!otpSent && (
              <button onClick={sendOTP} style={styles.btn}>Send OTP</button>
            )}

            {otpSent && !verified && (
              <>
                <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} style={styles.input} />
                <button onClick={verifyOTP} style={styles.btn}>Verify OTP</button>
              </>
            )}

            {verified && <p style={{ color: "green" }}>✅ Email Verified</p>}
            {error && <p style={{ color: "crimson" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <button onClick={placeOrder} disabled={!verified} style={styles.placeBtn}>
              Place Order
            </button>
          </div>
        </>
      )}
    </section>
  );
};

const styles = {
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ddd",
    padding: "10px 0",
  },
  input: {
    display: "block",
    margin: "10px 0",
    padding: "8px",
    width: "100%",
    maxWidth: "400px",
  },
  btn: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    marginTop: "10px",
    cursor: "pointer",
  },
  removeBtn: {
    background: "crimson",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
  },
  placeBtn: {
    background: "green",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    marginTop: "20px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Cart;
