const express = require('express');
const router = express.Router()                                                            
const Admin = require('../models/Admin');

const jwt = require("jsonwebtoken");                                                                
const bcrypt = require("bcryptjs");               

const { handleValidationErrors, validationRules } = require('../middlewares/Admin');

const jwtSecret = "HiNanna";                                                  

router.post("/CreateAdmin" , validationRules, handleValidationErrors, async (req, res) => {

    try {
        const existingShop = await Admin.findOne({ shopname: req.body.shopname });
        
        if (existingShop) {
            console.log("Shopname is already Registered");
            return res.status(400).json({ success: false, error: "Email Already Registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await Admin.create({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
            contact: req.body.contact,
            shopname: req.body.shopname,
        });

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

router.post("/loginAdmin", async (req, res) => {

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

        const data = { admin: {id: adminData.id} };

        const shopname = adminData.shopname;

        const authToken = jwt.sign(data, jwtSecret);                                                
        return res.json({ success: true, authToken: authToken, shopname: shopname });                                  

    } catch (error) {
        console.log(error);
        res.json({ success: false });                                                            
    }
});

module.exports = router;    