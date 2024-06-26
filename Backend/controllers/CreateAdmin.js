const express = require('express');
const router = express.Router();

const jwt = require("jsonwebtoken");                                                                
const bcrypt = require("bcryptjs");           

const Admin = require('../models/Admin');
const Canteen = require("../models/Canteen");

const { handleValidationErrors, validationRules, authMiddleware } = require('../middlewares/Admin');

const jwtSecret = process.env.JWT_SECRET_ADMIN || 'default_one'; 
const jwtExpiration = '1h';


const generateToken = (user) => {
    const tokenPayload = { user: { type: 'Admin' , contact: user.contact, email: user.email, shopname: user.shopname } };
    return jwt.sign( tokenPayload, jwtSecret, { expiresIn: jwtExpiration });
};


// Signup for Admin
router.post("/auth/Admin" , async (req, res) => {

    try {

        const { email, password, code } = req.body;

        const existingShop = await Admin.findOne({ email });
        const shop_added = await Canteen.findOne({ code });

        if(!shop_added){
            return res.status(400).json({ success: false, message: "Don't Enter Some Random Code" });
        }

        if(email !== shop_added.email){
            return res.status(400).json({ success: false, message: "Verification of Code Failed" });
        }
        
        if (existingShop) {
            return res.status(400).json({ success: false, message: "This Account Aldready Exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = await Admin.create({
            name: shop_added.name,
            password: hashedPassword,
            email,
            contact: shop_added.contact,
            shopname: shop_added.shopname
        });

        const authToken = generateToken(newAdmin); 

        res.cookie('authToken', authToken, { httpOnly: true, secure: false });

        return res.json({ success: true });

    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Login for Admin
router.post("/auth/loginAdmin", async (req, res) => {

    let email = req.body.email;                                                                    

    try {
        let adminData = await Admin.findOne({ email });                                          

        if (!adminData) {
            return res.status(400).json({ errors: "Incorrect email or password" });                
        }

        const passwordCompare = await bcrypt.compare(req.body.password, adminData.password);        

        if (!passwordCompare) {
            return res.status(400).json({ errors: "Incorrect email or password" });                 
        }

        const authToken = generateToken(adminData); 

        res.cookie('authToken', authToken, { httpOnly: true, secure: false });

        return res.json({ success: true });                               

    } 
    catch (error) {
        console.log(error);
        res.json({ success: false, error: "Server Error" });                                                            
    }
});

// Logout for Admin
router.post('/auth/logout-Admin', (req, res) => {
    res.clearCookie('authToken', { httpOnly: true, secure: false });
    return res.json({ success: true, message: 'Logged out successfully' });
});


router.get('/protected-admin', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', admin: req.admin });
});

module.exports = router;    