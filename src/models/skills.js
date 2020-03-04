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
    name: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "name",
      autoIncrement: false,
      unique: "unique_skill_name"
    }
  };
  const options = {
    tableName: "skills",
    comment: "",
    indexes: []
  };
  const SkillsModel = sequelize.define("skills_model", attributes, options);
  return SkillsModel;
};