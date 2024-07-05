const mongoose = require('mongoose');
const { Schema } = mongoose;

const SuperAdminSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {collection: 'SuperAdmin'});

module.exports = mongoose.model('SuperAdmin', SuperAdminSchema);