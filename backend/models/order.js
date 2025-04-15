// backend/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
    }
  ],
  totalAmount: { type: Number, required: true },
  deliveryAddress: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: Number, required: false},
  altPhoneNumber: { type: Number,required:false },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
