'use strict';

const router = require('express').Router({ mergeParams: true });

// controller
const {
  publicParams,
  validateNameId,
  createName,
  retrieveNames,
  retrieveName,
  updateName,
  deleteName,
} = require('../controllers').NameController;
const {
  onlyTheseMethods,
} = require('../controllers').ContactController;
// middleware
const {
  stopIfErrors,
} = require('../middleware/index');
// sanitizers and validaters
const {
  bodySanitizer,
  putBodyValidator,
  checkIfValidBody,
} = require('../middleware/soapFactory');

/**
 * Subrouter for Names
 */

router.param('nameId', validateNameId);

router.use(bodySanitizer(publicParams));

router.route('/')
  .post(checkIfValidBody(publicParams), createName)
  .get(retrieveNames)
  .all(onlyTheseMethods('POST, GET'));

router.route('/:nameId')
  .get(retrieveName)
  .put(putBodyValidator(publicParams),
    stopIfErrors,
    checkIfValidBody(publicParams),
    updateName)
  .delete(deleteName)
  .all(onlyTheseMethods('GET, PUT, DELETE'));

module.exports = router;
