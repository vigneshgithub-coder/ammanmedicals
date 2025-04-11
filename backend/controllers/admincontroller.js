const User = require('../models/user'); // To view clients/users

const adminLogin = (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    res.status(200).json({ success: true, message: "Admin login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid admin credentials" });
  }
};

const getAllClients = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Hide password
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

module.exports = { adminLogin, getAllClients };
