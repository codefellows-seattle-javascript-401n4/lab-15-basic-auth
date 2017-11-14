'use strict';
require("dotenv").config();

const expect = require('expect');
const app = require('../lib/server.js');
const request = require('superagent');
const User = require('../models/User.js');

describe('Testing signup and sign in auth routes', done => {
    let username = "joel";
    let password = "testing";
    before(done => {
        User.remove({});
        app.start(process.env.PORT || 3000);
        done();
    });
    after(done => {
        app.stop();
        done();
    });

    it('Give a 400 if you do not send a password', function(done) {
        request.post(`localhost:${process.env.PORT || 3000}/api/signup`).send({username: "joel"}).then(response => {

            expect(response.body.statusCode).toEqual(400);
            expect(response.body.message).toEqual('Invalid or missing body');
            done();
        });
    });

    it('Sends details and return 200', done => {
        let password = "testing";
        request.post(`localhost:${process.env.PORT || 3000}/api/signup`).send({username: username, password: password}).then(response => {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('Sign in and reutrn 401, passwords did not match', done => {
        request.get(`localhost:${process.env.PORT || 3000}/api/signin`).auth(username, 'wrongPassword').end(response => {
            expect(response.response.statusCode).toEqual(401);
            expect(response.response.text).toEqual('Passwords did not match.');
            done();
        });

    });

    it('Return status 200 and a jwt token', done => {
        request.get(`localhost:${process.env.PORT || 3000}/api/signin`).auth(username, password).end(response => {

            expect(response.response.statusCode).toEqual(200);
            done();
        });
    });

    
});