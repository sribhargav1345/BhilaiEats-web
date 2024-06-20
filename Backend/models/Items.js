const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemsSchema = new Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Canteen',
        required: true
    },
    categoryname:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    options:{
        type: Array,
        required: true
    }
}, { collection: 'Items' });

module.exports = mongoose.model('Items',ItemsSchema)