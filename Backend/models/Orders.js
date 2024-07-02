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
        name: String,
        email: String,
        contact: String,
    },
    status: String
}, { collection: 'orders' });

module.exports = mongoose.model('Order', OrderSchema);
