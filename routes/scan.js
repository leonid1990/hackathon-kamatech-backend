var express = require('express');
var router = express.Router();
const Location = require('../models/Location');
const User = require('../models/User');


/* GET*/
router.post('/', async function(req, res, next) {
    const userId = req.body.userId;
    const user = await User.findOne({_id: userId});
    if(user.currentVisit != null) {
        user.currentVisit.outDate = new Date();
        const location = await Location.findOne({_id: req.body.locationId});
        location.visits.push(user.currentVisit);
        location.save();
        user.currentVisit = null;
        user.save();
        return res.send("Out and saved");
    } else {
        user.currentVisit = {
            userId: userId,
            inDate: new Date()
        }
        user.save();
    }
    
    return res.send("In and saved");
});

module.exports = router;
