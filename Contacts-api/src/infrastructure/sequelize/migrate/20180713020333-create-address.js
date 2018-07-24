'use strict';

/* eslint-disable no-unused-vars */

module.exports = {
  up: ((queryInterface, Sequelize) => {
    queryInterface.createTable('Addresses', {
      address_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      entry_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      primary: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      addressline1: {
        type: Sequelize.STRING(256),
        allowNull: true,
      },
      addressline2: {
        type: Sequelize.STRING(256),
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING(256),
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      zipcode: {
        type: Sequelize.STRING(12),
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING(80),
        allowNull: true,
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
    queryInterface.dropTable('addresses');
  }),
};
