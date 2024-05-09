const express = require('express');
const router = express.Router();

const Canteen = require("../models/Canteen");
const { validationRules, handleValidationErrors } = require('../middlewares/Shops');

router.post("/shops", handleValidationErrors, validationRules, async(req,res) => {

    try{
        // Checking if shopname aldready exist
        const shop_name = await Canteen.findOne({ shopname: req.body.shopname });
        if(shop_name){
            return res.status(400).json({ error: "Shop exists with the same name" });
        }

        // Both codes will achieve the same thing
        // await Canteen.create({
        //     shopname: req.body.shopname,
        //     name: req.body.owner_name,
        //     email: req.body.owner_email,
        //     contact: req.body.owner_contact,
        //     image: req.body.image,
        //     description: req.body.description
        // });

        const newShop = new Canteen({
            shopname: req.body.shopname,
            name: req.body.owner_name,
            email: req.body.owner_email,
            contact: req.body.owner_contact,
            image: req.body.image,
            description: req.body.description
        });

        await newShop.save();

        return res.json({ success: true });
    }
    catch(err){
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
});

router.get("/Shopdata", async(req,res) => {
    try{
        const shopData = await Canteen.find();
        return res.json({ success: true, data: shopData });
    }
    catch(err){
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
})

module.exports = router;