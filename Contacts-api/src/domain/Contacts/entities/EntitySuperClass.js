'use strict';

/**
 * Creates a new EntitySuperClass which is an object with dataValues,
 * with an overridden toJSON method, which only returns the dataValues,
 * inspired by Sequelize
 * meant to be used as a superclass for domain entities
 * @namespace EntitySuperClass
 * @class EntitySuperClass
 * @param {number} id
 * @param {Object} dataValues
@returns {EntitySuperClass}
 */
class EntitySuperClass {
  constructor(id, dataValues) {
    this.id = id;
    this.dataValues = dataValues;
  }

  set(key, value) {
    this.dataValues[key] = value;
    return this;
  }

  get(key) {
    if (key) {
      return this.dataValues[key];
    }
    return this.dataValues;
  }

  toJSON() {
    return this.get();
  }
}
module.exports = EntitySuperClass;
