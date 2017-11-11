'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/auth_dev', {useMongoClient: true});

const app = module.exports = require('express')();
app.use(require('./routes/auth-routes'));
app.use((err, req, res) => {
  res.status(500 || err.statusCode).send(err.message || 'server error');
});
// app.listen(process.env.PORT || 3000);
//
// module.exports = {
//   start: () => {
//     // app.listen(process.env.PORT || 3000);
//     console.log(`Server is running on PORT: ${process.env.PORT}`);
//   },
//   stop: () => app.close(),
// };
