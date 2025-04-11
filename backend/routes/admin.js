const express = require('express');
const router = express.Router();const { addProduct, getAllProducts } = require('../controllers/productcontroller');


/// ✅ Better route name
//router.get('/all-products', getAllProducts);

// POST route to add product
router.post('/add-product', async (req, res) => {
    try {
      const { name, price, description } = req.body;
      // Save product logic here
      res.status(201).json({ success: true, message: 'Product added successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
  

module.exports = router;
