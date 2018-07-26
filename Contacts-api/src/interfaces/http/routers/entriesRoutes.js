'use strict';

const router = require('express').Router({ mergeParams: true });

// controllers
const {
  publicParams,
  publicParamsNames,
  publicParamsAddresses,
  validateEntryId,
  createEntry,
  retrieveAll,
  retrieveEntry,
  retrieveEntryPrimary,
  deleteEntry,
} = require('../controllers').EntryController;
const {
  onlyTheseMethods,
} = require('../controllers').ContactController;
// sub-routers
const namesRouter = require('./namesRoutes');
const addressesRouter = require('./addressesRoutes');
// sanitizers and validaters
const {
  bodySanitizerDeep,
} = require('../middleware/soapFactory');

/**
 * Subrouter for Entries
 */

router.param('contactId', validateEntryId);

router.use(bodySanitizerDeep(publicParams[0], publicParamsNames));
router.use(bodySanitizerDeep(publicParams[1], publicParamsAddresses));

router.route('/')
  .get(retrieveAll)
  .post(createEntry)
  .all(onlyTheseMethods('GET, POST'));

router.route('/:contactId')
  .get(retrieveEntry)
  .delete(deleteEntry)
  .all(onlyTheseMethods('GET, DELETE'));

router.route('/:contactId/primary')
  .get(retrieveEntryPrimary)
  .all(onlyTheseMethods('GET'));

router.use('/:contactId/names', namesRouter);
router.use('/:contactId/addresses', addressesRouter);

module.exports = router;
