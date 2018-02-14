'use strict';

const server = require('../lib/server');
const User = require('../models/user');
const superagent = require('superagent');
const faker = require('faker');

require('jest');

describe('user auth routes' , function(){
  beforeAll(server.start);
  afterAll(server.stop);

  this.mockUser = {
    username: faker.internet.username(),
    password: faker.internet.password(),
    email: faker.internet.email(),
  };

  describe('POST /signup', function(){
    test('should post new user, return user data', function(){
      return superagent.post(':8080/signup')
        .send(this.mockUser)
        .then(res => {
          this.res = res;
          expect(this.res.body).toHaveProperty('token');
          expect(this.res.status).toBe(201);
        });
    });
  });
  describe('GET /signin', function(){
    test('should GET user token', function(){
      return superagent.get(':8080/signin')
        .auth(this.mockUser.username, this.mockUser.password)
        .then(res => {
          expect(res.body).toHaveProperty('token');
        });
    });

  });
});
