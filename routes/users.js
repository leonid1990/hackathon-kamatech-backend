var express = require('express');
var router = express.Router();
const User = require('../models/User');

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

module.exports = router;
