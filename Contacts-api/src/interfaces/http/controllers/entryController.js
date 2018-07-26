'use strict';

const path = require('path');
const appRoot = require('app-root-path').toString();
const _ = require('lodash');
const Promise = require('bluebird');
// view
const { view } = require(path.join(appRoot, 'src/interfaces/http/views/view'));
// util
const {
  generateRandomID,
} = require(path.join(appRoot, 'src/domain/Contacts/utils/generateNum'));

/**
 * @module EntryController
 *
 * @param {Function} Entries
 * @param {Function} Names
 * @param {Function} Addresses
 * @returns module.exports
 */
module.exports = (Entry, Name, Address) => {
  /**
   * Use by validators
   * @type {Array}
   * */
  const publicParams = [
    'names',
    'addresses',
  ];
  module.exports.publicParams = publicParams;

  /**
   * Use by validators
   * @type {Array}
   * */
  const publicParamsNames = [
    'honorific',
    'firstName',
    'middleName',
    'lastName',
    'primary',
  ];
  module.exports.publicParamsNames = publicParamsNames;

  /**
   * Use by validators
   * @type {Array}
   * */
  const publicParamsAddresses = [
    'primary',
    'addressL1',
    'addressL2',
    'city',
    'state',
    'zipcode',
    'country',
  ];
  module.exports.publicParamsAddresses = publicParamsAddresses;

  /**
   * Middleware that needs model/repo access
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   * @param {string} entryId
   * @returns {Function} next
   */
  function validateEntryId(req, res, next, contactId) {
    return Entry.getByModelId(contactId)
      .then((entry) => {
        if (entry instanceof Error) {
          throw new Error('invalid entry');
        }
        req.entry = {
          contactId: entry.get('contactId'),
          id: entry.id,
        };
        return next();
      })
      .catch((err) => {
        /* eslint-disable-next-line no-param-reassign */
        err.status = 404;
        return next(err);
      });
  }
  module.exports.validateEntryId = validateEntryId;

  /**
 * Creates one entry and then returns the created entry
 * @param {Request} req
 * @param {Response} res
 * @return {Function} view
 */
  function createEntry(req, res) {
    // hacky
    let names;
    let addresses;

    if (req.body.Names) {
      names = req.body.Names;
      names[0].primary = true;
    }
    if (req.body.Addresses) {
      addresses = req.body.Addresses;
      addresses[0].primary = true;
    }

    // for creating the contact to send back
    let contact = {};

    const id = generateRandomID();
    return Entry.addOne(id)
      .then((entry) => {
        // there is probably a cleaner way to do this
        contact = entry;

        return Promise.all(_.map(names, (name) => {
          return Name.addOne(name, id)
            .catch((err) => {
              throw new Error(err);
            });
        }));
      })
      .then((namesSet) => {
        // find a better way
        contact.dataValues.Names = namesSet;

        return Promise.all(_.map(addresses, (address) => {
          return Address.addOne(address, id)
            .catch((err) => {
              throw new Error(err);
            });
        }));
      })
      .then((addressesSet) => {
        // find a better way
        contact.dataValues.Addresses = addressesSet;
        // URI locattion header
        res.location(`/api/v1.0/contacts/${contact.dataValues.contactId}`);
        return view(req, res, contact, 201);
      })
      .catch(err => view(req, res, err.message, 400));
  }
  module.exports.createEntry = createEntry;

  /**
   * // TODO Probably want to handle a theorectical big DB at some point
   *
   * Returns all the entries in the database with their default names and addresses
   * @param {Request} req
   * @param {Response} res
   * @returns {Function} view
   */
  function retrieveAll(req, res) {
    // for creating the contact to send back
    let contacts = {};

    return Entry.getAll()
      .then((entries) => {
        if (!entries) {
          return [];
        }

        // better way
        contacts = entries;

        return Promise.all(_.map(contacts, (entry) => {
          return Name.getAllById(entry.id)
            .then((names) => {
              entry.dataValues.Names = names;
            })
            .catch((err) => {
              throw new Error(err);
            });
        }));
      })
      .then(() => {
        return Promise.all(_.map(contacts, (entry) => {
          return Address.getAllById(entry.id)
            .then((addresses) => {
              entry.dataValues.Addresses = addresses;
            })
            .catch((err) => {
              throw new Error(err);
            });
        }));
      })
      .then(() => view(req, res, contacts, 200))
      .catch(err => view(req, res, err.message, 404));
  }
  module.exports.retrieveAll = retrieveAll;

  /**
  * Retrieves all names and addresses associated with a particular entry
  * @param {Request} req
  * @param {Response} res
  * @returns {Function} view
  */
  function retrieveEntry(req, res) {
    // for creating the contact to send back
    let contact = {};

    return Entry.getByModelId(req.entry.contactId)
      .then((entry) => {
        contact = entry;
        return Name.getAllById(entry.id);
      })
      .then((names) => {
        contact.dataValues.Names = names;

        return Address.getAllById(contact.id);
      })
      .then((addresses) => {
        contact.dataValues.Addresses = addresses;
        return view(req, res, contact, 200);
      })
      .catch(err => view(req, res, err.message, 404));
  }
  module.exports.retrieveEntry = retrieveEntry;

  /**
   * TODO: Returns primary name and address for the entry
   * Allow only one default
   *
   * Returns an entry with default value for names and addresses
   * @param {Request} req
   * @param {Response} res
   * @return {Function} view
   */
  function retrieveEntryPrimary(req, res) {
    // for creating the contact to send back
    let contact = {};
    return Entry.getByModelId(req.entry.contactId)
      .then((entry) => {
        contact = entry;
        return Name.getPrimaryById(req.entry.id);
      })
      .then((names) => {
        contact.dataValues.Names = names;
        return Address.getPrimaryById(req.entry.id);
      })
      .then((addresses) => {
        contact.dataValues.Addresses = addresses;
        return view(req, res, contact, 200);
      })
      .catch(err => view(req, res, err.message, 404));
  }
  module.exports.retrieveEntryPrimary = retrieveEntryPrimary;

  /**
   * Deletes an entry and all associated names and addresses
   * @param {Request} req
   * @param {Response} res
   * @returns {Function} view
   */
  function deleteEntry(req, res) {
    return Entry.deleteOne(req.entry.contactId)
      .then(() => res.sendStatus(204))
      .catch(err => view(req, res, err.message, 404));
  }
  module.exports.deleteEntry = deleteEntry;

  return module.exports;
};
