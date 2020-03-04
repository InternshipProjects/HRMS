const expect = require('chai').expect;
const sequelize = require('../src/utils/connect_sequelize');
const EmployeeModel = require('../src/models/employee')(sequelize);
const ProjectModel = require('../src/models/project')(sequelize);

class Helper {
  async truncateTable(tableName) {
    await sequelize.query(`truncate ${tableName} cascade`);
  }

  async insertEmployee(employee) {
    await EmployeeModel.create(employee);
    const employees = await EmployeeModel.findAll({
      raw: true,
      where: { emp_id: employee.emp_id }
    });
    expect(employees).to.have.lengthOf(1);
    const employeeInfo = employees[0];
    expect(employeeInfo).to.have.property('emp_id', employee.emp_id);
    expect(employeeInfo).to.have.property('name', employee.name);
    expect(employeeInfo).to.have.property('email', employee.email);
    expect(employeeInfo).to.have.property('address', employee.address);
    expect(employeeInfo).to.have.property('phone_no', employee.phone_no);
    return employeeInfo;
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

  compareEmployeeResults(results, employee) {
    expect(results).to.have.lengthOf(1);
    const employeeInfo = results[0];

    expect(employeeInfo).to.have.property('emp_id', employee.emp_id);
    expect(employeeInfo).to.have.property('name', employee.name);
    expect(employeeInfo).to.have.property('email', employee.email);
    expect(employeeInfo).to.have.property('address', employee.address);
    expect(employeeInfo).to.have.property('phone_no', employee.phone_no);
  }
}

module.exports = new Helper();
