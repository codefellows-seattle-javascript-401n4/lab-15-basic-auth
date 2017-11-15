'use strict';

'use strict';

require('dotenv').config();
const superagent = require('superagent');
const expect = require('expect');
const Sushi = require('../model/sushiSchema.js');
const mongoose = require('mongoose');
const mocha = require('mocha');
const server = require('../server.js');

let validJWT = process.env.VALID_JWT;

describe('post test for signup and sushi', () => {
  it('should return 200 status code', () => {
    return superagent.post('http://localhost:3000/signup')
      .send({username:'rylezzz', email: 'ryleezz@rylee.com' ,password:'1234567'})
      .then(res => {
        expect(res.status).toEqual(200);
      });
  });
  it('should return 200 for a successful request', () => {
    return superagent.post('http://localhost:3000/sushi')
    .set('Authorization', `Bearer ${validJWT}`)
    .send({name: 'fishfry', fish: 'cod', userId: '59fe3233f0a6ea95a1a62b9a'})
    .then( res => {
      expect(res.status).toBe(200);
    });
  });
  it('should give status code of 400 with an incomplete body', () => {
    return superagent.post('http://localhost:3000/signup')
      .send({
        username: 'ryles', email: 123, password: 'h34',
      })
      .catch(res => {
        expect(res.status).toEqual(400);
      });
  });
});
describe('get test for signin and sushi', () => {
  it('Should return 200 for a successful sin', () => {
    return superagent.get('http://localhost:3000/signin')
      .auth('rylezzz', '1234567')
      .then(res => {
        expect(res.status).toBe(200);
      });
  });
  it('should return 200 for a successful request', () => {
    return superagent.get('http://localhost:3000/sushi/')
    .set('Authorization', `Bearer ${validJWT}`)
    .then( res => {
      expect(res.status).toBe(200);
    });
  });
  it('Should reutrn 401 because passwords did not match', () => {
    return superagent.get('http://localhost:3000/signin')
        .auth('rylezzz', 'jajgdakjdgk')
        .catch(res => {
          expect(res.status).toEqual(401);
        });
  });
});

describe('delete test for sushi', () => {
  it('should return a 200 for a succesful delete of a resource',() => {
    return superagent.delete('http://localhost:3000/sushi/5a0bbb0a2abe54c8df43b62e')
    .set('Authorization', `Bearer ${validJWT}`)
    .then( res => {
      expect(res.status).toBe(200);
    });
  });
});
