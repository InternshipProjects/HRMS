const sequelize = require('../utils/connect_sequelize');
const UsersModel = require('../models/users')(sequelize);
const bcrypt = require('bcrypt');

class User {
  async insert(params) {
    params.password = await bcrypt.hash(params.password, 10);
    await UsersModel.create(params);
  }

  async select(params) {
    return UsersModel.findAll({ raw: true, where: params });
  }

  async update(params) {
    await UsersModel.update(params, { where: { user_name: params.user_name } });
  }

  async delete(params) {
    await UsersModel.destroy({ where: params });
  }
}

module.exports = new User();
