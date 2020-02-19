const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "id",
      autoIncrement: false
    },
    author: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "author",
      autoIncrement: false
    },
    filename: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "filename",
      autoIncrement: false
    },
    dateexecuted: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "dateexecuted",
      autoIncrement: false
    },
    orderexecuted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "orderexecuted",
      autoIncrement: false
    },
    exectype: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "exectype",
      autoIncrement: false
    },
    md5sum: {
      type: DataTypes.CHAR(35),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "md5sum",
      autoIncrement: false
    },
    description: {
      type: DataTypes.CHAR(255),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "description",
      autoIncrement: false
    },
    comments: {
      type: DataTypes.CHAR(255),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "comments",
      autoIncrement: false
    },
    tag: {
      type: DataTypes.CHAR(255),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "tag",
      autoIncrement: false
    },
    liquibase: {
      type: DataTypes.CHAR(20),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "liquibase",
      autoIncrement: false
    },
    contexts: {
      type: DataTypes.CHAR(255),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "contexts",
      autoIncrement: false
    },
    labels: {
      type: DataTypes.CHAR(255),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "labels",
      autoIncrement: false
    },
    deployment_id: {
      type: DataTypes.CHAR(10),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "deployment_id",
      autoIncrement: false
    }
  };
  const options = {
    tableName: "databasechangelog",
    comment: "",
    indexes: []
  };
  const DatabasechangelogModel = sequelize.define("databasechangelog_model", attributes, options);
  return DatabasechangelogModel;
};