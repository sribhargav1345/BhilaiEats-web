const jwt = require('jsonwebtoken');
const User = require("../models/UserSchema");

const { body, validationResult } = require("express-validator");

const jwtSecret = process.env.JWT_SECRET || 'default';

const authMiddleware = async(req,res,next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = await User.findOne({ contact: decoded.user.contact });   

        next();
    } 
    catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Invalid token' });
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
    body('contact', 'Contact number length should be of 10').isLength({ min:10, max:10 })
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