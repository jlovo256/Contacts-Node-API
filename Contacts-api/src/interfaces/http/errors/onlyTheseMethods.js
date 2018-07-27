'use strict';

/**
 * @module onlyTheseMethods
 * 405 response for not allowed response methods
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} res
 */
function onlyTheseMethods(methods) {
  return function onlyTheseMethodsResponse(req, res) {
    res.set({
      Allow: methods,
    });
    return res.status(405).end();
  };
}
module.exports = onlyTheseMethods;
