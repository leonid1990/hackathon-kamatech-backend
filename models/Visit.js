const mongoose = require('mongoose');
const path = require('path');

const visitSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    inDate: {
        type: Date,
    },
    outDate: {
        type: Date,
    }
});

module.exports = visitSchema;