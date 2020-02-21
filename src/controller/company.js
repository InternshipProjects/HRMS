const sequelize = require('../utils/connect_sequelize');
const CompanyModel = require('../models/company')(sequelize);

class CompanyController {
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
      throw `Invalid query type ${queryType}`;
    }
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
