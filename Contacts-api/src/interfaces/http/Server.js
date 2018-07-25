'use strict';

const path = require('path');
const appRoot = require('app-root-path').toString();

const express = require('express');
const helmet = require('helmet');

// static directory options
const staticOptions = {
  dotfiles: 'ignore',
  extensions: ['json', 'yaml'],
  etag: false,
  maxAge: '1d',
  redirect: false,
};


class Server {
  constructor({ config, router, logger }) {
    this.config = config;
    this.logger = logger;
    this.express = express();

    // headers for security stuff
    this.express.use(helmet())
      .use(helmet.referrerPolicy({ policy: 'same-origin' }))
      .use(helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: ["'self'"],
        },
      }));
    this.express
      .use('/static', express.static(path.join(appRoot, 'public'), staticOptions))
      .use(router);
  }

  start() {
    return new Promise((resolve) => {
      const http = this.express
        .listen(this.config.port, () => {
          const { port } = http.address();
          this.logger.info(`Contacts API [p ${process.pid}] listening on port ${port}`);
          resolve();
        });
    });
  }
}

module.exports = Server;
