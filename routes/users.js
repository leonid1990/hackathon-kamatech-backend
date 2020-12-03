var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Location = require('../models/Location');

/* GET users listing. */
router.get('/all', async function(req, res, next) {
  const users = await User.find();
  res.send(users);
});

router.post('/add', async function(req, res, next) {
  const user = new User({
    name: req.body.name,
    id: req.body.id,
  });
  const savedUser = await user.save();
  res.send(savedUser);
});

router.post('/report-verify', async function(req, res, next) {
  const user = await User.findOne({_id: req.body.userId});
  const verifyDate = new Date(req.body.date);

  console.log("date:" + verifyDate.toLocaleString());
  let sickDays = 14;
  let startedCorona = new Date(verifyDate.getDate() - sickDays);
  let redEvents = [];
  const locations = await Location.find();
  locations.forEach(location => {
    location.visits.forEach(visit => {
        let inDate = new Date(visit.inDate);
        let outDate = new Date(visit.outDate);
        if(inDate.getTime() <= startedCorona.getTime() && outDate.getTime() >= verifyDate.getTime() && visit.userId === user._id) {
          redEvents.push({location, inDate, outDate});
        }
    });
  });
  

  let redUsers = new Set();
  redEvents.forEach(event => {
    event.location.visits.forEach(visit => {
        let inDate = new Date(visit.inDate);
        let outDate = new Date(visit.outDate);
        if(inDate.getTime() <= event.inDate.getTime() && outDate.getTime() >= event.outDate.getTime() && !visit.userId === user._id) {
          redUsers.add(user._id);
        }
    });
  });


  res.send(redEvents);
});

module.exports = router;
