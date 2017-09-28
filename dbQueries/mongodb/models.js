
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

const defaultSchema = new Schema({}, {
    versionKey: false,
    strict: false
});

/**
 * User Model
 */

const UsersModel = mongoose.model('users', usersSchema);
const CategoryModel = mongoose.model('categories', defaultSchema);
const QuestionModel = mongoose.model('questions', defaultSchema);

module.exports = {
    UsersModel,
    CategoryModel,
    QuestionModel
};
