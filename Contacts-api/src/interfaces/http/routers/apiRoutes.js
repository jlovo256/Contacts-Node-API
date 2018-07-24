'use strict';

const router = require('express').Router();

/**
 * Subrouter for API
 */

// controllers
const {
  helloContacts,
  onlyTheseMethods,
} = require('../controllers').ContactController;
// sub-routers
const entriesRouter = require('./entriesRoutes');

router.route('/')
  .get(helloContacts)
  .all(onlyTheseMethods('GET'));

router.use('/contacts', entriesRouter);

module.exports = router;
