const express = require('express');
const router = express.Router();

const Order = require('../models/Orders');

const generateUniqueOrderId = async () => {
    let orderId;
    let isUnique = false;

    while (!isUnique) {
        orderId = Math.floor(1000000 + Math.random() * 9000000).toString();
        
        const existingOrder = await Order.findOne({ orderId: orderId });
        
        if (!existingOrder) {
            isUnique = true;
        }
    }

    return orderId;
};

router.post("/orders", async (req, res) => {
    try {
        const { items, shop, user, status, price } = req.body;
        
        if (!user || !user.name || !user.email || !user.contact) {
            return res.status(400).json({ success: false, message: "User information is incomplete." });
        }

        const orderId = await generateUniqueOrderId();

        const order = new Order({
            ...req.body,
            orderId: orderId
        });

        await order.save();

        return res.status(200).json({ success: true, message: "Order Created" });
    } catch (error) {
        console.log("Internal server error", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


// User getting order status for their recent order
router.get("/orders/status/:order_contact", async (req, res) => {
    try {
        const { order_contact } = req.params; 

        const order = await Order.find({ 'user.contact': order_contact }).sort({ createdAt: -1 }).limit(1);
        if (!order || order.length === 0) {
            return res.status(404).json({ success: false, message: "No recent orders found" });
        }

        return res.status(200).json({ success: true, order: order[0] });
    } catch (error) {
        console.error("Error fetching Order Status for User", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


// Getting pending orders for shop
router.get("/orders/shop/:shop_id", async(req,res) => {
    try{
        const { shop_id } = req.params;                 // Getting shop-owners contact here

        const orders = await Order.find({ 'shop.contact': shop_id , status: 'pending' });
        res.status(200).json({ success: true, orders: orders });
    } 
    catch(error){
        console.log("Error fetching Orders for shop", error);
        return res.status(500).json({ message: "Internal Server Error",error });
    }
});

// Getting Accepted orders for shop
router.get("/orders/shop-accepted/:shop_id", async(req,res) => {
    try{
        const { shop_id } = req.params;                 // Getting shop-owners contact here

        const orders = await Order.find({ 'shop.contact': shop_id , status: 'accepted' });
        res.status(200).json({ success: true, orders: orders });
    } 
    catch(error){
        console.log("Error fetching Orders for shop", error);
        return res.status(500).json({ message: "Internal Server Error",error });
    }
});

// Putting the reply of Owner in the order of User
router.put("/orders/:order_id", async (req, res) => {
    try {
        
        const { order_id } = req.params;
    
        const { status, items, shop,  user, price } = req.body;
        console.log(status);

        const order = await Order.findOne({ orderId: order_id });

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Update the order
        order.status = status;
        order.items = items;
        order.user = user;
        order.price = price;
        order.shop = shop;

        await order.save();

        res.status(200).json({ success: true, message: 'Order updated successfully', order });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;