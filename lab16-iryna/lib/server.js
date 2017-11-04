'use strict';
require('dotenv').config();
const PORT = process.env.PORT;
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/auth', {useMongoClient:true});
const app = require('express')();

app.use(require('../routes/auth-routes'));

app.use((err, req, res, next ) => {
    console.log(err);
    res.status(err.statusCode||500).send(err.message||'server error')
})

app.listen(PORT, console.log(`server on ${PORT}`));