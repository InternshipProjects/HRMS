const sequelize = require('../utils/connect_sequelize');
const JWTTokensModel = require('../models/jwt_tokens')(sequelize);

class JWTTokens {
  async insert(token) {
    await JWTTokensModel.create({ refresh_token: token });
  }

  async delete(token) {
    await JWTTokensModel.destroy({ where: { refresh_token: token } });
  }
}

module.exports = new JWTTokens();
