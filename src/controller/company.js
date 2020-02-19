const sequelize = require('../process/connect_sequelize');
const CompanyModel = require('../models/company')(sequelize);

class CompanyController {
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
    throw `Invalid query type ${queryType}`;
  }

  insert(resources, params) {
    return CompanyModel.create(params);
  }

  select(resources, params) {
    return CompanyModel.findAll().then(result => {
      if (result) {
        console.log(JSON.stringify(result, null, 4));
      }
    });
  }

  update(resources, params) {
    return CompanyModel.update(params, {
      where: { registration_no: params['registration_no'] }
    });
  }

  delete(resources, params) {
    return CompanyModel.destroy({ where: params });
  }
}

module.exports = new CompanyController();
