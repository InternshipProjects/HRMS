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
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "employee_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "employee_model"
      }
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "company_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "company_model"
      }
    }
  };
  const options = {
    tableName: "company_employees",
    comment: "",
    indexes: []
  };
  const CompanyEmployeesModel = sequelize.define("company_employees_model", attributes, options);
  return CompanyEmployeesModel;
};