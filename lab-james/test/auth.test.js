'use strict';

const superagent = require('superagent');
const server = require('../lib/server.js');

describe('authorization tests', function(){

  beforeAll(server.start);
  afterAll(server.stop);

  describe('Invalid route', function(){

    test('should respond with a 404 for undefined routes', function(){
      return superagent.post('http://localhost:3000/signup')
        .set('content-type', 'application/json')
        .send({
          username: 'test',
          password: 'password',
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });

  });


});
