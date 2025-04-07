// app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authroutes');

const app = express();

// Middleware
app.use(cors());
app.use('/api/admin', require('./routes/admin'));

app.use(express.json()); // Important to parse JSON

// Routes
app.use('/api/auth', authRoutes);

module.exports = app;
