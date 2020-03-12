const expect = require('chai').expect;
const sequelize = require('../src/utils/connect_sequelize');
const CompanyModel = require('../src/models/company')(sequelize);
const EmployeeModel = require('../src/models/employee')(sequelize);
const ProjectModel = require('../src/models/project')(sequelize);

const truncateTable = async tableName => {
  await sequelize.query(`truncate ${tableName} cascade`);
};

const insertCompany = async company => {
  await CompanyModel.create(company);
  const results = await CompanyModel.findAll({
    raw: true,
    where: { registration_no: company.registration_no }
  });
  expect(results).to.have.lengthOf(1);
  compareCompanyResults(results[0], company);
  return results[0];
};

const compareCompanyResults = (companyInfo, expectedInfo) => {
  expect(companyInfo).to.have.property('name', expectedInfo.name);
  expect(companyInfo).to.have.property('address', expectedInfo.address);
  expect(companyInfo).to.have.property(
    'registration_no',
    expectedInfo.registration_no
  );
  expect(companyInfo).to.have.property('phone_no', expectedInfo.phone_no);
  expect(companyInfo).to.have.property('website', expectedInfo.website);
};

const insertEmployee = async employee => {
  await EmployeeModel.create(employee);
  const results = await EmployeeModel.findAll({
    raw: true,
    where: { emp_id: employee.emp_id }
  });
  expect(results).to.have.lengthOf(1);
  compareEmployeeResults(results[0], employee);
  return results[0];
};

const compareEmployeeResults = (employeeInfo, employee) => {
  expect(employeeInfo).to.have.property('emp_id', employee.emp_id);
  expect(employeeInfo).to.have.property('name', employee.name);
  expect(employeeInfo).to.have.property('email', employee.email);
  expect(employeeInfo).to.have.property('address', employee.address);
  expect(employeeInfo).to.have.property('phone_no', employee.phone_no);
};

const insertProject = async project => {
  await ProjectModel.create(project);
  const projects = await ProjectModel.findAll({
    raw: true,
    where: { name: project.name }
  });
  expect(projects).to.have.lengthOf(1);
  const projectInfo = projects[0];
  expect(projectInfo).to.have.property('name', project.name);
  expect(projectInfo).to.have.property('start_date', project.start_date);
  expect(projectInfo).to.have.property('end_date', projectInfo.end_date);
  return projectInfo;
};

module.exports = {
  truncateTable,
  insertCompany,
  compareCompanyResults,
  insertEmployee,
  compareEmployeeResults,
  insertProject
};
