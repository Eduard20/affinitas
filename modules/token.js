
/**
 * Module Dependencies
 */

const jwt = require('jsonwebtoken');
const config = require('../config');

const token = {

    /**
     * Generate A JWT
     * @param {Object} data
     */

    generate: data => jwt.sign({ email: data.email }, config.jwtSecret),


};

module.exports = token;
