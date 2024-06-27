const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemsSchema = new Schema({
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Canteen',
        required: true
    },
    shop:{
        type: String,
        required: true
    },
    categoryname:{
        type: String,
        required: true
    },
    veg:{
        type: Boolean,
    },
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    quantity: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    }
}, { collection: 'Items' });

module.exports = mongoose.model('Items',ItemsSchema)