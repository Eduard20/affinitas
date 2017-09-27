
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Users Schema
 */

const usersSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String },
    surname: { type: String }
}, {
    versionKey: false,
    strict: false
});

/**
 * User Model
 */

const UsersModel = mongoose.model('users', usersSchema);

module.exports = {
    UsersModel
};
