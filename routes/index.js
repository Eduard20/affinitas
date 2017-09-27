
const express = require('express');
const router = express.Router();
const mongoRequests = require('../dbQueries/mongodb/queries');

router.get('', (req, res) => {
    res.send('good');
});

module.exports = router;
