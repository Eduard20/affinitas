
/**
 * Module Dependencies
 */

const mongoRequests = require('../dbQueries/mongodb/queries');
const tokenFunction = require('./token');
const winston = require('winston');

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

    /**
     * Save Answers In MongoDB
     * @param {Object} req
     * @param {Function} next
     */

    saveAnswers: (req, next) => {
        const email = tokenFunction.decode(req.headers.authorization);
        const Data = {
            answers: req.body.data,
            email
        };
        mongoRequests.addAnswer(Data, (err, result) => {
            if (err) {
                winston.log('error', err);
                return next({ error: true });
            }
            return next(result);
        });
    },

    /**
     * Get Answers From MongoDB
     * @param {Object} req
     * @param {Function} next
     */

    getAnswers: (req, next) => {
        const email = tokenFunction.decode(req.headers.authorization);
        mongoRequests.getAnswers(email, (err, result) => {
            if (err) {
                winston.log('error', err);
                return next({ error: true });
            }
            return next({
                status: 'OK',
                result
            });
        });
    }

};

module.exports = user;