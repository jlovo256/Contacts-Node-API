'use strict';

const path = require('path');
const appRoot = require('app-root-path').toString();
// view
const { view } = require(path.join(appRoot, 'src/interfaces/http/views/view'));

/**
 * @module Controller
 *
 * @param {Function} Address
 * @returns module.exports
 */
class Controller {
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @returns {Function} view
   */
  createObject(req, res) {
    return this.repository.addOne(req.body, req.contact.id)
      .then((results) => {
        if (results instanceof Error) {
          throw new Error('error creating entry');
        }
        // URI locattion header
        res.location(results.uriString);
        return view(req, res, results, 201);
      })
      .catch(err => view(req, res, err.message, 400));
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Function}
   */
  retrieveAllObjects(req, res) {
    return this.repository.getAllById(req.contact.id)
      .then((results) => {
        if (results instanceof Error) {
          throw new Error('error retrieving entries');
        }
        // URI locattion header
        res.location(results.uriString);
        return view(req, res, results, 200);
      })
      .catch(err => view(req, res, err.message, 404));
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Function}
   */
  retrieveObject(req, res) {
    return this.repository.getByIds(req.entity.addressId, req.entry.id)
      .then((results) => {
        if (results instanceof Error) {
          throw new Error('error retrieving entry');
        }
        // URI locattion header
        res.location(results.uriString);
        return view(req, res, results, 200);
      })
      .catch(err => view(req, res, err.message, 404));
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Function}
   */
  updateObject(req, res) {
    return this.repository.updateOne(req.body, req.address.addressId, req.entry.id)
      .then((rowsAffected) => {
        // sequelize api returns only number of rows affected, so
        // the params must be used to return updated object
        if (rowsAffected[0] === 0) {
          throw new Error('Nice try');
        }
        return this.repository.getByIds(req.address.addressId, req.entry.id);
      })
      .then((results) => {
        if (results instanceof Error) {
          throw new Error('error retrieving entry');
        }
        // URI locattion header
        res.location(results.uriString);
        return view(req, res, results, 200);
      })
      .catch(err => view(req, res, err.message, 400));
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Function}
   */
  deleteObject(req, res) {
    return this.repository.deleteOne(req.address.addressId)
      .then(() => res.sendStatus(204))
      .catch(err => view(req, res, err.message, 404));
  }
}
module.exports = Controller;
