'use strict';

const router = require('express').Router({ mergeParams: true });

// controller
const {
  validateNameId,
  createName,
  retrieveNames,
  retrieveName,
  updateName,
  deleteName,
} = require('../controllers').NameController;
// errors
const onlyTheseMethods = require('../errors/onlyTheseMethods');
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

/**
 * Used by validators
 * @type {Array}
 * */
const publicParams = [
  'primary',
  'honorific',
  'firstName',
  'middleName',
  'lastName',
];

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
