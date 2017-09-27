
const mongoose = require('mongoose');
const config = require('../../config');
const winston = require('winston');
const text = require('../../texts/texts');

/**
 * MongoDB Default Connection
 */

const connectMongo = () => {
    mongoose.connect(config.mongoConf.url, config.mongoConf.options);
};

connectMongo();

mongoose.connection.on('connected', () => {
    winston.log('info', text.mongoConnection);
});
mongoose.connection.on('error', err => {
    winston.log('error', err);
    setTimeout(connectMongo, 5000);
});

const queries = {

};

module.exports = queries;