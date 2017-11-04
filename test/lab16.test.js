'use strict';
require("dotenv").config();

const expect = require('expect');
const app = require('../lib/server.js');
const request = require('superagent');
const User = require('../models/User.js');

describe('Testing our signup and signin auth routes', done => {
    let username = "david";
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

    //signup 400 no body or username/password
    it('Should give us a 400 if we do not send a password', function(done) {
        request.post(`localhost:${process.env.PORT || 3000}/api/signup`).send({username: "David"}).then(response => {

            expect(response.body.statusCode).toEqual(400);
            expect(response.body.message).toEqual('Invalid or missing body');
            done();
        });
    });
    //signup 200 created new user
    it('Should should send details properly and return 200', done => {
        let password = "testing";
        request.post(`localhost:${process.env.PORT || 3000}/api/signup`).send({username: username, password: password}).then(response => {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });
    // signin 401 user could not be authenticated
    it('Should attept to sign in and reutrn 401 because paswords did not match', done => {
        request.get(`localhost:${process.env.PORT || 3000}/api/signin`).auth(username, 'wrongPassword').end(response => {
            expect(response.response.statusCode).toEqual(401);
            expect(response.response.text).toEqual('Passwords did not match.');
            done();
        });

    });

    it('Should correctly return status 200 and a jwt token', done => {
        request.get(`localhost:${process.env.PORT || 3000}/api/signin`).auth(username, password).end(response => {

            expect(response.response.statusCode).toEqual(200);
            done();
        });
    });

    // signed in and responded with a token
});