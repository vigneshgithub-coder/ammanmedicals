// server.js
const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/product');
 const userroutes =require('./routes/userroutes');
const orderRoutes = require('./routes/orderRoutes')


app.use('/api/admin', require('./routes/admin'));
app.use('/api/products', require('./routes/productroutes'));
app.use('/api/users', userroutes);
app.use('/api/orders',orderRoutes)
app.use("/api", orderRoutes); 


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server running on port', process.env.PORT);
    });
  })
  .catch(err => console.log(err));
