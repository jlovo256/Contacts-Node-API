'use strict';

const path = require('path');
const appRoot = require('app-root-path').toString();

// check environment
const env = process.env.NODE_ENV || 'development';
// load configuration
const config = require(path.join(appRoot, 'config'));
const configDb = require(path.join(appRoot, 'config/database'))[env];
// load logger
const logger = require('./infrastructure/logging');

// check for neededconfig files
if (!config) {
  logger.error('No config file.');
}
if (!configDb) {
  logger.error('No database config file.');
}
if (!(process.env.DB_DIALECT === 'mysql')) {
  logger.error('Contacts-api repositories only setup for mysql.');
}

/*
 * SETUP DOMAINS
 */
const Address = require('./domain/Contacts/entities/Address');
const Name = require('./domain/Contacts/entities/Name');
const Contact = require('./domain/Contacts/entities/Contact');


/*
 * SETUP INFRASTRUCTURE
 * currently setup for mysql database and sequelize orm
 */
// database
const db = require('./infrastructure/sequelize/models');

// repositories
// mysql ORM
// mappers
const addressMapper = require('./infrastructure/repositories/sequelizeRepos/addressMapper')(Address);
const nameMapper = require('./infrastructure/repositories/sequelizeRepos/nameMapper')(Name);
const contactMapper = require('./infrastructure/repositories/sequelizeRepos/contactMapper')(Contact);
// repository
const Respository = require('./infrastructure/repositories/sequelizeRepos/repository');
// the api address is contacts, but the database table is Entry
const AddressRepo = new Respository(db.Address, addressMapper);
const NameRepo = new Respository(db.Name, nameMapper);
const ContactRepo = new Respository(db.Entry, contactMapper);


/*
 * SETUP INTERFACE
 * http
 * All these things use ExpressJs
 */
// setup controllers, which use repositories
const addressController = require('./interfaces/http/controllers/addressController')(AddressRepo);
const nameController = require('./interfaces/http/controllers/nameController')(NameRepo);
const contactController = require('./interfaces/http/controllers/contactController')(ContactRepo);
const helloController = require('./interfaces/http/controllers');

// setup routers
// sub-routers
const addressRouter = require('./interfaces/http/routers/addressRouter')(addressController);
const nameRouter = require('./interfaces/http/routers/nameRouter')(nameController);
const contactRouter = require('./interfaces/http/routers/contactRouter')(contactController, nameRouter, addressRouter);
const apiRouter = require('./interfaces/http/routers/index')(helloController, contactRouter);
// main router
const router = require('./interfaces/http/router')(logger, helloController, apiRouter);

// Load the http server (ExpressJS)
require('./interfaces/http')(config, router, logger);
