'use strict';
// require('dotenv').config();
process.env.MONGODB_URL = 'mongodb://localhost:27017/auth_dev';
const mongoose = require('mongoose');
const expect = require('expect');
const User = require('../models/user');
const request = require('superagent');
const server = require('../server');
const jwt = require('jsonwebtoken');
process.env.SECRET = 'SECRET';
// process.env.PORT = 3000;
server.listen(3000);
beforeAll(() => {
  // return User.remove({});
});

// afterAll(() => {
//   mongoose.connection.close();
//   server.stop;
// });
describe('Signing a user up' , () =>{
  test('if a unique username is provided as well as a password, test should pass' , () => {

    return request

    .post('localhost:3000/signup')
    .send({username:'validName', password: 'mypass'})

    // .then(res =>{
    //   let decoded = jwt.verify(res.text, 'SECRET');
    //   console.log(decoded);
    //   expect(decoded.id.length).not.ToBe(0);
    //   return User.findOne({username:'validName'})
    //
    //   .then(user => expect(user._id.toString()).toBe(decoded.id))
    //   .catch(err);
    // });
    .then(console.log('hits before res'))
    .then(res => {
      console.log('hits in res');
      expect(res.status).toBe(200);
      console.log('hit');
    });

  });
  xtest('should sign in', () => {
    return request
    .get('localhost:3000/signin')
    .auth('validName','mypass')
    .then(res =>{
      let decoded = jwt.verify(res.text, 'SECRET');
      expect(decoded.id.length).not.ToBe(0);
      return User.findOne({username:'validName'})

      .then(user => expect(user._id.toString()).toBe(decoded.id));
    });
  });
});
