'use strict';

const Promise = require('bluebird');

function createMapper(Contact) {
  /**
 * Takes dataValues of a Sequelize object and converts them into an Contact object
 * contact is the api route, but the table is entry in the db
 * @param {Promise} Contact
 */
  function toEntity({ dataValues }) {
    const {
      id,
      entryId,
      created_at, /* eslint-disable-line camelcase */
      updated_at, /* eslint-disable-line camelcase */
    } = dataValues;

    const Names = [];
    const Addresses = [];

    return Promise.try(() => {
      return new Contact(
        id,
        entryId,
        created_at,
        updated_at,
        Names,
        Addresses,
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
  function toDatabase(id) {
    return Promise.try(() => {
      return {
        id,
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
   * contact is the api route, but the table is entry in the db
   * @param {number} nameId
   * @returns {Promise}
   */
  function findByModelIdOpts(contactId) {
    return Promise.try(() => {
      return {
        where: {
          entryId: contactId,
        },
        rejectOnEmpty: true,
      };
    });
  }
  module.exports.findByModelIdOpts = findByModelIdOpts;

  /**
   * contact is the api route, but the table is entry in the db
   * @param {number} ContactId
   * @param {number} id
   * @returns {Promise}
   */
  function findByBothIdsOpts(contactId, id) {
    return Promise.try(() => {
      return {
        where: {
          entryId: contactId,
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
