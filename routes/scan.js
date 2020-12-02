var express = require('express');
var router = express.Router();

/* GET*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET*/
router.get('/:roomid', function(req, res, next) {
    const roomid = req.params.roomid;
    res.render('index', { title: 'roomid' });
  });

module.exports = router;
