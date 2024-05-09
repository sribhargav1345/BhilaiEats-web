const express = require('express');
const router = express.Router();

const User = require("../models/UserSchema");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { validationRules, handleValidationErrors, authMiddleware } = require('../middlewares/User');

const jwtSecret = process.env.JWT_SECRET || 'default_one';
const jwtExpiration = '1h';


router.post("/register", validationRules, handleValidationErrors, async(req, res) => {

    try{
        const is_exist_email = await User.findOne({ email: req.body.email });
        const is_exist_number = await User.findOne({ email: req.body.contact });

        if(is_exist_email){
            return res.status(400).json({ success: false, error: "Email aldready registered, try login"});
        }

        if(is_exist_number){
            return res.status(400).json({ success: false, error: "Phone Number aldready registered, try login"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await User.create({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
            contact: req.body.contact
        });

        res.json({ success: true });
    }
    catch(err){
        res.status(500).json({ success: false, error: err.message });
    }
});

router.post("/login", async (req, res) => {

    const {email, password} = req.body;
    try{
        
        const Userdata = await User.findOne({ email });
        if(!Userdata){
            return res.status(400).json({ success: false, error: "Email not registered"});
        }

        const password_cmp = await bcrypt.compare(password, Userdata.password);
        if(!password_cmp){
            return res.status(400).json({ error: "Email and Password didn't match "});
        }

        const tokenPayload = { user: { id: Userdata.id, email: Userdata.email } };
        const authToken = jwt.sign(tokenPayload, jwtSecret, { expiresIn: jwtExpiration });

        return res.json({ success: true, authToken });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ success: false, err: "Internal Server Error"});
    }
});

router.get("/protected", authMiddleware, (req, res) => {
    res.json({ success: true, message: "You are authorized to access this route", user: req.user });
});

module.exports = router;