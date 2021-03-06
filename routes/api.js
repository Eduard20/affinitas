const express = require('express');
const router = express.Router();
const userFunction = require('../modules/user');
const questionFunction = require('../modules/questions');

router.get('/userInfo', (req, res, next) => {
    userFunction.getInfo(req, (err, result) => {
        if (err) return next(err);
        res.send(result);
    });
});

router.get('/questions', (req, res) => {
    questionFunction.getInfo(result => res.send(result));
});

router.put('/answers', (req, res) => {
    userFunction.saveAnswers(req, result => res.send(result));
});

router.get('/answers', (req, res) => {
    userFunction.getAnswers(req, result => res.send(result));
});

module.exports = router;
