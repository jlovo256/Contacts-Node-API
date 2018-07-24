'use strict';

/* eslint-disable no-unused-vars */

module.exports = {
  up: ((queryInterface, Sequelize) => {
    queryInterface.addConstraint('Addresses', ['entry_id'], {
      type: 'foreign key',
      name: 'address_ibfk_1',
      references: {
        table: 'Entries',
        field: 'entry_id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }),
  down: ((queryInterface, Sequelize) => {
    queryInterface.removeConstraint('Addresses', 'address_ibfk_1');
  }),
};
