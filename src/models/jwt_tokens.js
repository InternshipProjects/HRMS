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
    refresh_token: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "refresh_token",
      autoIncrement: false,
      unique: "unique_refresh_token"
    }
  };
  const options = {
    tableName: "jwt_tokens",
    comment: "",
    indexes: []
  };
  const JwtTokensModel = sequelize.define("jwt_tokens_model", attributes, options);
  return JwtTokensModel;
};