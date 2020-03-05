const jwt = require('jsonwebtoken');

const sequelize = require('../utils/connect_sequelize');
const JWTTokensModel = require('../models/jwt_tokens')(sequelize);

class JWTTokens {
  generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '24h'
    });
  }

  generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  }

  async insert(token) {
    await JWTTokensModel.create({ refresh_token: token });
  }

  async select(token) {
    return JWTTokensModel.findOne({
      raw: true,
      where: { refresh_token: token }
    });
  }

  async delete(token) {
    await JWTTokensModel.destroy({ where: { refresh_token: token } });
  }
}

module.exports = new JWTTokens();
