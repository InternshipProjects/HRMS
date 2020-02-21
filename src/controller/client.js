const sequelize = require('../utils/connect_sequelize');
const ClientModel = require('../models/client')(sequelize);

class ClientController {
  handleQuery(queryInput) {
    const { queryType, resources, params } = queryInput;
    const queries = {
      POST: this.insert,
      GET: this.select,
      PATCH: this.update,
      DELETE: this.delete
    };
    try {
      return queries[queryType](resources, params);
    } catch (error) {
      console.error(error);
      throw `Invalid query type: ${queryType}`;
    }
  }

  insert(resources, params) {
    return ClientModel.create(params);
  }

  select(resources, params) {
    return ClientModel.findAll({ where: params }).then(result => {
      if (result) {
        console.log(JSON.stringify(result, null, 4));
      }
    });
  }

  update(resources, params) {
    return ClientModel.update(params, { where: { name: params['name'] } });
  }

  delete(resources, params) {
    return ClientModel.destroy({ where: params });
  }
}

module.exports = new ClientController();
