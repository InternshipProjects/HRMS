const sequelize = require('../../utils/connect_sequelize');
const CompanyEmployeesModel = require('../../../models/company_employees')(
  sequelize
);
const Employee = require('./employee');
const Company = require('../company');

class CompanyEmployees {
  async query(queryType, params) {
    const queries = {
      POST: this.insert,
      GET: this.select,
      DELETE: this.delete
    };
    try {
      return queries[queryType](params);
    } catch (error) {
      console.error(error);
      throw `Invalid queryType ${queryType}`;
    }
  }

  async insert(params) {
    const employeeInfo = await Employee.select({ emp_id: params.emp_id });
    const companyInfo = await Company.select({
      registration_no: params.registration_no
    });
    await CompanyEmployeesModel.create({
      employee_id: employeeInfo.id,
      company_id: companyInfo.id
    });
  }

  async select(params) {
    const companyInfo = await Company.select({
      registration_no: params.registration_no
    });
    const results = await CompanyEmployeesModel.findAll({
      where: { company_id: companyInfo.id }
    });
    return results[0].dataValues;
  }

  async delete(params) {
    const employeeInfo = await Employee.select({ emp_id: params.emp_id });
    const companyInfo = await Company.select({
      registration_no: params.registration_no
    });
    await CompanyEmployeesModel.destroy({
      where: { employee_id: employeeInfo.id, company_id: companyInfo.id }
    });
  }
}

module.exports = new CompanyEmployees();
