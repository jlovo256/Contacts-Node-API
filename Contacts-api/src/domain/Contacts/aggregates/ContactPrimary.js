'use strict';

const path = require('path');
const appRoot = require('app-root-path').toString();

const logger = require(path.join(appRoot, 'src/infrastructure/logging'));

const {
  ContactRepo,
  NameRepo,
  AddressRepo,
} = require(path.join(appRoot, 'src/infrastructure/repositories/index.js'));

function getContactFromDatabase(contactId) {
  // for creating the contact to send back
  let contact = {};
  return ContactRepo.getByModelId(contactId)
    .then((entry) => {
      contact = entry;
      return NameRepo.getPrimaryById(contact.id);
    })
    .then((names) => {
      contact.dataValues.Names = names;
      return AddressRepo.getPrimaryById(contact.id);
    })
    .then((addresses) => {
      contact.dataValues.Addresses = addresses;
      return contact;
    })
    .catch((err) => {
      logger.error(err);
      return err;
    });
}
module.exports = getContactFromDatabase;
