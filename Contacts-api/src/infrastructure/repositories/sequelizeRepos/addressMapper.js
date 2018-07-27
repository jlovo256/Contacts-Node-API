'use strict';

const Promise = require('bluebird');

function createMapper(Address) {
  /**
 * Takes dataValues of a Sequelize object and converts them into an Address object
 * @param {Promise} Address
 */
  function toEntity({ dataValues }) {
    const {
      id,
      addressId,
      primary,
      addressL1,
      addressL2,
      city,
      state,
      zipcode,
      country,
      created_at, /* eslint-disable-line camelcase */
      updated_at, /* eslint-disable-line camelcase */
    } = dataValues;

    return Promise.try(() => {
      return new Address(
        id,
        addressId,
        primary,
        addressL1,
        addressL2,
        city,
        state,
        zipcode,
        country,
        created_at,
        updated_at,
      );
    });
  }
  module.exports.toEntity = toEntity;

  /**
  *
  * @param {Object} body
  * @param {number} id
  * @returns {Promise}
  */
  function toDatabase(body, id) {
    const {
      primary,
      addressL1,
      addressL2,
      city,
      state,
      zipcode,
      country,
    } = body;

    return Promise.try(() => {
      return {
        id,
        primary: (primary || false),
        addressL1: (addressL1 || null),
        addressL2: (addressL2 || null),
        city: (city || null),
        state: (state || null),
        zipcode: (zipcode || null),
        country: (country || null),
      };
    });
  }
  module.exports.toDatabase = toDatabase;

  /**
   *
   * @param {number} id
   * @returns {Promise}
   */
  function findByIdOpts(id) {
    return Promise.try(() => {
      return {
        where: {
          id,
        },
      };
    });
  }
  module.exports.findByIdOpts = findByIdOpts;

  /**
   *
   * @param {number} id
   * @returns {Promise}
   */
  function findByIdPaginationOffsetSequelizeOptions(id, offset, limit) {
    return Promise.try(() => {
      return {
        where: {
          id,
        },
        offset,
        limit,
      };
    });
  }
  module.exports.findByIdPagOpts = findByIdPaginationOffsetSequelizeOptions;

  /**
   *
   * @param {number} id
   * @returns {Promise}
   */
  function findByIdPrimaryOpts(id) {
    return Promise.try(() => {
      return {
        where: {
          id,
          primary: true,
        },
      };
    });
  }
  module.exports.findByIdPrimaryOpts = findByIdPrimaryOpts;

  /**
   *
   * @param {number} nameId
   * @returns {Promise}
   */
  function findByModelIdOpts(addressId) {
    return Promise.try(() => {
      return {
        where: {
          addressId,
        },
        rejectOnEmpty: true,
      };
    });
  }
  module.exports.findByModelIdOpts = findByModelIdOpts;

  /**
   *
   * @param {number} nameId
   * @param {number} id
   * @returns {Promise}
   */
  function findByBothIdsOpts(addressId, id) {
    return Promise.try(() => {
      return {
        where: {
          addressId,
          id,
        },
        rejectOnEmpty: true,
      };
    });
  }
  module.exports.findByBothIdsOpts = findByBothIdsOpts;

  return module.exports;
}
module.exports = createMapper;
