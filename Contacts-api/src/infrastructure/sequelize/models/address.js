'use strict';

module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    addressId: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      unique: true,
      field: 'address_id',
      autoIncrement: true,
    },
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: 'entry_id',
    },
    primary: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    addressL1: {
      type: DataTypes.STRING(256),
      allowNull: true,
      field: 'addressline1',
    },
    addressL2: {
      type: DataTypes.STRING(256),
      allowNull: true,
      field: 'addressline2',
    },
    city: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },
    zipcode: {
      type: DataTypes.STRING(12),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },
  }, {
    paranoid: false,
    underscored: true,
  });
  Address.associate = ((models) => {
    Address.belongsTo(models.Entry, {
      foreignKey: 'id',
      targetKey: 'id',
      onDelete: 'cascade',
    });
  });
  return Address;
};
