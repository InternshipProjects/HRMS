const sequelize = require('../utils/connect_sequelize');
const CompanyEmployeesModel = require('../models/company_employees')(sequelize);
const EmployeeModel = require('../models/employee')(sequelize);
const { getEmployeeFromDB } = require('./employee');
const { getCompanyFromDB } = require('./company');

// params: {registration_no: string, emp_id: string}
const insertCompanyEmployees = async params => {
  const employeeInfo = await getEmployeeFromDB({ emp_id: params.emp_id });
  const companyInfo = await getCompanyFromDB({
    registration_no: params.registration_no
  });
  const insertedRecord = await CompanyEmployeesModel.create({
    employee_id: employeeInfo.id,
    company_id: companyInfo[0].id
  });
  return insertedRecord ? true : false;
};

// params: {registration_no: string}
const getCompanyEmployees = async params => {
  const companyInfo = await getCompanyFromDB({
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
};

// params: {registration_no: string, emp_id: string}
const deleteEmployeesFromCompany = async params => {
  const employeeInfo = await getEmployeeFromDB({ emp_id: params.emp_id });
  const companyInfo = await getCompanyFromDB({
    registration_no: params.registration_no
  });
  const deletedRecord = await CompanyEmployeesModel.destroy({
    where: { employee_id: employeeInfo.id, company_id: companyInfo[0].id }
  });
  return deletedRecord ? true : false;
};

module.exports = {
  insertCompanyEmployees,
  getCompanyEmployees,
  deleteEmployeesFromCompany
};
