const sequelize = require('../../utils/connect_sequelize');
const CompanyEmployeesModel = require('../../models/company_employees')(
  sequelize
);
const EmployeeModel = require('../../models/employee')(sequelize);
const Employee = require('./employee');
const Company = require('../company');

class CompanyEmployees {
  async insert(params) {
    const employeeInfo = await Employee.select({ emp_id: params.emp_id });
    const companyInfo = await Company.select({
      registration_no: params.registration_no
    });
    await CompanyEmployeesModel.create({
      employee_id: employeeInfo[0].id,
      company_id: companyInfo[0].id
    });
  }

  async select(params) {
    const companyInfo = await Company.select({
      registration_no: params.registration_no
    });
    await CompanyEmployeesModel.belongsTo(EmployeeModel, {
      foreignKey: 'employee_id'
    });
    return await CompanyEmployeesModel.findAll({
      raw: true,
      attributes: [],
      where: { company_id: companyInfo[0].id },
      include: [
        {
          model: EmployeeModel,
          attributes: ['emp_id', 'name', 'email', 'address', 'phone_no']
        }
      ]
    });
  }

  async delete(params) {
    const employeeInfo = await Employee.select({ emp_id: params.emp_id });
    const companyInfo = await Company.select({
      registration_no: params.registration_no
    });
    await CompanyEmployeesModel.destroy({
      where: { employee_id: employeeInfo[0].id, company_id: companyInfo[0].id }
    });
  }
}

module.exports = new CompanyEmployees();
