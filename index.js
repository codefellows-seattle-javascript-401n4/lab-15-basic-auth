'use strict';
require('dotenv').config();

require(__dirname + '/lib/server').start(process.env.PORT || 3000);