'use strict';

// require('dotenv').config();
const request = require('superagent');
const expect = require('expect');
const User = require('../models/user');
const mongoose = require('mongoose');
const url = 'http://localhost:5500';

process.env.MONGODB_URI = 'monogdb://localhost/users-test';
process.env.PORT = 5500;



beforeAll(() => {
  require('../lib/_server').start(process.env.PORT);
  return User.remove({});
});

afterAll(() => {
  mongoose.connection.close();
  require('../lib/_server').stop;
});

const exampleUser = {
  username:'studley',
  password:'12345'
};

const badId = {
  username:'studley'
};

describe('POST/signup/', () => {
  test('should return token and 200 status code', (done) => {
    return request
      .post(`${url}/signup`)
      .send(exampleUser)
      .end((err, res) => {
        if (err) return done(err);
        // console.log('POST: /signup TOKEN:', res.text, '\n');
        expect(res.status).toEqual(200);
        expect(typeof res.text).toBe('string');
        done();
      });
  });

  describe('POST/signup/ with no user name or password', () => {
    test('Should give us a 400 with no password', function(done) {
      return request
        .post(`${url}/signup`)
        .send(badId)
        .then(res => {
          expect(res.body.statusCode).toEqual(400);
          expect(res.body.message).toEqual('missing body');
          done();
        });
    });

    test('Should reutrn 401 because passwords did not match', done => {
      // let exampleBad = {
      //   username:'studley',
      //   password:'54321'
      // };
      return request
        .get(`${url}/signin`)
        .auth('studley', '')
        .end((err, res) => {
          expect(res.statusCode).toEqual(403);
          expect(res.message).toEqual('Authenticat seyyyzzz no!!!!');
          // console.log(exampleUser);
          done();
        });

    });

  });

});

