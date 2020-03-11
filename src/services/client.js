const sequelize = require('../utils/connect_sequelize');
const ClientModel = require('../models/client')(sequelize);

const insertClientInDB = async params => {
  const client = await ClientModel.create(params);
  return client ? true : false;
};

const getClientFromDB = async params => {
  return ClientModel.findOne({ raw: true, where: params });
};

const updateClientInDB = async params => {
  const client = await ClientModel.update(params, {
    where: { name: params['name'] }
  });
  return client ? true : false;
};

const deleteClientFromDB = async params => {
  const client = await ClientModel.destroy({ where: params });
  return client ? true : false;
};

module.exports = {
  insertClientInDB,
  getClientFromDB,
  updateClientInDB,
  deleteClientFromDB
};
