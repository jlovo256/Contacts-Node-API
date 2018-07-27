'use strict';

const path = require('path');
const appRoot = require('app-root-path').toString();
// view
const { view } = require(path.join(appRoot, 'src/interfaces/http/views/view'));

// entryFactory
const contactFactory = require(path.join(appRoot, 'src/domain/Contacts/factories/ContactFactory'));
// aggregate Contacts
const getContacts = require(path.join(appRoot, 'src/domain/Contacts/aggregates/ContactsAll'));
const getContact = require(path.join(appRoot, 'src/domain/Contacts/aggregates/Contact'));
const getContactPrimary = require(path.join(appRoot, 'src/domain/Contacts/aggregates/ContactPrimary'));

/**
 * @module EntryController
 *
 * @param {Function} Entries
 * @param {Function} Names
 * @param {Function} Addresses
 * @returns module.exports
 */
module.exports = (Contact) => {
  /**
   * Middleware that needs model/repo access
   *
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   * @param {string} entryId
   * @returns {Function} next
   */
  function validateContactId(req, res, next, contactId) {
    return Contact.getByModelId(contactId)
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
  module.exports.validateContactId = validateContactId;

  /**
 * Creates one entry and then returns the created entry
 * @param {Request} req
 * @param {Response} res
 * @return {Function} view
 */
  function createContact(req, res) {
    return contactFactory(req.body)
      .then((contact) => {
        if (contact instanceof Error) {
          throw new Error('invalid entry');
        }
        // URI locattion header
        res.location(`/api/v1.0/contacts/${contact.dataValues.contactId}`);
        return view(req, res, contact, 201);
      })
      .catch(err => view(req, res, err.message, 400));
  }
  module.exports.createContact = createContact;

  /**
   * // TODO Probably want to handle a theorectical big DB at some point
   *
   * Returns all the entries in the database with their default names and addresses
   * @param {Request} req
   * @param {Response} res
   * @returns {Function} view
   */
  function retrieveAll(req, res) {
    return getContacts()
      .then((contacts) => {
        if (contacts instanceof Error) {
          throw new Error('error retrieving contacts');
        }
        return view(req, res, contacts, 200);
      })
      .catch(err => view(req, res, err.message, 404));
  }
  module.exports.retrieveAll = retrieveAll;

  /**
  * Retrieves all names and addresses associated with a particular entry
  * @param {Request} req
  * @param {Response} res
  * @returns {Function} view
  */
  function retrieveContact(req, res) {
    return getContact(req.entry.contactId)
      .then((contact) => {
        if (contact instanceof Error) {
          throw new Error('error retrieving contact');
        }
        return view(req, res, contact, 200);
      })
      .catch(err => view(req, res, err.message, 404));
  }
  module.exports.retrieveContact = retrieveContact;

  /**
   * TODO: Returns primary name and address for the entry
   * Allow only one default
   *
   * Returns an entry with default value for names and addresses
   * @param {Request} req
   * @param {Response} res
   * @return {Function} view
   */
  function retrieveContactPrimary(req, res) {
    return getContactPrimary(req.entry.contactId)
      .then((contact) => {
        if (contact instanceof Error) {
          throw new Error('error retrieving contact');
        }
        return view(req, res, contact, 200);
      })
      .catch(err => view(req, res, err.message, 404));
  }
  module.exports.retrieveContactPrimary = retrieveContactPrimary;

  /**
   * Deletes an entry and all associated names and addresses
   * @param {Request} req
   * @param {Response} res
   * @returns {Function} view
   */
  function deleteContact(req, res) {
    return Contact.deleteOne(req.entry.contactId)
      .then(() => res.sendStatus(204))
      .catch(err => view(req, res, err.message, 404));
  }
  module.exports.deleteContact = deleteContact;

  return module.exports;
};
