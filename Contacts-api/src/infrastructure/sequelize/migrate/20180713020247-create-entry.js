'use strict';

/* eslint-disable no-unused-vars */

module.exports = {
  up: ((queryInterface, Sequelize) => {
    queryInterface.createTable('Entries', {
      entry_id: {
        allowNull: false,
        unique: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      front_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  }),
  down: ((queryInterface, Sequelize) => {
    queryInterface.dropTable('Entries');
  }),
};
