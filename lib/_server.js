'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/auth_dev', {useMongoClient: true});

const app = module.exports = require('express')();

app.use(require(__dirname + '/../routes/auth-routes'));

app.all('*', (req, res, next) => {
  
  next({statusCode:404, message:'route not found'});
  
});

app.use(require('./error-message'));


module.exports = {
  start: (port, cb) => {
    app.listen(port, cb);
    console.log(`Server is up on PORT ${process.env.PORT}!`);
  },
  stop: (cb) => app.close(cb),
};