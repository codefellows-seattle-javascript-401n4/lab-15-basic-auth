const mongoose = require('mongoose');
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

require('dotenv').config();

userSchema.methods.generateHash = function(password){
    return bcrypt.hashAsync(password, 10).then(hash => {
        this.password = hash;
        return this;
    });
};

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareAsync(password, this.password).then(res => {
        return res;
    });
};

// could we hash the password here?
// userSchema.pre('save', (next) => {
//     console.log(this);
// this.password = 'not actually hello haha';
// next();
// });

module.exports = mongoose.model('User', userSchema);