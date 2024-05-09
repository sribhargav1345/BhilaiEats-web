const express = require('express');
const router = express.Router();

const Admin = require("../models/Admin");
const Items = require("../models/Add_item");
const Category = require("../models/Add_itemCategory");

router.get("/owner/:owner_id", async(req,res) => {
    try { 
        const { owner_id } = req.params;

        const owner = await Admin.findOne({ _id: owner_id });

        if (!owner) {
            return res.status(404).json({ error: "Owner not found "});
        }

        const f_item = await Items.find({ shopname: owner.shopname });
        const f_cat = await Category.find({ shopname: owner.shopname });

        res.send([f_item, f_cat]); // Corrected variable names here
    } catch(err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
