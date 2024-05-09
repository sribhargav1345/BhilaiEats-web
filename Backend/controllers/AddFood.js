const express = require('express');
const router = express.Router();

const Item = require("../models/Add_item");
const Category = require("../models/Add_itemCategory");

const { validationRules, handleValidationErrors } = require('../middlewares/Food');

router.post("/Addfood", validationRules, handleValidationErrors, async(req,res) =>{

    try{
        const existingItems = await Item.find({ name: req.body.name });
        const existingCategory = await Category.find({ categoryname: req.body.categoryname });

        if (existingItems.length > 0 && existingCategory.length > 0) {
            for (const item of existingItems) {
                if (item.categoryname === req.body.categoryname && item.shopname === req.body.shopname) {
                    return res.status(400).json({ success: false, error: "Food Item already Added" });
                }
            }
        }

        const newItem = new Item({
            shopname: req.body.shopname,
            categoryname: req.body.categoryname,
            name: req.body.name,
            image: req.body.image,
            options: req.body.options
        });

        await newItem.save();

        // If there is no such category
        if(existingCategory.length == 0){
            const newItemsCat = new Category({
                shopname: req.body.shopname,
                categoryname: req.body.categoryname
            });

            await newItemsCat.save();
        }
        else{
            // To check if category exists for the specific shop
            let categoryExists = false;
            for(const itemCat of existingCategory){
                if(itemCat.shopname === req.body.shopname){
                    categoryExists = true;
                    break;
                }
            }

            if(!categoryExists) {
                const newItemsCat = new Category({
                    shopname: req.body.shopname,
                    categoryname: req.body.categoryname,
                });
                await newItemsCat.save();
            }
        }
    }
    catch(err){
        res.status(500).json({ success: false,error: "Internal Server Error"});
    }

});

router.delete("/cards/:cardid", async(req,res) => {
    try{
        const { cardId } = req.params;

        const deletedItem = await Item.findOneAndDelete({ _id: cardId });
        if(!deletedItem){
            return res.status(404).json({ error: "Food Item Not Found" });
        }

        res.send("Deleted");
    }
    catch (error) {
        console.error('Error deleting foodItem:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;