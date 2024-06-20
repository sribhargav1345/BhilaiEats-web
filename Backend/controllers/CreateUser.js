const express = require('express');
const router = express.Router();

const User = require("../models/Users");
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
const { validationRules, handleValidationErrors, authMiddleware } = require('../middlewares/User');

const jwtSecret = process.env.JWT_SECRET_USER || 'default_one';
const jwtExpiration = '1h';

const generateToken = (user) => {
    const tokenPayload = { user: { type: 'User', contact: user.contact, email: user.email } };
    return jwt.sign(tokenPayload, jwtSecret, { expiresIn: jwtExpiration });
};


// Signup for User
router.post("/auth/register", validationRules, handleValidationErrors, async(req, res) => {
    try {

        const is_exist_email = await User.findOne({ email: req.body.email });
        const is_exist_number = await User.findOne({ contact: req.body.contact }); 

        if (is_exist_email) {
            return res.status(400).json({ success: false, error: "Email already registered, try login" });
        }

        if (is_exist_number) {
            return res.status(400).json({ success: false, error: "Phone Number already registered, try login" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await User.create({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
            contact: req.body.contact
        });

        const authToken = generateToken(newUser);

        res.cookie('authToken', authToken, { httpOnly: true, secure: false });

        return res.json({ success: true });
    } 
    catch (err) {
        console.error('Error during registration:', err); 
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});


// Login for User
router.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const Userdata = await User.findOne({ email });
        if (!Userdata) {
            return res.status(400).json({ success: false, error: "Email not registered" });
        }

        const password_cmp = await bcrypt.compare(password, Userdata.password);
        if (!password_cmp) {
            return res.status(400).json({ error: "Email and Password didn't match" });
        }

        const authToken = generateToken(Userdata);

        res.cookie('authToken', authToken, { httpOnly: true, secure: false });

        return res.json({ success: true });
    } 
    catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// Protected Route
router.get('/protected-user', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
