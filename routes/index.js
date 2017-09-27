
const express = require('express');
const router = express.Router();
const mongoRequests = require('../dbQueries/mongodb/queries');
const texts = require('../texts/texts');

router.get('/favicon.ico', (req, res) => res.sendStatus(200));

router.post('/login', (req, res, next) => {
    if (req.body.email && req.body.password) {
        mongoRequests.login(req.body, (err, result) => {
            if (err) return next(err);
            res.send(result);
        });
        return;
    }
    return res.send({ error: true, message: texts.validationError });
});

router.post('/register', (req, res, next) => {
    if (req.body.email && req.body.password) {
        mongoRequests.register(req.body, (err, result) => {
            if (err) return next(err);
            res.send(result);
        });
        return;
    }
    return res.send({ error: true, message: texts.validationError });
});

router.get('/files/*', (req, res) => {
    return res.sendFile(req.params[0],
        { root: `${__dirname}/../public/` });
});

router.get('/', (req, res) => renderIndex(req, res));

router.get('*', (req, res) => renderIndex(req, res));

module.exports = router;

/**
 * Render Jade Template
 * @param {Object} req
 * @param {Object} res
 * @private
 */

function renderIndex(req, res) {

    if (req.headers.cookie && -1 < req.headers.cookie.indexOf('token')) {
        const token = decodeURIComponent(req.headers.cookie.split('token=')[1].split(' ')[0]);

        mongoRequests.checkToken(token, err => {

            if (!err) return res.render('./index.jade', { title: 'affinitas' });

            return res.render('./login.jade', { title: 'affinitas' });

        });
        return;

    }

    return res.render('./login.jade', { title: 'affinitas' });

}
