// routes/order.js
const express = require('express');
const { generateOTP } = require('../utils/otpgeneratoer');
const { sendOTPEmail } = require('../utils/mailer');
const { saveOTP, verifyOTP } = require('../utils/otpstore');
//const {Order} = require('../models/order');
console.log(require('../utils/otpstore'));

const Order = require('../models/order');
console.log('Order model:', Order);

console.log(require('../models/order'));

const router = express.Router();

// Step 1: Generate and Send OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  await sendOTPEmail(email, otp);
  saveOTP(email, otp);
  res.json({ success: true, message: 'OTP sent to email' });
});

// Step 3: Verify OTP only (optional route)
router.post('/verify-email-otp', (req, res) => {
    const { email, otp } = req.body;
  
    if (!verifyOTP(email, otp)) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }
  
    res.json({ success: true, message: 'OTP verified successfully' });
  });
  

// Step 2: Confirm OTP and Order
router.post('/create', async (req, res) => {
    const { items, totalAmount, deliveryAddress, email, phone, altPhone } = req.body;

    const newOrder = new Order(req.body); // <- This line is failing now
    await newOrder.save();
    console.log("Incoming order data:", req.body);

  
    if (!items || !totalAmount || !deliveryAddress || !email || !phone) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
  
    try {
      const newOrder = new Order({
        items,
        totalAmount,
        deliveryAddress,
        email,
        phone,
        altPhone,
        status: 'Confirmed',
        orderDate: new Date()
      });
  
      await newOrder.save();
      res.status(201).json({ success: true, message: "Order saved", orderId: newOrder._id });
    } catch (err) {
        console.error("Error placing order:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

module.exports = router;
