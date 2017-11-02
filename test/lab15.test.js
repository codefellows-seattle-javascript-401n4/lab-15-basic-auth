'use strict';
require("dotenv").config();

const expect = require('expect');
const app = require('../lib/server.js');
const request = require('superagent');
const User = require('../models.User.js');

