'use strict';

const path = require('path');
const appRoot = require('app-root-path').toString();

const FactoryGirl = require('factory-girl');
const factory = FactoryGirl.factory;
const adapter = new FactoryGirl.SequelizeAdapter();
const models = require(path.join(appRoot, 'api/models'));

module.exports.entryFactory = require('./entry-factory')(factory, models);
module.exports.nameFactory = require('./name-factory')(factory, models);
module.exports.addressFactory = require('./address-factory')(factory, models);
