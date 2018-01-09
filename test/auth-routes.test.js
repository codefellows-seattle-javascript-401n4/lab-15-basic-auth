'use strict';



const request = require('superagent');
const mongoose = require('mongoose');
const User = require('../models/user.js');
const expect = require('expect');
require('supertest');



process.env.DB_URL = 'mongodb://localhost:27017/auth_dev';
const PORT = 4000;
const HOST = 'http://localhost';
const API = 'api/1.0';



beforeAll(() => {
  require('../lib/_server').start(PORT);
  return User.remove ({});
});



afterAll(() => {
  mongoose.connection.close();
  require('../lib/_server').stop;
});



describe('POST / signup', () => {
  test('new user can sign up / in', () => {
    return request
      .post(`${HOST}:${PORT}:${API}/signup`)
      .send({username: 'Brian', password: '1234', email: 'email'})
      .then(res => {
        expect(res.text).not.toBe(undefined);
        expect(res.status).toEqual(200);
      });
  });


  test('error 400 if there is no body', () => {
    return request
      .post(`${HOST}:${PORT}/${API}/signup`)
      .send({})
      .then(Promise.reject)
      .catch(res => {
        expect(res.message).toBe('bad request');
        expect(res.status).toEqual(400);
      });
  });


  test('should return 400 if incomplete during signup', () => {
    return request
      .post(`${HOST}:${PORT}/${API}/signup`)
      .send({username : 'Bryan'})
      .then(Promise.reject)
      .catch(res => {
        expect(res.message).toBe('bad request');
        expect(res.status).toEqual(400);
      });
  });
});



describe('GET / signin', () => {
  test('should return 200 w token if info accepted', () => {
    return request
      .get(`${HOST}:${PORT}/${API}/signin`)
      .auth('Brian', '1234')
      .then(res => {
        expect(res.text).not.toBe(undefined);
        expect(res.status).toEqual(200);
      });
  });


  test('should return 401 if information provided is incorrect'), () => {
    return request
      .get(`${HOST}:${PORT}/${API}/signin`)
      .auth('Brian', '1235')
      .then(Promise.reject)
      .catch(res => {
        expect(res.message).toBe('unauthorized');
        expect(res.status).toEqual(401);
      });
  };
});



describe('unregistered routes', () => {
  test('should return 404 invalid uri', () => {
    return request
      .get(`${HOST}:${PORT}/signin`)
      .auth('Brian', '1235')
      .then(Promise.reject)
      .catch(res => {
        expect(res.message).toBe('not found');
        expect(res.status).toEqual(404);
      });
  });
});
