'use strict';

const path = require('path');
const appRoot = require('app-root-path').toString();
// view
const { view } = require(path.join(appRoot, 'src/interfaces/http/views/view'));

/**
 * @module NamesController
 *
 * @param {Function} Name
 * @returns module.exports
 */
module.exports = (Name) => {
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
  module.exports.publicParams = publicParams;

  /**
   * Middleware that needs model/repo access
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   * @param {string} nameId
   * @returns {Function} next
   */
  function validateNameId(req, res, next, nameId) {
    return Name.getByModelId(nameId)
      .then((name) => {
        if (name instanceof Error) {
          throw new Error('invalid name');
        }
        req.name = {
          nameId: name.get('nameId'),
          id: name.id,
        };
        return next();
      })
      .catch((err) => {
        /* eslint-disable-next-line no-param-reassign */
        err.status = 404;
        return next(err);
      });
  }
  module.exports.validateNameId = validateNameId;

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Function} view
   */
  function createName(req, res) {
    return Name.addOne(req.body, req.entry.id)
      .then((results) => {
        // URI locattion header
        res.location(`/api/v1.0/contacts/${req.entry.contactId}/names/${results.dataValues.nameId}`);
        view(req, res, results, 201);
      })
      .catch(err => view(req, res, err.message, 400));
  }
  module.exports.createName = createName;

  /**
   * TODO/NOTE: Don't want 404 error for no names in an entry
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Function} view
   */
  function retrieveNames(req, res) {
    return Name.getAllById(req.entry.id)
      .then(results => view(req, res, results, 200))
      .catch(err => view(req, res, err.message, 404));
  }
  module.exports.retrieveNames = retrieveNames;

  /**
   * 404 if returns null
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Function} view
   */
  function retrieveName(req, res) {
    return Name.getByIds(req.name.nameId, req.entry.id)
      .then(results => view(req, res, results, 200))
      .catch(err => view(req, res, err.message, 404));
  }
  module.exports.retrieveName = retrieveName;

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Function} view
   */
  function updateName(req, res) {
    return Name.updateOne(req.body, req.name.nameId, req.entry.id)
      .then((rowsAffected) => {
        // sequelize api returns only number of rows affected, so
        // the params must be used to return updated object
        // TODO change to rejectOnEmpty: true if available for update
        // Compare with mongoose, to see if mongoose can return object updated
        if (rowsAffected[0] === 0) {
          throw new Error('Nice try');
        }
        return Name.getByIds(req.name.nameId, req.entry.id);
      })
      .then(results => view(req, res, results, 200))
      .catch(err => view(req, res, err.message, 400));
  }
  module.exports.updateName = updateName;

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Function} view
   */
  function deleteName(req, res) {
    return Name.deleteOne(req.name.nameId)
      .then(() => res.sendStatus(204))
      .catch(err => view(req, res, err.message, 404));
  }
  module.exports.deleteName = deleteName;

  return module.exports;
};
