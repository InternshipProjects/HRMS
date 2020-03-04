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
      autoIncrement: true
    },
    registration_no: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "registration_no",
      autoIncrement: false,
      unique: "unique_company_registration_no"
    },
    name: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "name",
      autoIncrement: false
    },
    address: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "address",
      autoIncrement: false
    },
    phone_no: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "phone_no",
      autoIncrement: false
    },
    website: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "website",
      autoIncrement: false
    }
  };
  const options = {
    tableName: "company",
    comment: "",
    indexes: []
  };
  const CompanyModel = sequelize.define("company_model", attributes, options);
  return CompanyModel;
};