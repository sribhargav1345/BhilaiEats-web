const mongoose = require('mongoose');
const { Schema } = mongoose;

const Add_ItemCatSchema = new Schema({
    shopname:{
        type: String,
        required: true
    },
    categoryname:{
        type: String,
        required: true
    }
}, { collection: 'add_itemcats' });

module.exports = mongoose.model('Add_itemCat',Add_ItemCatSchema)