'use strict';

const {
  body,
  buildCheckFunction,
} = require('express-validator/check');

const checkBody = buildCheckFunction(['body']);

/**
 * Uses express-validator functions to apply sanitize rules to
 * all params in a body
 *
 * @param {Array} params
 * @returns {Array} array of validator functions
 */
const bodySanitizer = ((params) => {
  return [
    body(params)
      .trim()
      .escape()
  ];
});
module.exports.bodySanitizer = bodySanitizer;

/**
 * Uses express-validator wildcard functions to apply sanitize rules to
 * all items of an array
 *
 * @param {string} outerParam
 * @param {Array} innerParams
 * @returns {Array}
 */
const bodySanitizerDeep = ((outerParam, innerParams) => {
  let params = [];  // An array for the middleware

  if (!Array.isArray(innerParams)) {
    throw new Error('not params array');
  }
  for (let i = 0, len = innerParams.length; i < len; i++) {
    params.push(`${outerParam}.*.${innerParams[i]}`);
  }
  return [
    body(params)
      .trim()
      .escape()
  ];
});
module.exports.bodySanitizerDeep = bodySanitizerDeep;

/**
  * Note: WRITE NOT ABOUT WHAT THIS DOES IF params ISN'T DEFINED RIGHT
  *
  * @private
  * @param {Object} bodyObj
  * @param {Array}
  * @returns {boolean}
  */
const bodyValidator = ((bodyObj, params) => {
  function isIncluded(element) {
    return params.includes(element);
  }

  return Object.keys(bodyObj).every(isIncluded);
});
module.exports.bodyValidator = bodyValidator;

/**
 * Uses express-validator functions to apply sanitize rules to
 * all params in a body
 *
 * @param {Array} params
 * @returns {Array}
 */
const putBodyValidator = ((params) => {
  return [
    checkBody(params)
      .exists()
  ];
});
module.exports.putBodyValidator = putBodyValidator;

/**
 *
 * @param {Array} params
 * @returns {Function} next
 */
const checkIfValidBody = ((params) => {
  return function (req, res, next) {
    if (!bodyValidator(req.body, params)) {
      const err = new Error('Bad Param');
      res.status(400);
      return next(err);
    } else {
      return next();
    }
  };
});
module.exports.checkIfValidBody = checkIfValidBody;
