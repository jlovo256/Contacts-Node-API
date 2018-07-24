'use strict';

/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path').toString();

const logger = require(path.join(appRoot, 'src/infrastructure/logging'));
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const db = {};

// check if there is a config file
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(appRoot, 'config/database'))[env];

// don't output to console if tests are being done
const log = (process.env.NODE_ENV === 'development') ? logger.debug.bind(logger) : false;

if (config) {
  // get the config from the appros env in the database config file
  const {
    host,
    port,
    dialect,
    username,
    password,
    database,
  } = config;

  // connect to the database
  const sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect,
    logging: log,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },

    typeValidation: true,
    operatorsAliases: false,
  });

  // authenticate connection
  sequelize
    .authenticate()
    .then(() => {
      if (process.env.NODE_ENV === 'development') {
        logger.info(`Connection has been established successfully with ${database}.`);
      }
    })
    .catch((err) => {
      if (process.env.NODE_ENV === 'development') {
        logger.error(`Unable to connect to the database: ${err}`);
      }
    });

  // load the model files
  fs
    .readdirSync(__dirname)
    /* eslint-disable arrow-body-style */
    .filter((file) => {
      return ((file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'));
    })
    /* eslint-enable arrow-body-style */
    .forEach((file) => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });

  // associate the models using the stored model names
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  db.sequelize = sequelize;
  module.exports = db;
} else {
  logger.error('No database config file.');
}
