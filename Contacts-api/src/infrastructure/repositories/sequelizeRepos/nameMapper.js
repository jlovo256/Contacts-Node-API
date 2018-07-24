'use strict';

const path = require('path');
const appRoot = require('app-root-path').toString();
const Promise = require('bluebird');
const Name = require(path.join(appRoot, 'src/domain/Contacts/entities/Name'));

/**
 * Takes dataValues of a Sequelize object and converts them into a Name object
 *
 * @param {Promise} Address
 */
function toEntity({ dataValues }) {
  const {
    id,
    nameId,
    primary,
    honorific,
    firstName,
    middleName,
    lastName,
    created_at, /* eslint-disable-line camelcase */
    updated_at, /* eslint-disable-line camelcase */
  } = dataValues;

  return Promise.try(() => {
    return new Name(
      id,
      nameId,
      primary,
      honorific,
      firstName,
      middleName,
      lastName,
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
    honorific,
    firstName,
    middleName,
    lastName,
  } = body;

  return Promise.try(() => {
    return {
      id,
      primary: (primary || false),
      honorific: (honorific || null),
      firstName: (firstName || null),
      middleName: (middleName || null),
      lastName: (lastName || null),
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
function findByModelIdOpts(nameId) {
  return Promise.try(() => {
    return {
      where: {
        nameId,
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
function findByBothIdsOpts(nameId, id) {
  return Promise.try(() => {
    return {
      where: {
        nameId,
        id,
      },
      rejectOnEmpty: true,
    };
  });
}
module.exports.findByBothIdsOpts = findByBothIdsOpts;
