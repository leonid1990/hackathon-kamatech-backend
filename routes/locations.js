var express = require('express');
var router = express.Router();
const Location = require('../models/Location');

router.get('/all', async function(req, res, next) {
  const locaitons = await Location.find();
  res.send(locaitons);
});

router.post('/add', async function(req, res, next) {
  const location = new Location({
    name: req.body.name,
  });
  const savedLocation = await location.save();
  res.send(savedLocation);
});

router.post('/report-verify', async function(req, res, next) {
  const location = await Location.findOne({_id: req.body.locationId});
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
