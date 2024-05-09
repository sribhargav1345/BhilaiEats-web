const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true
    },
    shopname:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Admin',AdminSchema)