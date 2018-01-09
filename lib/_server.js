'use strict';



const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/auth_dev', {useMongoClient: true});
const app = require('express')();



app.use('/api/1.0', require(__dirname + '/../routes/auth-routes'));



app.all('*', (req, res, next) => {
  next(404);
});


app.use((err, req, res, next) => {
  console.log('errorhandler')
  res.send(err);
});


module.exports = {
  start: (port, cb) => {
    app.listen(port, cb);
      console.log(`Server is up on PORT ${process.env.PORT}!`);
    },
    stop: (cb) => app.close(cb),
  };
