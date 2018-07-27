'use strict';

const path = require('path');
const appRoot = require('app-root-path').toString();

const _ = require('lodash');

const logger = require(path.join(appRoot, 'src/infrastructure/logging'));

const {
  ContactRepo,
  NameRepo,
  AddressRepo,
} = require(path.join(appRoot, 'src/infrastructure/repositories/index.js'));

function getAllContactsFromDatabase() {
  // for creating the contact to send back
  let contacts = {};

  return ContactRepo.getAll()
    .then((entries) => {
      if (!entries) {
        return [];
      }

      // better way
      contacts = entries;

      return Promise.all(_.map(contacts, (entry) => {
        return NameRepo.getAllById(entry.id)
          .then((names) => {
            entry.dataValues.Names = names;
          })
          .catch((err) => {
            logger.error(err);
            throw new Error(err);
          });
      }));
    })
    .then(() => {
      return Promise.all(_.map(contacts, (entry) => {
        return AddressRepo.getAllById(entry.id)
          .then((addresses) => {
            entry.dataValues.Addresses = addresses;
          })
          .catch((err) => {
            logger.error(err);
            throw new Error(err);
          });
      }));
    })
    .then(() => contacts)
    .catch((err) => {
      logger.error(err);
      return err;
    });
}
module.exports = getAllContactsFromDatabase;
