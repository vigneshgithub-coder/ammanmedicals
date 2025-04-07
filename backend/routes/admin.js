const express = require('express');
const router = express.Router();
const { adminLogin, getAllClients } = require('../controllers/admincontroller');

router.post('/login', adminLogin);
router.get('/clients', getAllClients);

module.exports = router;
