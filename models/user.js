'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

  username: {type: String, required: true, unique: true},
  password: {type: String, required: true }

});

userSchema.methods.generateHash = function(password) {

  return bcrypt.hashAsync(password, 10)
    .then((hash) => {
      this.password = hash;
      return this;
    })
    .catch(next);
};

userSchema.methods.verifyPassword = function(password) {

  return bcrypt.compareAsync(password, this.password)
    .then(res => { if(res) return this; })
    .catch(console.log(err));

};

userSchema.methods.generateToken = function() {

  return jwt.sign({ id: this._id }, process.env.SECRET || 'aKJfjk@4927.lk_jfd;pp9');

};

module.exports = mongoose.model('User', userSchema);
