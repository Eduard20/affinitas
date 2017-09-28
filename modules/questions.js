
const mongoRequests = require('../dbQueries/mongodb/queries');
const async = require('async');
const _ = require('lodash');

const questions = {

    /**
     * Get Categories and Questions From MongoDB
     * @param {Function} next
     */

    getInfo: next => {
        async.parallel([

            callback => {
                const type = 'question';
                mongoRequests.getAllData(type, (err, doc) => {
                    err ? callback(err) : callback(err, doc);
                });
            },

            callback => {
                const type = 'category';
                mongoRequests.getAllData(type, (err, doc) => {
                    err ? callback(err) : callback(err, doc);
                });
            }

        ], (err, result) => {
            if (err) {
                return next({
                    status: 'OK',
                    categories: [],
                    questions: []
                });
            }

            const resultArray = [];

            _.each(result[0], question => {
                const ques = question;
                _.find(result[1], category => {
                    if (ques.category.toString() === category._id.toString()) {
                       ques.category = category.title;
                       resultArray.push(ques);
                   }
                });
            });
            return next({
                status: 'OK',
                questions: resultArray,
            });
        });
    }

};

module.exports = questions;
