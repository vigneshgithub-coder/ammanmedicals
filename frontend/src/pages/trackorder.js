import React, { useState } from "react";
import axios from "axios";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);

  const handleTrack = async () => {
    try {
      const res = await axios.get(`https://your-backend-url.com/api/orders/${orderId}`);
      setOrder(res.data);
    } catch (err) {
      alert("Order not found!");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h3>Track Your Order</h3>
      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        style={{ padding: "10px", marginRight: "10px", width: "250px" }}
      />
      <button onClick={handleTrack} style={{ padding: "10px 20px", backgroundColor: "#009879", color: "#fff" }}>
        Track
      </button>

      {order && (
        <div style={{ marginTop: "30px", background: "#f1f1f1", padding: "20px", borderRadius: "10px" }}>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> ₹{order.totalPrice}</p>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
