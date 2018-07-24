'use strict';

/* eslint-disable no-unused-vars */

module.exports = {
  up: ((queryInterface, Sequelize) => {
    queryInterface.createTable('Names', {
      name_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      entry_id: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      primary: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      honorific: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      first_name: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      middle_name: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      last_name: {
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
    queryInterface.dropTable('Names');
  }),
};
