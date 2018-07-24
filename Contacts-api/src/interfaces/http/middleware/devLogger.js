'use strict';

// logger middleware for HTTP requests
// disable if testing bc interferes with mocha
const morgan = require('morgan');

module.exports = logger => morgan('combined', { stream: logger.stream });
