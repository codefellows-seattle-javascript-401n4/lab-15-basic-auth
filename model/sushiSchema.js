'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));
const jwt = require('jsonwebtoken');

// create user or sushi as I like to call it that contains all the information you need for an individual user

const sushiSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true },
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});

const foodSchema = new mongoose.Schema({
  name: String,
  fish: String,
  userID: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
});
sushiSchema.methods.generateHash = function(password){
  return bcrypt.hashAsync(password,10)
  .then( hash => {
    this.password = hash;
    return this;
  });
};

sushiSchema.methods.comparePassword = function(password){
  return bcrypt.compareAsync(password,this.password)
  .then( res => {
    if(res) return this;
    throw new Error('password invalid');
  });
};

sushiSchema.methods.generateToken = function(){
  return jwt.sign({id: this._id}, process.env.SECRET || 'changethis');
};

module.exports = mongoose.model('User', sushiSchema);
module.exports = mongoose.model('Food', foodSchema);
