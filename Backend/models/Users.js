const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    }
});

module.exports = mongoose.model('Users', UserSchema);