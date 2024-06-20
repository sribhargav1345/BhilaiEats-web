const express = require('express');
const router = express.Router();

const Item = require("../models/Items");
const Canteen = require("../models/Canteen");

const { validationRules, handleValidationErrors } = require('../middlewares/Food');
const { authMiddleware } = require('../middlewares/Admin');

// Addition of Foods by shop owner
router.post("/add", validationRules, handleValidationErrors, authMiddleware, async (req, res) => {

    try {
        const { shop, categoryname, name, image, options } = req.body;

        const existingItem = await Item.findOne({ shop, categoryname, name });
        if (existingItem) {
            return res.status(400).json({ success: false, error: "Food Item already present" });
        }

        const newItem = new Item({
            shop,
            categoryname,
            name,
            image,
            options
        });

        await newItem.save();

        return res.status(201).json({ success: true, data: newItem });
    } 
    catch (err) {
        console.error('Error adding food item:', err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// Deletion of Foods by Shop Owner
router.delete("/cards/:cardid", authMiddleware, async (req, res) => {
    try {
        const { cardid } = req.params;

        const deletedItem = await Item.findOneAndDelete({ _id: cardid });
        if (!deletedItem) {
            return res.status(404).json({ error: "Food Item Not Found" });
        }

        res.json({ success: true, data: deletedItem });
    } 
    catch (error) {
        console.error('Error deleting food item:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Getting Foods of specific shop, I think this is present in Shops.js
// router.get("/owner/:owner_id", authMiddleware, async(req,res) => {
//     try { 
//         const { owner_id } = req.params;
//         const owner = await Canteen.findById(owner_id);

//         if (!owner) {
//             return res.status(404).json({ error: "Owner not found"});
//         }

//         const items = await Item.find({ shop: owner.shopname });
//         return res.json({ success: true, owner, items });
//     } 
//     catch(err) {
//         console.error('Error fetching items by owner:', err);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

module.exports = router;
