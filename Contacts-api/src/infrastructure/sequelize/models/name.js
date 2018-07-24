'use strict';

module.exports = (sequelize, DataTypes) => {
  const Name = sequelize.define('Name', {
    nameId: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      field: 'name_id',
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
    honorific: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING(80),
      allowNull: true,
      field: 'first_name',
    },
    middleName: {
      type: DataTypes.STRING(80),
      allowNull: true,
      field: 'middle_name',
    },
    lastName: {
      type: DataTypes.STRING(80),
      allowNull: true,
      field: 'last_name',
    },
  }, {
    paranoid: false,
    underscored: true,
  });
  Name.associate = ((models) => {
    Name.belongsTo(models.Entry, {
      foreignKey: 'id',
      targetKey: 'id',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  });
  return Name;
};
