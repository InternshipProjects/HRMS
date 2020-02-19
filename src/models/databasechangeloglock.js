const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: false
    },
    locked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "locked",
      autoIncrement: false
    },
    lockgranted: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "lockgranted",
      autoIncrement: false
    },
    lockedby: {
      type: DataTypes.CHAR(255),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "lockedby",
      autoIncrement: false
    }
  };
  const options = {
    tableName: "databasechangeloglock",
    comment: "",
    indexes: []
  };
  const DatabasechangeloglockModel = sequelize.define("databasechangeloglock_model", attributes, options);
  return DatabasechangeloglockModel;
};