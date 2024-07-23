const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
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
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }   
}, { timestamps: true },{ collection: 'orders' });

module.exports = mongoose.model('Order', OrderSchema);
