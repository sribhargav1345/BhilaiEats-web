const express = require('express');
const router = express.Router()
const Order = require('../models/Orders');

router.post("/orderData", async (req,res) => {

    try{
        let order = req.body.order_data;
        order.splice(0,0, { order_date: req.body.order_date });

        const cartItems = data.map(item => item.name);

        let user = await Order.findOne({ email: req.body.email });

        if(!user){
            let newOrder = new Order({
                email: req.body.email,
                order_data: [order]
            })

            await newOrder.save();
        }
        else{
            await Order.findOneAndUpdate(
            {
                email: req.body.email
            },
            {
                $push: { order_data: order }
            });
        }
        res.json({ success: true });
    }
    catch(err){
        res.status(500).json({ success: false, err: err.message});
    }
});

router.post('/myorderData', async (req, res) => {
    try {
        let myData = await Order.findOne({ email: req.body.email });
        res.json({ orderData: myData });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;