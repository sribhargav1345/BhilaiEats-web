const express = require('express');
const router = express.Router();

const jwt = require("jsonwebtoken");                                                                
const bcrypt = require("bcryptjs");           

const Admin = require('../models/Admin');
const Canteen = require("../models/Canteen");

const { handleValidationErrors, validationRules, authMiddleware } = require('../middlewares/Admin');

const jwtSecret = process.env.JWT_SECRET_ADMIN || 'default_one'; 
const jwtExpiration = '1h';


const generateToken = (admin) => {
    const tokenPayload = { admin: { type: 'Admin' , contact: admin.contact, email: admin.email, shopname: admin.shopname } };
    return jwt.sign( tokenPayload, jwtSecret, { expiresIn: jwtExpiration });
};


// Signup for Admin
router.post("/auth/Admin" , validationRules, handleValidationErrors, async (req, res) => {

    try {

        const { name, email, password, contact, shopname } = req.body;

        const existingShop = await Admin.findOne({ shopname });
        const shop_added = await Canteen.findOne({ shopname });

        if(!shop_added){
            return res.status(400).json({ success: false, error: "Shop Not Added by SuperAdmin" });
        }

        if(email !== shop_added.email){
            return res.status(400).json({ success: false, error: "Admin not Created by SuperAdmin" });
        }
        
        if (existingShop) {
            return res.status(400).json({ success: false, error: "Shopname Already Registered" });
        }

        const existingEmail = await Admin.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ success: false, error: "Email Already Registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = await Admin.create({
            name,
            password: hashedPassword,
            email,
            contact,
            shopname
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