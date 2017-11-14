'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bluebird').promisefyAll(require('bcrypt'));

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    findHash: {type: String, unique: true},//does a findHash property go here?
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashAsync(password, 10) //versus using .hash(password, 10)?
        .then((hash) => {
            this.password = hash;
            return this;
        });
};

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareAsync(password, this.password) //versus using .compare(password, this.password)?
        .then(res => {
            if (res) return this;
            throw new Error('password did not match');
        });
};

userSchema.methods.generateToken = function() {
    return jwt.sign({id: this._id}, process.env.SECRET || 'changethis');//why the string 'changethis'?
};

module.exports = mongoose.model('User', userSchema);