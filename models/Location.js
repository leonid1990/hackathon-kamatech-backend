const mongoose = require('mongoose');
const path = require('path');
const visitSchema = require('./Visit');

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    visits: {
        type: [visitSchema]
    }
});

module.exports = mongoose.model('Location', locationSchema, 'Locations');