'use strict';

const path = require('path');
const appRoot = require('app-root-path').toString();

const logger = require(path.join(appRoot, 'src/infrastructure/logging'));

if (process.env.DB_DIALECT === 'mysql') {
  // mysql ORM
  /* eslint-disable global-require */
  // mappers
  const nameMapper = require('./sequelizeRepos/nameMapper');
  const addressMapper = require('./sequelizeRepos/addressMapper');
  const contactMapper = require('./sequelizeRepos/contactMapper');
  // database
  const db = require(path.join(appRoot, 'src/infrastructure/sequelize/models/index'));
  // repository
  const Respository = require('./sequelizeRepos/repository');
  // the api address is contacts, but the database table is Entry
  module.exports.ContactRepo = new Respository(db.Entry, contactMapper);
  module.exports.NameRepo = new Respository(db.Name, nameMapper);
  module.exports.AddressRepo = new Respository(db.Address, addressMapper);
  /* eslint-enable global-require */
} else {
  /* eslint-disable no-alert, no-console */
  logger.error('No database dialect in env.');
  /* eslint-enable no-alert, no-console */
}
