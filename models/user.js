'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

  username: {type: String, required: true, unique: true},
  password: {type: String, required: true },
  email: {type: String, required: true}

});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashAsync(password, 10)
    .then((hash) => {
      console.log('in the hash')
      this.password = hash;
      return this;
    });
};

userSchema.methods.verifyPassword = function(password) {

  return bcrypt.compareAsync(password, this.password)
    .then(res => {
      console.log('res: ', res);
      if(res) return this;
      throw new Error('password did not match');

    })



};

userSchema.methods.generateToken = function() {
  return jwt.sign({ id: this._id }, process.env.SECRET || 'aKJfjk4927lkjfdpp9');
};

module.exports = mongoose.model('User', userSchema);
