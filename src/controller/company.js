const sequelize = require('../utils/connect_sequelize');
const CompanyModel = require('../models/company')(sequelize);

class CompanyController {
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
      throw `Invalid query type ${queryType}`;
    }
  }

  async insert(params) {
    await CompanyModel.create(params);
  }

  async select(params) {
    const results = await CompanyModel.findAll({ raw: true, where: params });
    return results;
  }

  async update(params) {
    let registrationNo = params['registration_no'];
    await CompanyModel.update(params, {
      where: { registration_no: registrationNo }
    });
  }

  async delete(params) {
    await CompanyModel.destroy({ where: params });
  }
}

module.exports = new CompanyController();
