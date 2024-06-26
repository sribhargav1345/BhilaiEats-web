const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema ({
    categoryname: {
        type: String,
        required: true
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Canteen",
        required: true
    },
    shop: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Category", CategorySchema);