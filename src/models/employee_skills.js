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
    skill_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "skill_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "skills_model"
      }
    }
  };
  const options = {
    tableName: "employee_skills",
    comment: "",
    indexes: [{
      name: "unique_employee_skill",
      unique: true,
      fields: ["employee_id", "skill_id"]
    }]
  };
  const EmployeeSkillsModel = sequelize.define("employee_skills_model", attributes, options);
  return EmployeeSkillsModel;
};