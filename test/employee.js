const expect = require('chai').expect;

const Employee = require('../src/controller/employee/employee');
const sequelize = require('../src/utils/connect_sequelize');
const EmployeeModel = require('../models/employee')(sequelize);
const { truncateTable } = require('./helpers');

describe('Employee Table', () => {
  const employee1 = {
    emp_id: '100',
    name: 'dhanalakshmi narala',
    email: 'dhanalakshmi.narala@gmail.com',
    address: 'brahmapuri',
    phone_no: '1234567890'
  };
  const employee2 = {
    emp_id: '101',
    name: 'sailu k',
    email: 'sailu@gmail.com',
    address: 'amalapuram',
    phone_no: '0987654321'
  };

  beforeEach(async () => {
    await truncateTable('employee');
  });

  describe('insert', () => {
    it('should insert employee1', async () => {
      await Employee.insert(employee1);
      const results = await EmployeeModel.findAll({
        where: { emp_id: employee1.emp_id }
      });
      expect(results).to.have.lengthOf(1);
      const employeeInfo = results[0];
      expect(employeeInfo).to.have.property('emp_id', employee1.emp_id);
      expect(employeeInfo).to.have.property('name', employee1.name);
      expect(employeeInfo).to.have.property('email', employee1.email);
      expect(employeeInfo).to.have.property('address', employee1.address);
      expect(employeeInfo).to.have.property('phone_no', employee1.phone_no);
    });

    it('should insert employee2', async () => {
      await Employee.insert(employee2);
      const results = await EmployeeModel.findAll({
        where: { emp_id: employee2.emp_id }
      });
      expect(results).to.have.lengthOf(1);
      const employeeInfo = results[0];
      expect(employeeInfo).to.have.property('emp_id', employee2.emp_id);
      expect(employeeInfo).to.have.property('name', employee2.name);
      expect(employeeInfo).to.have.property('email', employee2.email);
      expect(employeeInfo).to.have.property('address', employee2.address);
      expect(employeeInfo).to.have.property('phone_no', employee2.phone_no);
    });
  });

  describe('select', () => {
    it('should select employee1 details', async () => {
      await EmployeeModel.create(employee1);
      const results = await Employee.select({ emp_id: employee1.emp_id });
      expect(results).to.have.lengthOf(1);
      const employeeInfo = results[0];
      expect(employeeInfo).to.have.property('emp_id', employee1.emp_id);
      expect(employeeInfo).to.have.property('name', employee1.name);
      expect(employeeInfo).to.have.property('email', employee1.email);
      expect(employeeInfo).to.have.property('address', employee1.address);
      expect(employeeInfo).to.have.property('phone_no', employee1.phone_no);
    });

    it('should select employee2 details', async () => {
      await EmployeeModel.create(employee2);
      const results = await Employee.select({ emp_id: employee2.emp_id });
      expect(results).to.have.lengthOf(1);
      const employeeInfo = results[0];
      expect(employeeInfo).to.have.property('emp_id', employee2.emp_id);
      expect(employeeInfo).to.have.property('name', employee2.name);
      expect(employeeInfo).to.have.property('email', employee2.email);
      expect(employeeInfo).to.have.property('address', employee2.address);
      expect(employeeInfo).to.have.property('phone_no', employee2.phone_no);
    });
  });

  describe('update', () => {
    it('should update employee1 details', async () => {
      await EmployeeModel.create(employee1);
      const employeeNewName = 'dhanalakshmi N';
      await Employee.update({
        name: employeeNewName,
        emp_id: employee1.emp_id
      });
      const results = await EmployeeModel.findAll({ name: employee1.emp_id });
      expect(results).to.have.lengthOf(1);
      const employeeInfo = results[0];
      expect(employeeInfo).to.have.property('emp_id', employee1.emp_id);
      expect(employeeInfo).to.have.property('name', employeeNewName);
      expect(employeeInfo).to.have.property('email', employee1.email);
      expect(employeeInfo).to.have.property('address', employee1.address);
      expect(employeeInfo).to.have.property('phone_no', employee1.phone_no);
    });

    it('should update employee2 details', async () => {
      await EmployeeModel.create(employee2);
      const employeeNewName = 'sailaja K';
      await Employee.update({
        name: employeeNewName,
        emp_id: employee2.emp_id
      });
      const results = await EmployeeModel.findAll({ name: employee2.emp_id });
      expect(results).to.have.lengthOf(1);
      const employeeInfo = results[0];
      expect(employeeInfo).to.have.property('emp_id', employee2.emp_id);
      expect(employeeInfo).to.have.property('name', employeeNewName);
      expect(employeeInfo).to.have.property('email', employee2.email);
      expect(employeeInfo).to.have.property('address', employee2.address);
      expect(employeeInfo).to.have.property('phone_no', employee2.phone_no);
    });
  });

  describe('delete', () => {
    it('should delete employee1', async () => {
      await EmployeeModel.create(employee1);
      await Employee.delete({ emp_id: employee1.emp_id });
      const results = await EmployeeModel.findAll({
        raw: true,
        where: { emp_id: employee1.emp_id }
      });
      expect(results).to.have.lengthOf(0);
    });

    it('should delete employee2', async () => {
      await EmployeeModel.create(employee2);
      await Employee.delete({ emp_id: employee2.emp_id });
      const results = await EmployeeModel.findAll({
        raw: true,
        where: { emp_id: employee2.emp_id }
      });
      expect(results).to.have.lengthOf(0);
    });
  });
});
