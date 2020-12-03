const mongoose = require('mongoose');
const path = require('path');
const visitSchema = require('./Visit');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    id: {
        type: Number,
        require: true
    },
    currentVisit: {
        type: visitSchema,
        default: null
    },
    verified: {
        type: Boolean,
        require: true,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema, 'Users');