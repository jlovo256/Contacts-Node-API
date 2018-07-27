'use strict';

const router = require('express').Router();

/**
 * Subrouter for API
 */

// controllers
const {
  helloContacts,
} = require('../controllers');
// errors
const onlyTheseMethods = require('../errors/onlyTheseMethods');
// sub-routers
const contactRouter = require('./contactRoutes');

router.route('/')
  .get(helloContacts)
  .all(onlyTheseMethods('GET'));

router.use('/contacts', contactRouter);

module.exports = router;
