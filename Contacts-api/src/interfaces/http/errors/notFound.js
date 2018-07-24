'use strict';

/* eslint-disable no-unused-vars */

/**
 * four variable (req, res, next) is required for express middleware
 * even if they are unused
 * */
module.exports = ((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
