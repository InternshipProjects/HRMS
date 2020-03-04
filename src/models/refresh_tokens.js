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
    token: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "token",
      autoIncrement: false,
      unique: "unique_token"
    }
  };
  const options = {
    tableName: "refresh_tokens",
    comment: "",
    indexes: []
  };
  const RefreshTokensModel = sequelize.define("refresh_tokens_model", attributes, options);
  return RefreshTokensModel;
};