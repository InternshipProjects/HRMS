const sequelize = require('../utils/connect_sequelize');
const UsersModel = require('../models/users')(sequelize);
const bcrypt = require('bcrypt');

const insertUserInDB = async params => {
  params.password = await bcrypt.hash(params.password, 10);
  const user = await UsersModel.create(params);
  return user ? true : false;
};

const getUserFromDB = async params => {
  return UsersModel.findOne({ raw: true, where: params });
};

const updateUserInDB = async params => {
  const user = await UsersModel.update(params, {
    where: { user_name: params.user_name }
  });
  return user ? true : false;
};

const deleteUserFromDB = async params => {
  const user = await UsersModel.destroy({ where: params });
  return user ? true : false;
};

module.exports = {
  insertUserInDB,
  getUserFromDB,
  updateUserInDB,
  deleteUserFromDB
};
