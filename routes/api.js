const express = require('express');
const router = express.Router();
const userFunction = require('../modules/user');

router.get('/userInfo', (req, res, next) => {
    userFunction.getInfo(req, (err, result) => {
        if (err) return next(err);
        res.send(result);
    });
});

module.exports = router;
