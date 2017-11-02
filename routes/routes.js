const express = require('express');
const jsonParser = require('body-parser').json();
const User = require(`${__dirname}/../models/User.js`);

const Router = module.exports = express.Router();

Router.get('/signin', (req, res) => {

});

Router.post('/signup', jsonParser, (req, res) => {
    
});