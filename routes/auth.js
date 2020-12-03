var express = require('express');
var router = express.Router();
const User = require('../models/User');

/* GET*/
router.post('/login', async function(req, res, next) {
    const user = await User.findOne({id: req.body.id});

    //checking if the user exist
    if(!user) {
        return res.status(400).send('Not Found');
    }

    res.send(user._id);
});

module.exports = router;

