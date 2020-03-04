const expect = require('chai').expect;

const Employee = require('../src/controller/employee');
const sequelize = require('../src/utils/connect_sequelize');
const EmployeeModel = require('../src/models/employee')(sequelize);
const Helper = require('./helper');

describe('Employee Table', () => {
  const employees = [
    {
      emp_id: '100',
      name: 'dhanalakshmi narala',
      email: 'dhanalakshmi.narala@gmail.com',
      address: 'brahmapuri',
      phone_no: '1234567890'
    },
    {
      emp_id: '101',
      name: 'sailu k',
      email: 'sailu@gmail.com',
      address: 'amalapuram',
      phone_no: '0987654321'
    }
  ];

  beforeEach(async () => {
    await Helper.truncateTable('employee');
  });

  describe('insert', () => {
    it('should insert employee1', async () => {
      await Employee.insert(employees[0]);
      const results = await EmployeeModel.findAll({
        where: { emp_id: employees[0].emp_id }
      });
      compareEmployeeResults(results, employees[0]);
    });

    it('should insert employee2', async () => {
      await Employee.insert(employees[1]);
      const results = await EmployeeModel.findAll({
        where: { emp_id: employees[1].emp_id }
      });
      compareEmployeeResults(results, employees[1]);
    });
  });

  describe('select', () => {
    it('should select employee1 details', async () => {
      await EmployeeModel.create(employees[0]);
      const results = await Employee.select({ emp_id: employees[0].emp_id });
      compareEmployeeResults(results, employees[0]);
    });

    it('should select employee2 details', async () => {
      await EmployeeModel.create(employees[1]);
      const results = await Employee.select({ emp_id: employees[1].emp_id });
      compareEmployeeResults(results, employees[1]);
    });
  });

  describe('update', () => {
    it('should update employee1 details', async () => {
      await EmployeeModel.create(employees[0]);

      const employeeNewName = 'dhanalakshmi N';
      await Employee.update({
        name: employeeNewName,
        emp_id: employees[0].emp_id
      });

      const results = await EmployeeModel.findAll({
        name: employees[0].emp_id
      });

      const updateEmployeeDetails = Object.assign(employees[0], {});
      updateEmployeeDetails.name = employeeNewName;

      compareEmployeeResults(results, updateEmployeeDetails);
    });

    it('should update employee2 details', async () => {
      await EmployeeModel.create(employees[1]);

      const employeeNewName = 'sailaja K';
      await Employee.update({
        name: employeeNewName,
        emp_id: employees[1].emp_id
      });

      const results = await EmployeeModel.findAll({
        name: employees[1].emp_id
      });

      const updateEmployeeDetails = Object.assign(employees[1], {});
      updateEmployeeDetails.name = employeeNewName;

      compareEmployeeResults(results, updateEmployeeDetails);
    });
  });

  describe('delete', () => {
    it('should delete employee1', async () => {
      await EmployeeModel.create(employees[0]);
      await Employee.delete({ emp_id: employees[0].emp_id });
      const results = await EmployeeModel.findAll({
        raw: true,
        where: { emp_id: employees[0].emp_id }
      });
      expect(results).to.have.lengthOf(0);
    });

    it('should delete employee2', async () => {
      await EmployeeModel.create(employees[1]);
      await Employee.delete({ emp_id: employees[1].emp_id });
      const results = await EmployeeModel.findAll({
        raw: true,
        where: { emp_id: employees[1].emp_id }
      });
      expect(results).to.have.lengthOf(0);
    });
  });

  const compareEmployeeResults = (results, employee) => {
    expect(results).to.have.lengthOf(1);
    const employeeInfo = results[0];

    expect(employeeInfo).to.have.property('emp_id', employee.emp_id);
    expect(employeeInfo).to.have.property('name', employee.name);
    expect(employeeInfo).to.have.property('email', employee.email);
    expect(employeeInfo).to.have.property('address', employee.address);
    expect(employeeInfo).to.have.property('phone_no', employee.phone_no);
  };
});
