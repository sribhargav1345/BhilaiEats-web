const jwt = require('jsonwebtoken');
const SuperAdmin = require("../models/SuperAdmin");

const { validationResult } = require("express-validator");

const jwtSecret = process.env.JWT_SECRET_ADMIN || 'default';

const authMiddleware = async(req,res,next) => {
    
    const token = req.header('Authorization').split(' ')[1];

    if (!token) {
        console.log("Token not present");
        return res.status(401).json({ error: 'Authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        if(!decoded || !decoded.type === "SuperAdmin"){
            console.log("Token Invalid");
            return res.status(401).json({ error: 'Authorization denied' });
        }
        
        const admin = await SuperAdmin.findOne({ email: decoded.user.email });

        if(!admin){
            console.log("SuperAdmin not found error", error);
            return res.status(404).json({ error: 'SuperAdmin not found, authorization denied' });
        }

        req.user = admin; 
        next();
    } 
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired, please log in again' });
        } 
        else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token, authorization denied' });
        } 
        else {
            console.error('Unexpected error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

const handleValidationErrors = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    handleValidationErrors,
    authMiddleware
};