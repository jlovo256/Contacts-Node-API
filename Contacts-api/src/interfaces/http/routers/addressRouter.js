'use strict';

const router = require('express').Router({ mergeParams: true });

// errors
const onlyTheseMethods = require('../errors/onlyTheseMethods');
// middleware
const stopIfErrors = require('../middleware/stopIfErrors');
// sanitizers and validaters
const {
  bodySanitizer,
  putBodyValidator,
  checkIfValidBody,
} = require('../middleware/soapFactory');

/**
 * Subrouter for Addresses
 */

/**
 * Used by validators
 * @type {Array}
 * */
const publicParams = [
  'primary',
  'addressL1',
  'addressL2',
  'city',
  'state',
  'zipcode',
  'country',
];


function createRouter(controller) {
  // controller
  const {
    validateAddressId,
    createAddress,
    retrieveAddresses,
    retrieveAddress,
    updateAddress,
    deleteAddress,
  } = controller;

  router.param('addressId', validateAddressId);

  router.use(bodySanitizer(publicParams));

  router.route('/')
    .post(checkIfValidBody(publicParams), createAddress)
    .get(retrieveAddresses)
    .all(onlyTheseMethods('POST, GET'));

  router.route('/:addressId')
    .get(retrieveAddress)
    .put(putBodyValidator(publicParams),
      stopIfErrors,
      checkIfValidBody(publicParams),
      updateAddress)
    .delete(deleteAddress)
    .all(onlyTheseMethods('GET, PUT, DELETE'));

  return router;
}
module.exports = createRouter;
