const mongoose = require('mongoose');
const path = require('path');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    id: {
        type: Number,
        require: true
    },
    verified: {
        type: Boolean,
        require: true,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema, 'Users');