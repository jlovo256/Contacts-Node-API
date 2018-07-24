'use strict';

module.exports = (sequelize, DataTypes) => {
  const Entry = sequelize.define('Entry', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true,
      field: 'entry_id',
    },
    entryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      field: 'front_id',
    },
  }, {
    paranoid: false,
    underscored: true,
  });
  Entry.associate = ((models) => {
    Entry.hasMany(models.Name, {
      foreignKey: 'id',
    });
    Entry.hasMany(models.Address, {
      foreignKey: 'id',
    });
  });
  return Entry;
};
