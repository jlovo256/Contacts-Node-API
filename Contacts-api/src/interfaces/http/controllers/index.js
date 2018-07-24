'use strict';

const path = require('path');
const appRoot = require('app-root-path').toString();
const Repos = require(path.join(appRoot, 'src/infrastructure/repositories/index.js'));

// connect models to controllers, export controllers
module.exports = {
  ContactController: require('./contactController'),
  EntryController: require('./entryController')(Repos.EntryRepo, Repos.NameRepo, Repos.AddressRepo),
  NameController: require('./nameController')(Repos.NameRepo),
  AddressController: require('./addressController')(Repos.AddressRepo),
};
