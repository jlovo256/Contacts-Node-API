'use strict';

/*
 * This file is redundant with app.js, because mocha needs the server,
 * and app currently does not return the server
 * will think about reworking this
 */
const path = require('path');
const appRoot = require('app-root-path').toString();
// files needed for server
const config = require(path.join(appRoot, 'config'));
const logger = require(path.join(appRoot, 'src/infrastructure/logging'));

/*
 * SETUP DOMAINS
 */
const Address = require(path.join(appRoot, 'src/domain/Contacts/entities/Address'));
const Name = require(path.join(appRoot, 'src/domain/Contacts/entities/Name'));
const Contact = require(path.join(appRoot, 'src/domain/Contacts/entities/Contact'));


/*
 * SETUP INFRASTRUCTURE
 * currently setup for mysql database and sequelize orm
 */
// database
const db = require(path.join(appRoot, 'src/infrastructure/sequelize/models'));

// repositories
// mysql ORM
// mappers
const addressMapper = require(path.join(appRoot, 'src/infrastructure/repositories/sequelizeRepos/addressMapper'))(Address);
const nameMapper = require(path.join(appRoot, 'src/infrastructure/repositories/sequelizeRepos/nameMapper'))(Name);
const contactMapper = require(path.join(appRoot, 'src/infrastructure/repositories/sequelizeRepos/contactMapper'))(Contact);
// repository
const Respository = require(path.join(appRoot, 'src/infrastructure/repositories/sequelizeRepos/repository'));
// the api address is contacts, but the database table is Entry
const AddressRepo = new Respository(db.Address, addressMapper);
const NameRepo = new Respository(db.Name, nameMapper);
const ContactRepo = new Respository(db.Entry, contactMapper);


// setup controllers, which use repositories
const addressController = require(path.join(appRoot, 'src/interfaces/http/controllers/addressController'))(AddressRepo);
const nameController = require(path.join(appRoot, 'src/interfaces/http/controllers/nameController'))(NameRepo);
const contactController = require(path.join(appRoot, 'src/interfaces/http/controllers/contactController'))(ContactRepo);
const helloController = require(path.join(appRoot, 'src/interfaces/http/controllers'));

// routers
const addressRouter = require(path.join(appRoot, 'src/interfaces/http/routers/addressRouter'))(addressController);
const nameRouter = require(path.join(appRoot, 'src/interfaces/http/routers/nameRouter'))(nameController);
const contactRouter = require(path.join(appRoot, 'src/interfaces/http/routers/contactRouter'))(contactController, nameRouter, addressRouter);
const apiRouter = require(path.join(appRoot, 'src/interfaces/http/routers/index'))(helloController, contactRouter);
const router = require(path.join(appRoot, 'src/interfaces/http/router'))(logger, helloController, apiRouter);
// server
const Server = require(path.join(appRoot, 'src/interfaces/http/Server'));

// testers
const chai = require('chai'); /* eslint-disable-line import/order */
chai.use(require('chai-http')); // middleware for testing server
chai.use(require('chai-things')); // middleware for testing arrays

const { expect } = chai;

const server = new Server({
  config,
  logger,
  router,
});

/* eslint-disable */
server.start()
  .catch((err) => {
    console.error(`Could not start server: ${err}`);
  });

describe('Contact API Tester', function () {
  require('./routes/routes')(server.express, chai, expect);
  require('./routes/contactRoutes')(server.express, chai, expect);
  require('./routes/nameRoutes')(server.express, chai, expect);
  require('./routes/addressRoutes')(server.express, chai, expect);
});
/* eslint-enable */
