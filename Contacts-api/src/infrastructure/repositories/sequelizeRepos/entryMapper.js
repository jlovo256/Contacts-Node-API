'use strict';

const path = require('path');
const appRoot = require('app-root-path').toString();
const Promise = require('bluebird');
const Entry = require(path.join(appRoot, 'src/domain/Contacts/entities/Entry'));

/**
 * Takes dataValues of a Sequelize object and converts them into an Entry object
 *
 * @param {Promise} Address
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
    return new Entry(
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
function findByModelIdOpts(entryId) {
  return Promise.try(() => {
    return {
      where: {
        entryId,
      },
      rejectOnEmpty: true,
    };
  });
}
module.exports.findByModelIdOpts = findByModelIdOpts;

/**
 *
 * @param {number} entryId
 * @param {number} id
 * @returns {Promise}
 */
function findByBothIdsOpts(entryId, id) {
  return Promise.try(() => {
    return {
      where: {
        entryId,
        id,
      },
      rejectOnEmpty: true,
    };
  });
}
module.exports.findByBothIdsOpts = findByBothIdsOpts;
