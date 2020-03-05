const expect = require('chai').expect;
const sequelize = require('../src/utils/connect_sequelize');
const CompanyModel = require('../src/models/company')(sequelize);
const EmployeeModel = require('../src/models/employee')(sequelize);
const ProjectModel = require('../src/models/project')(sequelize);

class Helper {
  async truncateTable(tableName) {
    await sequelize.query(`truncate ${tableName} cascade`);
  }

  async insertCompany(company) {
    await CompanyModel.create(company);
    const results = await CompanyModel.findAll({
      raw: true,
      where: { registration_no: company.registration_no }
    });
    this.compareCompanyResults(results, company);
    return results[0];
  }

  compareCompanyResults(results, company) {
    expect(results).to.have.lengthOf(1);
    const companyInfo = results[0];

    expect(companyInfo).to.have.property('name', company.name);
    expect(companyInfo).to.have.property('address', company.address);
    expect(companyInfo).to.have.property(
      'registration_no',
      company.registration_no
    );
    expect(companyInfo).to.have.property('phone_no', company.phone_no);
    expect(companyInfo).to.have.property('website', company.website);
  }

  async insertEmployee(employee) {
    await EmployeeModel.create(employee);
    const results = await EmployeeModel.findAll({
      raw: true,
      where: { emp_id: employee.emp_id }
    });
    this.compareEmployeeResults(results, employee);
    return results[0];
  }

  compareEmployeeResults(results, employee) {
    expect(results).to.have.lengthOf(1);
    const employeeInfo = results[0];

    expect(employeeInfo).to.have.property('emp_id', employee.emp_id);
    expect(employeeInfo).to.have.property('name', employee.name);
    expect(employeeInfo).to.have.property('email', employee.email);
    expect(employeeInfo).to.have.property('address', employee.address);
    expect(employeeInfo).to.have.property('phone_no', employee.phone_no);
  }

  async insertProject(project) {
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
  }
}

module.exports = new Helper();
