const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {required: true},
    findHash: {unqiue: true}
});

module.exports = mongoose.model('User', userSchema);