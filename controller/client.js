const sequelize = require('../process/connect_sequelize');
const ClientModel = require('../models/client')(sequelize);

class ClientController {
  handleQuery(input) {
    const queryType = input.queryType;
    const resources = input.resources;
    const params = input.params;
    switch (queryType) {
      case 'POST':
        return this.insert(resources, params);
      case 'GET':
        return this.select(resources, params);
      case 'PATCH':
        return this.update(resources, params);
      case 'DELETE':
        return this.delete(resources, params);
    }
    throw `Invalid query type: ${queryType}`;
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
    return ClientModel.update(params, { where: params });
  }

  delete(resources, params) {
    return ClientModel.destroy({ where: params });
  }
}

module.exports = new ClientController();
