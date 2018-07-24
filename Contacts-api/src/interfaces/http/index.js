'use strict';

const Server = require('./Server');

module.exports = ((config, logger) => {
  const router = require('./routers')(logger); /* eslint-disable-line global-require */

  const server = new Server({
    config,
    logger,
    router,
  });

  server.start()
    .catch((err) => {
      logger.error(`Could not start server: ${err}`);
    });
});
