'use strict';

const request = require('superagent');
const mongoose = require('mongoose');
const User = require('../models/user.js');
const expect = require('expect');
require('supertest');

process.env.DB_URL = 'mongodb://localhost:27017/costumes_stg';
const PORT = 4000;
const HOST = 'http://localhost';
const API = 'api/1.0';


beforeAll(() => {
  require('../lib/_server').start(PORT);
  return User.remove({});
});

afterAll(() => {
  mongoose.connection.close();
  require('../lib/_server').stop;
});

describe('POST /signup', () => {

  test('a new user can sign up when valid creds are provided', () => {

    return request
      .post(`${HOST}:${PORT}/${API}/signup`)
      .send({username: 'Marla', password: '1234', email: 'mail'})
      .then(res => {
        expect(res.body).not.toBe(undefined);
        expect(res.status).toEqual(200);
      });
  });

  test('400 is returned if no body is posted on signup', () => {

    return request
      .post(`${HOST}:${PORT}/${API}/signup`)
      .send({})
      .then(Promise.reject)
      .catch(res => {
        expect(res.message).toBe('Bad Request');
        expect(res.status).toEqual(400);
      });
  });

  test('400 is returned if incomplete data is posted on signup', () => {

    return request
      .post(`${HOST}:${PORT}/${API}/signup`)
      .send({username: 'Phoenix'})
      .then(Promise.reject)
      .catch(res => {
        expect(res.message).toBe('Bad Request');
        expect(res.status).toEqual(400);
      });
  });
});

describe('GET /signin', () => {

  test('Sign in w/valid creds should return a 200 and an auth token', () => {

    return request
      .get(`${HOST}:${PORT}/${API}/signin`)
      .auth('Marla', '1234')
      .then(res => {
        expect(res.body).not.toBe(undefined);
        expect(res.status).toEqual(200);
      });
  });

  test('Sign in with invalid creds should return a 401 and an auth token', () => {

    return request
      .get(`${HOST}:${PORT}/${API}/signin`)
      .auth('Marla', '5555')
      .then(Promise.reject)
      .catch(res => {
        expect(res.message).toBe('Unauthorized');
        expect(res.status).toEqual(401);
      });
  });
});

describe('UNREGISTERED ROUTES', () => {

  test('Bad URI should return a 404', () => {

    return request
      .get(`${HOST}:${PORT}/signin`) //missing the API version
      .auth('Marla', '5555')
      .then(Promise.reject)
      .catch(res => {
        expect(res.message).toBe('Not Found');
        expect(res.status).toEqual(404);
      });
  });
});
