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
  const location = await User.findOne({_id: req.body.userId});
  const verifyDate = new Date(req.body.date);
  console.log("date:" + verifyDate.toLocaleString());
  let redUsers = new Set();
  location.visits.forEach(visit => {
    console.log("visit in:" + visit.inDate.toLocaleString());
    console.log("visit out:" + visit.outDate.toLocaleString());
    let inDate = new Date(visit.inDate);
    let outDate = new Date(visit.outDate);
    if(inDate.getTime() <= verifyDate.getTime() && outDate.getTime() >= verifyDate.getTime()) {
      redUsers.add(visit.userId);
    }
  });
  res.send(Array.from(redUsers));
});

module.exports = router;
