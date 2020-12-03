var express = require('express');
var router = express.Router();
const Location = require('../models/Location');
const User = require('../models/User');


/* GET*/
router.post('/', async function(req, res, next) {
    const userId = req.body.userId;
    const date = req.body.date;
    console.log(req.body.locationId);
    const user = await User.findOne({_id: userId});
    if(user.currentVisit != null) {
        user.currentVisit.outDate = date
        const location = await Location.findOne({_id: req.body.locationId});
        location.visits.push(user.currentVisit);
        location.save();
        user.currentVisit = null;
        user.save();
        return res.send("Out and saved");
    } else {
        user.currentVisit = {
            userId: userId,
            inDate: date
        }
        user.save();
    }
    
    return res.send("In and saved");
});

module.exports = router;
