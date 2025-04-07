// server.js
const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();


app.use('/api/admin', require('./routes/admin'));


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server running on port', process.env.PORT);
    });
  })
  .catch(err => console.log(err));
