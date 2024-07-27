const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    orderId: {
        type: String,
        required: true
    },
    items: {
        type: Array
    },
    shop: {
        type: Object
    },
    user: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        contact:{
            type: String,
            required: true
        } 
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'sent'],
        default: 'pending'
    }   
}, { timestamps: true },{ collection: 'orders' });

module.exports = mongoose.model('Order', OrderSchema);
