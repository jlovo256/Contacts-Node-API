'use strict';

/* eslint-disable no-unused-vars, arrow-body-style */

/**
 * four variable (err, req, res, next) is required for express error handlers
 * even if they are unused
 * stacktrace for dev
 * @param {logger} logger
 * */
module.exports = ((logger) => {
  return ((err, req, res, next) => {
    logger.error(`${err.status || 500} - ${err.message} - ${res.get('Status')} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res
      .type('json')
      .status(err.status || 500)
      .send({
        error: {
          message: err.message,
          error: err,
        },
      });
  });
});
