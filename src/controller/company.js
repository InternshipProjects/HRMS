const sequelize = require('../utils/connect_sequelize');
const CompanyModel = require('../models/company')(sequelize);

class CompanyController {
  async insert(params) {
    await CompanyModel.create(params);
  }

  async select(params) {
    return CompanyModel.findAll({ raw: true, where: params });
  }

  async update(params) {
    await CompanyModel.update(params, {
      where: { registration_no: params.registration_no }
    });
  }

  async delete(params) {
    await CompanyModel.destroy({ where: params });
  }
}

module.exports = new CompanyController();
