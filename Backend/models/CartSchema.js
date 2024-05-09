const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    items: [{
        type: String
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserSchema'
    }
});

module.exports = mongoose.model('CartSchema', CartSchema);