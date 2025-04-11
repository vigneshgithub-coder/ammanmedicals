const Product = require('../models/product');

const addProduct = async (req, res) => {
  try {
    const { name, price, description, imageUrl, category, stock } = req.body;

    // Log user-entered details to console
    console.log('➡️ User Entered Product:', { name, price, description, imageUrl, category, stock });

    const product = new Product({ name, price, description, imageUrl, category, stock });
    await product.save();

    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    console.error('❌ Error adding product:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

const updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
