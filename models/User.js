const mongoose = require('mongoose');
const path = require('path');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    id: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'user'
    },
    Date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema, 'Users');