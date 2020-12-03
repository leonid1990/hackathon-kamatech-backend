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

module.exports = router;
