'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const app = require('express')();

app.use(require('./route/routes.js'));

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500 || err.statusCode).send(err.message || 'server error');
});

module.exports = {
    start: () => {
        app.listen(process.env.PORT || 3000, () => {
            console.log('server up');
        });
        mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/auth_dev', {useMongoClient: true});        
    },
    stop: () => {
        app.close( () => {
            console.log('server down');
        });
        mongoose.disconnect();
    },
};

