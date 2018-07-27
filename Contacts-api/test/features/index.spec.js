'use strict';

const path = require('path');
const appRoot = require('app-root-path').toString();
// files needed for server
const config = require(path.join(appRoot, 'config'));
const logger = require(path.join(appRoot, 'src/infrastructure/logging'));
const router = require(path.join(appRoot, 'src/interfaces/http/router'))(logger); /* eslint-disable-line global-require */
const Server = require(path.join(appRoot, 'src/interfaces/http/Server'));

// testers
const chai = require('chai'); /* eslint-disable-line import/order */
chai.use(require('chai-http')); // middleware for testing server
chai.use(require('chai-things')); // middleware for testing arrays

const { expect } = chai;

const server = new Server({
  config,
  logger,
  router,
});

/* eslint-disable */
server.start()
  .catch((err) => {
    console.error(`Could not start server: ${err}`);
  });

describe('Contact API Tester', function () {
  require('./routes/routes')(server.express, chai, expect);
  require('./routes/contactRoutes')(server.express, chai, expect);
  require('./routes/nameRoutes')(server.express, chai, expect);
  require('./routes/addressRoutes')(server.express, chai, expect);
});
/* eslint-enable */
