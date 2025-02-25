const express = require('express');
const router = express.Router();

const Item = require("../models/Items");
const Canteen = require("../models/Canteen");
const Category = require("../models/Categories");

const { handleValidationErrors } = require('../middlewares/Food');
const { authMiddleware } = require('../middlewares/Admin');

// Addition of Foods by shop owner
router.post("/add", handleValidationErrors, authMiddleware, async (req, res) => {

    try {
        const { shop, categoryname, name, image, price, quantity, veg } = req.body;

        const canteen = await Canteen.findOne({ shopname: shop });
        if (!canteen) {
            return res.status(404).json({ success: false, error: "Shop not found" });
        }

        const existingItem = await Item.findOne({ shopId: canteen._id, categoryname, name });
        if (existingItem) {
            return res.status(400).json({ success: false, error: "Food Item already present" });
        }

        const shopId = canteen._id;

        const existingCategory = await Category.findOne({ shopId, categoryname });
        if(!existingCategory) {
            const newCategory = new Category({
                shopId,
                shop,
                categoryname,
                image
            });

            await newCategory.save();
        }

        const newItem = new Item({
            shopId,
            shop,
            categoryname,
            name,
            image,
            price,
            quantity,
            veg
        });

        await newItem.save();

        return res.status(201).json({ success: true, data: newItem });
    } 
    catch (err) {
        console.error('Error adding food item:', err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

router.get("/categories", async(req,res) => {
    try{
        const categories = await Category.find();
        return res.status(200).json({success:true, data:categories});
    }
    catch{
        console.error('Error retrieving Categories:', err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// Adding this for Mindpage
router.get("/categories/:category_name", async(req,res) => {
    try{
        let { category_name } = req.params;

        const categories_needed = await Category.find({ categoryname: category_name });

        const shopNames = categories_needed.map(category => category.shop);

        const shops = await Canteen.find({ shopname: { $in: shopNames } });

        return res.status(200).json({ success: true, data: shops });
    }
    catch(error){
        console.error('Error retrieving Categories Searches:', error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// Edit Foods by Shop Owner 
router.put("/edit/:item_id", authMiddleware, async (req, res) => {
    try {
        const { item_id } = req.params;
        const { shop, categoryname, name, image, price, quantity, veg } = req.body;

        // Check if the item exists
        const existingItem = await Item.findById(item_id);
        if (!existingItem) {
            return res.status(404).json({ success: false, error: "Food Item Not Found" });
        }

        const canteen = await Canteen.findOne({ shopname: shop });
        if (!canteen) {
            return res.status(404).json({ success: false, error: "Shop not found" });
        }

        const shopId = canteen._id;

        const existingCategory = await Category.findOne({ shopId, categoryname });
        if (!existingCategory) {
            const newCategory = new Category({
                shopId,
                shop,
                categoryname,
                image
            });

            await newCategory.save();
        }

        existingItem.shopId = shopId;
        existingItem.shop = shop;
        existingItem.categoryname = categoryname;
        existingItem.name = name;
        existingItem.image = image;
        existingItem.price = price;
        existingItem.quantity = quantity;
        existingItem.veg = veg;

        await existingItem.save();

        res.json({ success: true, data: existingItem });
    } catch (error) {
        console.error('Error updating food item:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Deletion of Foods by Shop Owner
router.delete("/Item/:item_id", authMiddleware ,async (req, res) => {
    try {
        const { item_id } = req.params;

        const deletedItem = await Item.findByIdAndDelete(item_id);
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

module.exports = router;
