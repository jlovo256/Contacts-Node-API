'use strict';

const router = require('express').Router({ mergeParams: true });

// controller
const {
  validateAddressId,
  createAddress,
  retrieveAddresses,
  retrieveAddress,
  updateAddress,
  deleteAddress,
} = require('../controllers/').AddressController;
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

router.param('addressId', validateAddressId);

router.use(bodySanitizer(publicParams));

router.route('/')
  .post(checkIfValidBody(publicParams), createAddress)
  .get(retrieveAddresses)
  .all(onlyTheseMethods('POST, GET'));

router.route('/:addressId')
  .get(retrieveAddress)
  .put(
    putBodyValidator(publicParams),
    stopIfErrors,
    checkIfValidBody(publicParams),
    updateAddress)
  .delete(deleteAddress)
  .all(onlyTheseMethods('GET, PUT, DELETE'));

module.exports = router;
