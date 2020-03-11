const jwt = require('jsonwebtoken');

const sequelize = require('../utils/connect_sequelize');
const JWTTokensModel = require('../models/jwt_tokens')(sequelize);

const generateJWTAccessToken = user => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '24h'
  });
};

const generateJWTRefreshToken = user => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
};

const insertJWTRefreshTokenInDB = async token => {
  await JWTTokensModel.create({ refresh_token: token });
};

const getJWTRefreshTokenFromDB = async token => {
  return JWTTokensModel.findOne({
    raw: true,
    where: { refresh_token: token }
  });
};

const deleteJWTRefreshTokenFromDB = async token => {
  await JWTTokensModel.destroy({ where: { refresh_token: token } });
};

module.exports = {
  generateJWTAccessToken,
  generateJWTRefreshToken,
  insertJWTRefreshTokenInDB,
  getJWTRefreshTokenFromDB,
  deleteJWTRefreshTokenFromDB
};
