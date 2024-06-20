const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    order_data: {
        type: Array,
        required: true
    }
}, { collection: 'orders' });

module.exports = mongoose.model('Order', OrderSchema);
