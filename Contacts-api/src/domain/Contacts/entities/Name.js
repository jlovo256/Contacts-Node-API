'use strict';

const EntitySuperClass = require('./EntitySuperClass');

/**
 * Creates a new Name
 * @namespace Name
 * @class Name
 * @param {number} id
 * @param {Object} dataValues
 * @returns {Name}
 * */
class Name extends EntitySuperClass {
  constructor(id,
    nameId,
    primary,
    honorific,
    firstName,
    middleName,
    lastName,
    createdAt,
    updatedAt) {
    super(id, {
      nameId,
      primary,
      honorific,
      firstName,
      middleName,
      lastName,
      createdAt,
      updatedAt,
    });
    this.nameSingular = 'Name';
    this.namePlural = 'Names';
  }
}
module.exports = Name;
