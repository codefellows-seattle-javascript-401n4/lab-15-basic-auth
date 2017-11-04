'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true}
  password: {type: String, required: true}
});

userSchema.methods.hashPass = function(password){
  return bcrypt.hashAsync(password, 10)
    .then( (hasedPass) => {
      this.password = hashedPass;
      return this;
    });
}

userSchema.methods.checkPass = function(password){
  return bcrypt.compareAsync(password, this.password)
    .then(res => {
      
    })
}
