const express = require('express');
const router = express.Router();

const Canteen = require('../models/Canteen');
const Items = require("../models/Items");
const Categories = require("../models/Categories");

const { authMiddleware } = require('../middlewares/Admin');

// Specifically for the admin purpose
router.get("/shops/:shopname", async(req,res) => {

    try{
        const { shopname } = req.params;

        console.log(shopname);

        const shop = await Canteen.findOne({ shopname });
        if(!shop){
            return res.status(400).json({ error: "Shop not found" });
        }

        const items = await Items.find({ shop: shopname });
        const categories = await Categories.find({ shop: shopname });

        return res.json({ success: true, shop, categories, items });
    }
    catch(err){
        console.error('Error fetching shop details:', err);
        res.status(500).json({ err: "Internal Server Error" });
    }
});

module.exports = router;