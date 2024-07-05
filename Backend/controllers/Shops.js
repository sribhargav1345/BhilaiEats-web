const express = require('express');
const router = express.Router();

const Canteen = require('../models/Canteen');
const Items = require("../models/Items");
const Categories = require("../models/Categories");

// Getting all shops by User 
router.get("/shops", async(req,res) => {
    try{
        const shopData = await Canteen.find();
        return res.json({ success: true, data: shopData });
    }
    catch(err){
        console.error('Error fetching shops:', err);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
});


// Getting specific shop Items present
router.get("/shop/:shop_id", async(req,res) => {

    try{
        const { shop_id } = req.params;

        const shop = await Canteen.findById(shop_id);
        if(!shop){
            return res.status(400).json({ error: "Shop not found" });
        }

        const items = await Items.find({ shopId: shop._id });
        const categories = await Categories.find({ shopId: shop._id });

        return res.json({ success: true, shop, categories, items });
    }
    catch(err){
        console.error('Error fetching shop details:', err);
        res.status(500).json({ err: "Internal Server Error" });
    }
});

module.exports = router;