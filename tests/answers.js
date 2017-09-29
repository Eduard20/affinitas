
/**
 * Module dependencies
 */

const should = require('chai').should();
const superagent = require('superagent');
const host = 'http://127.0.0.1:3000';
const _ = require('lodash');
const mongoose = require('mongoose');
const {
    AnswersModel
} = require('../dbQueries/mongodb/models');
const winston = require('winston');
const tokenFunction = require('../modules/token');

mongoose.Promise = Promise;

describe('answers: negative case', () => {
    it('It should answer that token is not found', done => {

        const token = 'qIIG9ibJHfCcRm5-1Yf-UyRYXZsSpyLilUXbS_Ss4wQ';

        superagent.get(`${host}/api/userInfo`)
            .set('content-type', 'application/json')
            .set('authorization', token)
            .end((err, res) => {
                err.should.have.property('status').eql(404);
                done();
            });
    });

});

describe('answers: positive case', () => {

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzaW1vbnlhbjE1MjRAZ21haWwuY29tIiwiaWF0IjoxNTA2NjcxOTkyfQ.d5Ft3Pn8dAcw85Tytvf1IqQCBVvIp_gKKgY6BdQSbT8';
    const email = tokenFunction.decode(token);

    after(done => {
        AnswersModel.remove({ email }, (err, doc) => {
            if (err) winston.log('error', err);
            done();
        });

    });

    const body = {
        data: [
            {
                answer: 'male',
                question: 'What is your gender?'
            },
            {
                answer: 'important',
                question: 'How important is the gender of your partner?'
            },
            {
                answer: 'important',
                question: 'How important is the age of your partner to you?'
            },
        ],
    };

    it('It should successfully update the answers', done => {

        superagent.put(`${host}/api/answers`)
            .set('content-type', 'application/json')
            .set('authorization', token)
            .send(body)
            .end((err, res) => {
                res.should.have.property('status').eql(200);
                res.should.be.a('object');
                res.should.have.property('body');
                res.body.should.have.property('status').eql('OK');
                res.body.should.have.property('result');
                should.equal(err, null);
                done();

            });
    });

    it('It should successfully get the answers', done => {

        superagent.get(`${host}/api/answers`)
            .set('content-type', 'application/json')
            .set('authorization', token)
            .end((err, res) => {
                res.should.have.property('status').eql(200);
                res.should.be.a('object');
                res.should.have.property('body');
                res.body.should.have.property('status').eql('OK');
                res.body.should.have.property('result');
                done();
            });
    });
});

