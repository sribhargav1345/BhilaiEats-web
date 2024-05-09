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
    date: {
        type: Date,
        default: Date.now
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartSchema'
    }
});

module.exports = mongoose.model('UserSchema', UserSchema);