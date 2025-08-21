const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

const signup = async (req,res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({success:false, message: "All fields are required"});
    }
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({success:false, message: "User already exists"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const newUser = new User({
        name,
        email,
        password: hashed,
    })
    await newUser.save();
    const token = jwt.sign({id: newUser._id, name: newUser.name}, process.env.JWT_SECRET)
    return res.status(200).json({success:true, token:token, user: newUser.name});
}

const login = async (req,res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({success:false, message: "All fields are required"});
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({success:false, message: "User not found"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({success:false, message: "Invalid credentials"});
    }
    const token = jwt.sign({id: user._id, name: user.name}, process.env.JWT_SECRET)
    return res.status(200).json({success:true,token:token, user: user.name});
}

module.exports = {
    signup,
    login
}