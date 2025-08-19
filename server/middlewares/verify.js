const jwt = require('jsonwebtoken');

const User = require('../models/user');

const verifyToken = async (req, res, next) => {
    const {token} = req.headers;
    if(!token){
        return res.status(400).json({error: "Unauthorized access"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(500).json({error: "Internal server error"});
    }
}