'use strict';

const express = require('express');
const helmet = require('helmet');

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
    this.express.use(router);
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
