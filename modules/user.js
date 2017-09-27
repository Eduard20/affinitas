
/**
 * Module Dependencies
 */

const mongoRequests = require('../dbQueries/mongodb/queries');

const user = {

    /**
     * Get User Info
     * @param {Object} req
     * @param {Function} next
     */

    getInfo: (req, next) => {
        const token = req.headers.authorization;
        mongoRequests.getUserInfo(token, (err, doc) => err ? next(err) : next(err, doc));
    },

};

module.exports = user;