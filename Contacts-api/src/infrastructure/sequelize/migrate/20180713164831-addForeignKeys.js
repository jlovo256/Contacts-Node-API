'use strict';

/* eslint-disable no-unused-vars */

module.exports = {
  up: ((queryInterface, Sequelize) => {
    queryInterface.addConstraint('Names', ['entry_id'], {
      type: 'foreign key',
      name: 'names_ibfk_1',
      references: {
        table: 'Entries',
        field: 'entry_id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }),
  down: ((queryInterface, Sequelize) => {
    queryInterface.removeConstraint('Names', 'names_ibfk_1');
  }),
};
