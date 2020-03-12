const sequelize = require('../utils/connect_sequelize');
const CompanyModel = require('../models/company')(sequelize);

const insertCompanyInDB = async params => {
  const company = await CompanyModel.create(params);
  return company ? true : false;
};

const getCompanyFromDB = async params => {
  return CompanyModel.findOne({ raw: true, where: params });
};

const updateCompanyInDB = async params => {
  const company = await CompanyModel.update(params, {
    where: { registration_no: params.registration_no }
  });
  return company ? true : false;
};

const deleteCompanyFromDB = async params => {
  const company = await CompanyModel.destroy({ where: params });
  return company ? true : false;
};

module.exports = {
  insertCompanyInDB,
  getCompanyFromDB,
  updateCompanyInDB,
  deleteCompanyFromDB
};
