const express = require('express');
const router = express.Router();

const Canteen = require('../models/Canteen');
const Add_item = require("../models/Add_item");
const Add_itemCategory = require("../models/Add_itemCategory");

router.get("/shop/:shop_id", async(req,res) => {

    try{
        const { shop_id } = req.params;

        const finding_shop = await Canteen.findOne({ _id: shop_id });

        if(!finding_shop){
            return res.status(404).json({error: "Shop with that id not found "});
        }

        const categories = await Add_itemCategory.findOne({ shopname: finding_shop.shopname });
        const items = await Add_item.findOne({ shopname: finding_shop.shopname });

        res.send([items, categories]);
    }
    catch(err){
        res.status(500).json({ err: "Internal Server Error" });
    }
});

module.exports = router;