'use strict';

const path = require('path');
const appRoot = require('app-root-path').toString();

const _ = require('lodash');

const logger = require(path.join(appRoot, 'src/infrastructure/logging'));

const {
  generateRandomID,
} = require('../utils/generateNum');

const {
  ContactRepo,
  NameRepo,
  AddressRepo,
} = require(path.join(appRoot, 'src/infrastructure/repositories/index.js'));

function EntryFactory(body) {
  let names;
  let addresses;

  if (body.Names) {
    names = body.Names;
    names[0].primary = true;
  }
  if (body.Addresses) {
    addresses = body.Addresses;
    addresses[0].primary = true;
  }

  // for creating the contact to send back
  let contact = {};
  const id = generateRandomID();

  return ContactRepo.addOne(id)
    .then((entry) => {
      // there is probably a cleaner way to do this
      contact = entry;

      return Promise.all(_.map(names, (name) => {
        return NameRepo.addOne(name, id)
          .catch((err) => {
            logger.error(err);
            throw new Error(err);
          });
      }));
    })
    .then((namesSet) => {
      // find a better way
      contact.dataValues.Names = namesSet;

      return Promise.all(_.map(addresses, (address) => {
        return AddressRepo.addOne(address, id)
          .catch((err) => {
            logger.error(err);
            throw new Error(err);
          });
      }));
    })
    .then((addressesSet) => {
      // find a better way
      contact.dataValues.Addresses = addressesSet;
      // URI locattion header
      return contact;
    })
    .catch((err) => {
      logger.error(err);
      return err;
    });
}
module.exports = EntryFactory;
