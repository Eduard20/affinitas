
/**
 * Module Dependencies
 */

const config = require('./config');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const winston = require('winston');

// set Node Running Mode
process.env.NODE_ENV = config.mode;

const index = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

/**
 * Error Handlers
 * Development Error Handler
 */

if ('development' === process.env.NODE_ENV) {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({ message: err.message, error: err });
    });
}

/**
 * Production Error Handler
 */

app.use((err, req, res, next) => {
    if (404 !== err.status) winston.log('error', err);
    res.status(err.status || 500);
    res.json({ message: err.message, error: {} });
});

/**
 * Application Listening On PORT
 */

app.listen(config.port, config.hostname, winston.log('info', `Node.js server is running at http://${config.hostname}:${config.port} 
    in ${process.env.NODE_ENV} mode with process id ${process.pid}`)
);

/**
 * Checking Uncaught Exceptions
 */

process.on('uncaughtException', err => {
    winston.log('error', (new Date()).toUTCString() + ' uncaughtException:', err.message);
    winston.log('info', err.stack);
    process.exit(1);
});


// const j = {
//     "categories": [
//         "59cbd1af734d1d341d3ce744",
//         "59cbd1e9734d1d341d3ce77c",
//         "59cbd1fd734d1d341d3ce788",
//         "59cbd216734d1d341d3ce79e"
//     ],
//     "questions": [
//         {
//             "question": "What is your gender?",
//             "category": "59cbd1af734d1d341d3ce744",
//             "question_type": {
//                 "type": "single_choice",
//                 "options": [
//                     "male",
//                     "female",
//                     "other"
//                 ]
//             }
//         },
//         {
//             "question": "How important is the gender of your partner?",
//             "category": "59cbd1af734d1d341d3ce744",
//             "question_type": {
//                 "type": "single_choice",
//                 "options": [
//                     "not important",
//                     "important",
//                     "very important"
//                 ]
//             }
//         },
//         {
//             "question": "How important is the age of your partner to you?",
//             "category": "59cbd1af734d1d341d3ce744",
//             "question_type": {
//                 "type": "single_choice_conditional",
//                 "options": [
//                     "not important",
//                     "important",
//                     "very important"
//                 ],
//                 "condition": {
//                     "predicate": {
//                         "exactEquals": [
//                             "${selection}",
//                             "very important"
//                         ]
//                     },
//                     "if_positive": {
//                         "question": "What age should your potential partner be?",
//                         "category": "59cbd1af734d1d341d3ce744",
//                         "question_type": {
//                             "type": "number_range",
//                             "range": {
//                                 "from": 18,
//                                 "to": 140
//                             }
//                         }
//                     }
//                 }
//             }
//         },
//         {
//             "question": "Do any children under the age of 18 live with you?",
//             "category": "59cbd1af734d1d341d3ce744",
//             "question_type": {
//                 "type": "single_choice",
//                 "options": [
//                     "yes",
//                     "sometimes",
//                     "no"
//                 ]
//             }
//         },
//         {
//             "question": "How should your potential partner respond to this question?",
//             "category": "59cbd1e9734d1d341d3ce77c",
//             "question_type": {
//                 "type": "single_choice",
//                 "options": [
//                     "yes",
//                     "sometimes",
//                     "no"
//                 ]
//             }
//         },
//         {
//             "question": "Could you imagine having children with your potential partner?",
//             "category": "59cbd1e9734d1d341d3ce77c",
//             "question_type": {
//                 "type": "single_choice",
//                 "options": [
//                     "yes",
//                     "maybe",
//                     "no"
//                 ]
//             }
//         },
//         {
//             "question": "How should your potential partner respond to this question?",
//             "category": "59cbd1e9734d1d341d3ce77c",
//             "question_type": {
//                 "type": "single_choice",
//                 "options": [
//                     "yes",
//                     "maybe",
//                     "no"
//                 ]
//             }
//         },
//         {
//             "question": "What is your marital status?",
//             "category": "59cbd1af734d1d341d3ce744",
//             "question_type": {
//                 "type": "single_choice",
//                 "options": [
//                     "never married",
//                     "separated",
//                     "divorced",
//                     "widowed"
//                 ]
//             }
//         },
//         {
//             "question": "How often do your drink alcohol?",
//             "category": "59cbd1e9734d1d341d3ce77c",
//             "question_type": {
//                 "type": "single_choice",
//                 "options": [
//                     "never",
//                     "once or twice a year",
//                     "once or twice a month",
//                     "once or twice a week",
//                     "I'm drinking my 3rd mojito now, and it's only 11am"
//                 ]
//             }
//         },
//         {
//             "question": "How often do you smoke?",
//             "category": "59cbd1e9734d1d341d3ce77c",
//             "question_type": {
//                 "type": "single_choice",
//                 "options": [
//                     "never",
//                     "once or twice a year",
//                     "socially",
//                     "frequently"
//                 ]
//             }
//         },
//         {
//             "question": "What is your attitude towards drugs?",
//             "category": "59cbd1e9734d1d341d3ce77c",
//             "question_type": {
//                 "type": "single_choice",
//                 "options": [
//                     "I'm completely opposed",
//                     "I've been know to dabble",
//                     "drugs enrich my life"
//                 ]
//             }
//         },
//         {
//             "question": "You are looking for...",
//             "category": "59cbd1e9734d1d341d3ce77c",
//             "question_type": {
//                 "type": "single_choice",
//                 "options": [
//                     "friendship",
//                     "a hot date",
//                     "an affair",
//                     "a short-term relationship",
//                     "a long-term relationship"
//                 ]
//             }
//         },
//         {
//             "question": "Would you like to get married?",
//             "category": "59cbd1e9734d1d341d3ce77c",
//             "question_type": {
//                 "type": "single_choice",
//                 "options": [
//                     "yes",
//                     "probably",
//                     "eventually",
//                     "no"
//                 ]
//             }
//         },
//         {
//             "question": "What is your ideal living arrangement?",
//             "category": "59cbd1e9734d1d341d3ce77c",
//             "question_type": {
//                 "type": "single_choice",
//                 "options": [
//                     "cohabitation",
//                     "separate flat / room in the same building",
//                     "separate flats in the same area",
//                     "weekend-relationship",
//                     "long distance relationship"
//                 ]
//             }
//         },
//         {
//             "question": "Do you enjoy spending time alone?",
//             "category": "59cbd1fd734d1d341d3ce788",
//             "question_type": {
//                 "type": "single_choice",
//                 "options": [
//                     "most of the time",
//                     "often",
//                     "sometimes",
//                     "rarely",
//                     "not at all"
//                 ]
//             }
//         },
//         {
//             "question": "When you're alone, do you get lonely quickly?",
//             "category": "59cbd1fd734d1d341d3ce788",
//             "question_type": {
//                 "type": "single_choice",
//                 "options": [
//                     "most of the time",
//                     "often",
//                     "sometimes",
//                     "rarely",
//                     "not at all"
//                 ]
//             }
//         },
//         {
//             "question": "Do you enjoy going on holiday by yourself?",
//             "category": "59cbd1fd734d1d341d3ce788",
//             "question_type": {
//                 "type": "single_choice",
//                 "options": [
//                     "most of the time",
//                     "often",
//                     "sometimes",
//                     "rarely",
//                     "not at all"
//                 ]
//             }
//         },
//         {
//             "question": "I consciously take \"me time\"",
//             "category": "59cbd1fd734d1d341d3ce788",
//             "question_type": {
//                 "type": "single_choice",
//                 "options": [
//                     "most of the time",
//                     "often",
//                     "sometimes",
//                     "rarely",
//                     "not at all"
//                 ]
//             }
//         },
//         {
//             "question": "Should one keep little secrets from one's partner?",
//             "category": "59cbd1fd734d1d341d3ce788",
//             "question_type": {
//                 "type": "single_choice",
//                 "options": [
//                     "most of the time",
//                     "often",
//                     "sometimes",
//                     "rarely",
//                     "not at all"
//                 ]
//             }
//         },
//         {
//             "question": "How often do you think about sex?",
//             "category": "59cbd216734d1d341d3ce79e",
//             "question_type": {
//                 "type": "single_choice",
//                 "options": [
//                     "a few times a day",
//                     "daily",
//                     "a few times a week",
//                     "a few times a month",
//                     "rarely"
//                 ]
//             }
//         },
//         {
//             "question": "If you were alone on a desert island, how long would you last before pleasuring yourself?",
//             "category": "59cbd216734d1d341d3ce79e",
//             "question_type": {
//                 "type": "single_choice",
//                 "options": [
//                     "less than a day",
//                     "one day",
//                     "one week",
//                     "one month",
//                     "I'd never do something like that"
//                 ]
//             }
//         },
//         {
//             "question": "How often would you like to have sex with your prospective partner?",
//             "category": "59cbd216734d1d341d3ce79e",
//             "question_type": {
//                 "type": "single_choice",
//                 "options": [
//                     "every day",
//                     "a few times a week",
//                     "once a week",
//                     "every two weeks",
//                     "infrequently",
//                     "rarely"
//                 ]
//             }
//         },
//         {
//             "question": "Do you like trying out new things in bed and experimenting?",
//             "category": "59cbd216734d1d341d3ce79e",
//             "question_type": {
//                 "type": "single_choice",
//                 "options": [
//                     "Yes, definitely!",
//                     "Now and then - why not?",
//                     "I'd give it a try",
//                     "I don't know",
//                     "Absolutely not"
//                 ]
//             }
//         },
//         {
//             "question": "I can enjoy sex without love",
//             "category": "59cbd216734d1d341d3ce79e",
//             "question_type": {
//                 "type": "single_choice",
//                 "options": [
//                     "always",
//                     "often",
//                     "sometimes",
//                     "rarely",
//                     "never"
//                 ]
//             }
//         },
//         {
//             "question": "For me, a stable relationship is a prerequisite for really good sex",
//             "category": "59cbd216734d1d341d3ce79e",
//             "question_type": {
//                 "type": "single_choice",
//                 "options": [
//                     "always",
//                     "often",
//                     "sometimes",
//                     "rarely",
//                     "never"
//                 ]
//             }
//         }
//     ]
// }

