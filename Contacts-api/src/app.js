'use strict';

const path = require('path');
const appRoot = require('app-root-path').toString();

// check environment
const env = process.env.NODE_ENV || 'development';
// load configuration
const config = require(path.join(appRoot, 'config'));
const configDb = require(path.join(appRoot, 'config/database'))[env];
// load logger
const logger = require('./infrastructure/logging');

// check for neededconfig files
if (!config) {
  logger.error('No config file.');
}
if (!configDb) {
  logger.error('No database config file.');
}

// Load the http server (ExpressJS)
require('./interfaces/http')(config, logger);
