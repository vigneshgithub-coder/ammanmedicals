const bcrypt = require('bcryptjs');
const User = require('../models/user');
const user=require('../models/user');
const { error } = require('console');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
  const { name, email, password, address, phone } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      phone
    });

    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const login=async(req,res)=>{
  const{email,password}=req.body;

  try{
    const existinguser=await user.findOne({email});
    if(!existinguser)return res.status(404).json({message:"user not found"});

    const ispasswordcorrect =await bcrypt.compare(password,existinguser.password);
    if(!ispasswordcorrect) return res.status(400).json({message:"invalid credentials"});

    const token =jwt.sign({id:existinguser._id},process.env.JWT_SECRET||"secretkey",{
      expiresIn:"1d"
    });

    res.status(200).json({
      success:true,
      message:"login successful",
      token,
      user:{
        id:existinguser._id,
        name:existinguser.name,
        email:existinguser.email
      }
    });

  }catch(err){
    console.error("Login error:", err);
    res.status(500).json({message:"server error",error:err.message});


  }
};



module.exports = { register ,login};
