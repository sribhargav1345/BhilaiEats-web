const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    items: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Items', 
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, { collection: 'Cart' });

module.exports = mongoose.model('Cart', CartSchema);
