'use strict';

const router = require('express').Router();

/**
 * Subrouter for API
 */

// errors
const onlyTheseMethods = require('../errors/onlyTheseMethods');

function createRouter(controller, contactRouter) {
  // controllers
  const {
    helloContacts,
  } = controller;

  router.route('/')
    .get(helloContacts)
    .all(onlyTheseMethods('GET'));

  router.use('/contacts', contactRouter);

  return router;
}
module.exports = createRouter;
