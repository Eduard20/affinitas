
/**
 * Module dependencies
 */

const should = require('chai').should();
const superagent = require('superagent');
const host = 'http://127.0.0.1:3000';
const _ = require('lodash');

describe('questions: negative cases', () => {
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

describe('questions: positive case', () => {
    it('It should successfully pass', done => {

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzaW1vbnlhbjIwMTRAZ21haWwiLCJpYXQiOjE1MDY2NTU1NzN9.qIIG9ibJHfCcRm5-1Yf-UyRYXZsSpyLilUXbS_Ss4wQ';

        superagent.get(`${host}/api/questions`)
            .set('content-type', 'application/json')
            .set('authorization', token)
            .end((err, res) => {
                res.should.have.property('status').eql(200);
                res.should.be.a('object');
                res.should.have.property('body');
                res.body.should.have.property('status').eql('OK');
                res.body.should.have.property('questions');
                done();
            });
    });
});

