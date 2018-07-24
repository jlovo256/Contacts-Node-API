'use strict';

const router = require('express').Router({ mergeParams: true });

// controller
const {
  publicParams,
  validateAddressId,
  createAddress,
  retrieveAddresses,
  retrieveAddress,
  updateAddress,
  deleteAddress,
} = require('../controllers/').AddressController;
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
 * Subrouter for Addresses
 */

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
