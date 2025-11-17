const jwt = require('jsonwebtoken');

const User = require('../models/user');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(400).json({error: "Unauthorized access"});
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(500).json({error: "Internal server error"});
    }
}

function getUserId(req, res){
    return res.status(200).json({success:true, userId: req.userId});
}

module.exports = {
    verifyToken,
    getUserId
}