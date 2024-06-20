const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
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
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true
    }
}, {collection: 'Admin'});

module.exports = mongoose.model('Admin', AdminSchema);