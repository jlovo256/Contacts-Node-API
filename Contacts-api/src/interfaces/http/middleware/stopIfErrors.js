'use strict';

const { validationResult } = require('express-validator/check');
/**
 * Middleware to check if express-validator returned any errors
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
function stopIfErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    return next(errors.array());
  }
  return next();
}
module.exports = stopIfErrors;
