'use strict';

const path = require('path');
const appRoot = require('app-root-path').toString();
// view
const { view } = require(path.join(appRoot, 'src/interfaces/http/views/view'));

/**
 * @module AddressController
 *
 * @param {Function} Address
 * @returns module.exports
 */
module.exports = (Address) => {
  /**
   * Middleware that needs model/repo access
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   * @param {string} addressId
   * @returns {Function} next
   */
  function validateAddressId(req, res, next, addressId) {
    return Address.getByModelId(addressId)
      .then((address) => {
        if (address instanceof Error) {
          throw new Error('invalid address');
        }
        req.address = {
          addressId: address.get('addressId'),
          id: address.id,
        };
        return next();
      })
      .catch((err) => {
        /* eslint-disable-next-line no-param-reassign */
        err.status = 404;
        return next(err);
      });
  }
  module.exports.validateAddressId = validateAddressId;

  /**
   * @param {Request} req
   * @param {Response} res
   * @returns {Function} view
   */
  function createAddress(req, res) {
    return Address.addOne(req.body, req.entry.id)
      .then((results) => {
        // URI locattion header
        res.location(`/api/v1.0/contacts/${req.entry.contactId}/addresses/${results.dataValues.addressId}`);
        return view(req, res, results, 201);
      })
      .catch(err => view(req, res, err.message, 400));
  }
  module.exports.createAddress = createAddress;

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Function}
   */
  function retrieveAddresses(req, res) {
    // get offset from user if set and a postive integer, otherwise use default of 0
    const offset = (req.query && (parseInt(req.query.offset, 10) >= 0))
      ? parseInt(req.query.offset, 10) : 0;
    // get limit from user if set and a postive integer and less than 100,
    // otherwise use default of 10
    const limit = ((parseInt((req.query && req.query.limit), 10) >= 0)
      && ((parseInt(req.query.limit, 10) <= 100)))
      ? parseInt(req.query.limit, 10) : 10;

    return Address.getAllByIdPag(req.entry.id, offset, limit)
      .then(results => view(req, res, results, 200))
      .catch(err => view(req, res, err.message, 404));
  }
  module.exports.retrieveAddresses = retrieveAddresses;

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Function}
   */
  function retrieveAddress(req, res) {
    return Address.getByIds(req.address.addressId, req.entry.id)
      .then(results => view(req, res, results, 200))
      .catch(err => view(req, res, err.message, 404));
  }
  module.exports.retrieveAddress = retrieveAddress;

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Function}
   */
  function updateAddress(req, res) {
    return Address.updateOne(req.body, req.address.addressId, req.entry.id)
      .then((rowsAffected) => {
        // sequelize api returns only number of rows affected, so
        // the params must be used to return updated object
        if (rowsAffected[0] === 0) {
          throw new Error('Nice try');
        }
        return Address.getByIds(req.address.addressId, req.entry.id);
      })
      .then(results => view(req, res, results, 200))
      .catch(err => view(req, res, err.message, 400));
  }
  module.exports.updateAddress = updateAddress;

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Function}
   */
  function deleteAddress(req, res) {
    return Address.deleteOne(req.address.addressId)
      .then(() => res.sendStatus(204))
      .catch(err => view(req, res, err.message, 404));
  }
  module.exports.deleteAddress = deleteAddress;

  return module.exports;
};
