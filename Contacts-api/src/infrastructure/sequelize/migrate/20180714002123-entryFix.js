'use strict';

/* eslint-disable no-unused-vars, no-console */

// sequelize doesn't support certain things so, I need to get the db name from
// the config
const path = require('path');
const appRoot = require('app-root-path').toString();

const env = process.env.NODE_ENV || 'development';

const config = require(path.join(appRoot, 'config/database'))[env];

let database;
if (config) {
  /* eslint-disable-next-line prefer-destructuring */
  database = config.database;
} else {
  console.error('No database config file.');
}

module.exports = {
  up: ((queryInterface, Sequelize) => {
    // sequelize won't supoort this? form a brute squad then
    queryInterface.sequelize.query(`ALTER TABLE\`${database}\`.\`Entries\`DROP PRIMARY KEY,ADD PRIMARY KEY(\`entry_id\`)`);
  }),
  down: ((queryInterface, Sequelize) => {
    queryInterface.sequelize.query(`ALTER TABLE\`${database}\`.\`Entries\`DROP PRIMARY KEY,ADD PRIMARY KEY(\`front_id\`)`);
  }),
};
