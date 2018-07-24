'use strict';

const path = require('path');
const appRoot = require('app-root-path').toString();

const Promise = require('bluebird');
const logger = require(path.join(appRoot, 'src/infrastructure/logging'));

/**
 * @namespace Respository
 * @class Respository
 * @returns {Respository}
 * */
class Respository {
  constructor(Model, {
    toEntity,
    toDatabase,
    findByIdOpts,
    findByIdPrimaryOpts,
    findByModelIdOpts,
    findByBothIdsOpts,
  }) {
    this.Model = Model;
    this.toEntity = toEntity;
    this.toDatabase = toDatabase;
    this.findByIdOpts = findByIdOpts;
    this.findByIdPrimaryOpts = findByIdPrimaryOpts;
    this.findByModelIdOpts = findByModelIdOpts;
    this.findByBothIdsOpts = findByBothIdsOpts;
  }

  addOne(body, id) {
    return this.toDatabase(body, id)
      .then(sequelObj => this.Model.create(sequelObj))
      .then(sequelObject => this.toEntity(sequelObject))
      .then(result => result)
      .catch((err) => {
        logger.warn(err);
        return err;
      });
  }

  getAll() {
    return this.Model.findAll()
      .then(sequelArray => Promise.all(sequelArray.map(this.toEntity)))
      .then(result => result)
      .catch(err => err);
  }

  getAllById(id) {
    return this.findByIdOpts(id)
      .then(optionsObj => this.Model.findAll(optionsObj))
      .then(sequelArray => Promise.all(sequelArray.map(this.toEntity)))
      .then(result => result)
      .catch((err) => {
        logger.warn(err);
        return err;
      });
  }

  getPrimaryById(id) {
    return this.findByIdPrimaryOpts(id)
      .then(optionsObj => this.Model.findAll(optionsObj))
      .then(sequelArray => Promise.all(sequelArray.map(this.toEntity)))
      .then(result => result)
      .catch((err) => {
        logger.warn(err);
        return err;
      });
  }

  getByIds(entityId, id) {
    return this.findByBothIdsOpts(entityId, id)
      .then(nameSQL => this.Model.findOne(nameSQL))
      .then(sequelObject => this.toEntity(sequelObject))
      .then(result => result)
      .catch((err) => {
        logger.warn(err);
        return err;
      });
  }

  getByModelId(entityId) {
    return this.findByModelIdOpts(entityId)
      .then(optionsObj => this.Model.findOne(optionsObj))
      .then(sequelObject => this.toEntity(sequelObject))
      .then(result => result)
      .catch((err) => {
        logger.warn(err);
        return err;
      });
  }

  updateOne(body, entityId, id) {
    let optsObj = {};
    return this.findByModelIdOpts(entityId)
      .then((opts) => {
        optsObj = opts;
        return this.toDatabase(body, id);
      })
      .then(sequelObj => this.Model.update(sequelObj, optsObj))
      .then(result => result)
      .catch((err) => {
        logger.warn(err);
        return err;
      });
  }

  deleteOne(entityId) {
    return this.findByModelIdOpts(entityId)
      .then(optsObj => this.Model.destroy(optsObj))
      .then(result => result)
      .catch((err) => {
        logger.warn(err);
        return err;
      });
  }
}
module.exports = Respository;
