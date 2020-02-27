const sequelize = require('../utils/connect_sequelize');
const ClientModel = require('../models/client')(sequelize);

class ClientController {
  async handleQuery(queryInput) {
    const { queryType, params } = queryInput;
    const queries = {
      POST: this.insert,
      GET: this.select,
      PATCH: this.update,
      DELETE: this.delete
    };
    try {
      return queries[queryType](params);
    } catch (error) {
      console.error(error);
      throw `Invalid query type: ${queryType}`;
    }
  }

  async insert(params) {
    await ClientModel.create(params);
  }

  async select(params) {
    return ClientModel.findAll({ raw: true, where: params });
  }

  async update(params) {
    await ClientModel.update(params, { where: { name: params['name'] } });
  }

  async delete(params) {
    await ClientModel.destroy({ where: params });
  }
}

module.exports = new ClientController();
