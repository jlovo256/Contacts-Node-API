'use strict';

const Server = require('./Server');

module.exports = ((config, router, logger) => {
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
