const User = require("../models/User");
const jwt = require('jsonwebtoken');

process.env.JWT_SECRET="myverysecuresecretkey";

const generateToken = (userId) => {
    return jwt.sign(
        {id:userId}, 
        process.env.JWT_SECRET,
        { expiresIn: '7d',}
    );
}

exports.register = async(req,res) => {
    const {name, email, password} = req.body;
    try{
        console.log("Received:", name, email, password);
        const existing = await User.findOne({email});
        if(existing) {
            console.log("User already exists");
            return res.status(400).json({msg:"User already exists"});
        }
        console.log("Creating new user");
        const user = await User.create({name, email, password});
        console.log("User created:", user);
        res.status(201).json({user, token: generateToken(user._id)});
    } 
    catch(err){
        console.log("In catch block");
        console.error("Registration Error:", err); // Add this line
        res.status(500).json({msg:"Registration failed", error: err.message});
    }
}


exports.login = async(req,res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user || !(await user.matchPassword(password)))
            return res.status(400).json({msg: "Invalid credentials"});
        res.json({user, token:generateToken(user._id)});
    }
    catch(err){
        res.status(500).json({msg:"Login failed", error: err.message});
    }
}

