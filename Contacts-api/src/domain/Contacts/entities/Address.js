'use strict';

const EntitySuperClass = require('./EntitySuperClass');

/**
 * Creates a new Address
 * @namespace Address
 * @class Address
 * @param {number} id
 * @param {Object} dataValues
 * @returns {Address}
 * */
class Address extends EntitySuperClass {
  constructor(id,
    addressId,
    primary,
    addressL1,
    addressL2,
    city,
    state,
    zipcode,
    country,
    createdAt,
    updatedAt) {
    super(id, {
      addressId,
      primary,
      addressL1,
      addressL2,
      city,
      state,
      zipcode,
      country,
      createdAt,
      updatedAt,
    });
    this.nameSingular = 'Address';
    this.namePlural = 'Addresses';
  }
}
module.exports = Address;
