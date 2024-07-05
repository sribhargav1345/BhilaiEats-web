const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");                                                                
const bcrypt = require("bcryptjs");       

const { v4: uuidv4 } = require('uuid');

const SuperAdmin = require("../models/SuperAdmin");
const Canteen = require("../models/Canteen");

const { handleValidationErrors, authMiddleware } = require("../middlewares/SuperAdmin");

const jwtSecret = process.env.JWT_SECRET_ADMIN || 'default_one'; 
const jwtExpiration = '2h';

const generateToken = (user) => {
    const tokenPayload = { user: { type: 'SuperAdmin' , email: user.email, } };
    return jwt.sign( tokenPayload, jwtSecret, { expiresIn: jwtExpiration });
};

router.post("/CreateSuperAdmin", async(req,res) => {
    try{
        const {email, password} = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newSuperAdmin = new SuperAdmin({
            email,
            password: hashedPassword 
        });

        await newSuperAdmin.save();

        const authToken = generateToken(newSuperAdmin); 

        return res.status(200).json({ success: true, message: "SuperAdmin Created", authToken: authToken });
    }
    catch(err){
        console.log("Error creating SuperAdmin", err);
        return res.status(500).json({ message: "Internal Server Error", err});
    }
});

router.post("/auth/loginSuperAdmin", async(req,res) => {
    try{
        const {email, password} = req.body;

        const superAdmin = await SuperAdmin.findOne({ email });
        if(!superAdmin){
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, superAdmin.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Email and Password didn't match" });
        }

        const authToken = generateToken(superAdmin);
        return res.status(200).json({ success: true, message: "SuperAdmin Logged In" , authToken: authToken});
    }
    catch(err){
        console.log("Error logging in SuperAdmin", err);
        return res.status(500).json({ message: "Internal Server Error", err});
    }
})


function generateShortUuid() {
    return uuidv4().replace(/-/g, '').slice(0, 6); 
}

// Adding Canteens
router.post("/shops", handleValidationErrors, authMiddleware, async(req,res) => {

    try{
        const { shopname, name, email, contact, image, description } = req.body;

        const shop_name = await Canteen.findOne({ shopname });
        if(shop_name){
            return res.status(400).json({ error: "Shop exists with the same name" });
        }

        const code = generateShortUuid();

        const newShop = new Canteen({
            shopname,
            name,
            email,
            contact,
            image,
            description,
            code
        });

        await newShop.save();

        return res.json({ success: true, message: "Shop Added Successfully" });
    }
    catch(err){
        console.error('Error adding shop:', err);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
});


// Removing shops
router.delete("/removeshop/:shop_id", handleValidationErrors, authMiddleware, async(req,res) => {

    try{
        const { shop_id } = req.params;

        const shop_name = await Canteen.findById(shop_id);
        if(!shop_name){
            return res.status(400).json({ error: "Shop not found to Delete" });
        }

        await Canteen.findByIdAndDelete(shop_id);

        return res.json({ success: true, message: "Shop deleted successfully" });
    } catch (err) {
        console.error('Error deleting shop:', err);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
});

module.exports = router;
