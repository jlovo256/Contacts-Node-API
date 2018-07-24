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
  up: (queryInterface, Sequelize) => {
    // sequelize won't supoort this? form a brute squad then
    return queryInterface.sequelize.query(`ALTER TABLE\`${database}\`.\`Entries\` CHANGE COLUMN\`created_at\` \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, CHANGE COLUMN\`updated_at\` \`updated_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP `)
      .then(() => {
        queryInterface.sequelize.query(`ALTER TABLE\`${database}\`.\`Names\` CHANGE COLUMN\`created_at\` \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, CHANGE COLUMN\`updated_at\` \`updated_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP`);
      })
      .then(() => {
        queryInterface.sequelize.query(`ALTER TABLE\`${database}\`.\`Addresses\` CHANGE COLUMN\`created_at\` \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, CHANGE COLUMN\`updated_at\` \`updated_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP`);
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`ALTER TABLE\`${database}\`.\`Entries\` CHANGE COLUMN\`created_at\` \`created_at\` DATETIME NOT NULL, CHANGE COLUMN\`updated_at\` \`updated_at\` DATETIME NOT NULL`)
      .then(() => {
        queryInterface.sequelize.query(`ALTER TABLE\`${database}\`.\`Names\` CHANGE COLUMN \`created_at\` \`created_at\` DATETIME NOT NULL , CHANGE COLUMN\`updated_at\` \`updated_at\` DATETIME NOT NULL `);
      })
      .then(() => {
        queryInterface.sequelize.query(`ALTER TABLE\`${database}\`.\`Addresses\` CHANGE COLUMN\`created_at\` \`created_at\` DATETIME NOT NULL, CHANGE COLUMN\`updated_at\` \`updated_at\` DATETIME NOT NULL`);
      });
  },
};
