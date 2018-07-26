'use strict';

const EntitySuperClass = require('./EntitySuperClass');

/**
 * Creates a new Entry
 * @namespace Entry
 * @class Entry
 * @param {number} id
 * @param {number} entryId
 * @param {Array} Names
 * @param {Array} Addresses
 * @returns {Entry}
 * */
class Entry extends EntitySuperClass {
  constructor(id, contactId, createdAt, updatedAt, Names, Addresses) {
    super(id, {
      contactId,
      createdAt,
      updatedAt,
      Names,
      Addresses,
    });
    this.nameSingular = 'Entry';
    this.namePlural = 'Entries';
  }
}
module.exports = Entry;
