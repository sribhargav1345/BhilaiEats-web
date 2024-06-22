const mongoose = require('mongoose');
const { Schema } = mongoose;

const CanteenSchema = new Schema({
    shopname: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {collection: 'Canteen'});

module.exports = mongoose.model('Canteen', CanteenSchema);