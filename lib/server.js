'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lab15', {useMongoClient: true});

app.use('/api', require('../routes/routes.js'));

app.use("*", (req,res,next) => {
    res.sendStatus(404); 
    next();
 });

 let http = null;
 let isRunning = null;

module.exports = {
    start: (port) => {
        if (isRunning) return "Server is already running";
        http = app.listen(port, () => {
            isRunning = true;
            console.log(`Server is running in port: ${port}`);
            console.log('Did you run "npm run db" to ensure your mongdb database is running?');
        });
    },
    stop: () => {
        if (!isRunning) return "Server is already shut down";
        if (!http) return "Invalid Server";
        http.close(() => {
            http = null;
            isRunning = false;
            console.log('Server shut down.');
        });
    }
}