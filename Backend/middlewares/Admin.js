const jwt = require('jsonwebtoken');
const Canteen = require("../models/Canteen");
const Admin = require("../models/Admin");

const { body, validationResult } = require("express-validator");

const jwtSecret = process.env.JWT_SECRET_ADMIN || 'default';

const authMiddleware = async(req,res,next) => {
    
    const token = req.header('Authorization').split(' ')[1];
    console.log(token);

    if (!token) {
        console.log("Token not present");
        return res.status(401).json({ error: 'Authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        const admin = await Canteen.findOne({ shopname: decoded.user.shopname, email: decoded.user.email });

        if(!admin){
            console.log("Admin not found error", error);
            return res.status(404).json({ error: 'Admin not found, authorization denied' });
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

const validationRules = [
    body('email' , 'Email format is not correct').isEmail().custom(value => {
        if(!value.endsWith('@gmail.com')){
            throw new Error('Email must be of @gmail.com format');
        }
        return true;
    }),
    body('name').isLength({ min: 4 }),
    body('password', 'Password must be of atleast 5 characters').isLength({ min: 5 }),
    body('contact', 'Contact must be of 10 digits').matches(/^\d+$/).isLength({ max:10 , min:10 })
] 

const handleValidationErrors = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validationRules,
    handleValidationErrors,
    authMiddleware
};