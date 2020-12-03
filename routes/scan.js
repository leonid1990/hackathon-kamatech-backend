var express = require('express');
var router = express.Router();
const Location = require('../models/Location');

/* GET*/
router.post('/', async function(req, res, next) {
    const userId = req.body.user;
    const location = await Location.findOne({_id: req.body.locationId});
    const visit = {
        userId: userId,
        inDate: new Date()
    }
    location.visits.push(visit);
    location.save();
    res.send({userId, location});
});

module.exports = router;
