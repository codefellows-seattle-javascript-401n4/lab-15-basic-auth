'use strict';
require('dotenv').config();

const server = require('./lib/server.js');

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port: ${process.env.PORT || 3000}`);
    console.log('Did you remember to create a .env file and run "npm run db" to start your mongo db?');
});