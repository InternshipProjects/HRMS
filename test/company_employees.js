const expect = require('chai').expect;

const CompanyEmployees = require('../src/controller/company_employees');
const sequelize = require('../src/utils/connect_sequelize');
const CompanyEmployeesModel = require('../src/models/company_employees')(
  sequelize
);
const Helper = require('./helper');
const { companies, employees } = require('./data');
const CompanyModel = require('../src/models/company')(sequelize);
const EmployeeModel = require('../src/models/employee')(sequelize);

describe('CompanyEmployees table', () => {
  beforeEach(async () => {
    await Helper.truncateTable('company');
    await Helper.truncateTable('employee');
    await Helper.truncateTable('company_employees');
  });

  describe('insert', () => {
    it('should insert employee1 into company1', async () => {
      await CompanyModel.create(companies[0]);
      const companyResults = await CompanyModel.findAll({
        raw: true,
        where: { registration_no: companies[0].registration_no }
      });
      Helper.compareCompanyResults(companyResults, companies[0]);

      await EmployeeModel.create(employees[0]);
      const employeeResults = await EmployeeModel.findAll({
        raw: true,
        where: { emp_id: employees[0].emp_id }
      });
      Helper.compareEmployeeResults(employeeResults, employees[0]);

      await CompanyEmployees.insert({
        registration_no: companies[0].registration_no,
        emp_id: employees[0].emp_id
      });

      const results = await CompanyEmployeesModel.findAll({
        raw: true,
        where: { company_id: companyResults[0].id }
      });

      expect(results).to.have.lengthOf(1);
      expect(results[0]).to.have.property('id');
      expect(results[0]).to.have.property('company_id', companyResults[0].id);
      expect(results[0]).to.have.property('employee_id', employeeResults[0].id);
    });

    it('should insert employee2 into company2', async () => {
      await CompanyModel.create(companies[1]);
      const companyResults = await CompanyModel.findAll({
        raw: true,
        where: { registration_no: companies[1].registration_no }
      });
      Helper.compareCompanyResults(companyResults, companies[1]);

      await EmployeeModel.create(employees[1]);
      const employeeResults = await EmployeeModel.findAll({
        raw: true,
        where: { emp_id: employees[1].emp_id }
      });
      Helper.compareEmployeeResults(employeeResults, employees[1]);

      await CompanyEmployees.insert({
        registration_no: companies[1].registration_no,
        emp_id: employees[1].emp_id
      });

      const results = await CompanyEmployeesModel.findAll({
        raw: true,
        where: { company_id: companyResults[0].id }
      });

      expect(results).to.have.lengthOf(1);
      expect(results[0]).to.have.property('id');
      expect(results[0]).to.have.property('company_id', companyResults[0].id);
      expect(results[0]).to.have.property('employee_id', employeeResults[0].id);
    });
  });

  describe('select', () => {
    it('should select company1 employees details', async () => {
      await CompanyModel.create(companies[0]);
      const companyResults = await CompanyModel.findAll({
        raw: true,
        where: { registration_no: companies[0].registration_no }
      });
      Helper.compareCompanyResults(companyResults, companies[0]);

      await insertEmployeeInCompany(employees[0], companyResults[0].id);
      await insertEmployeeInCompany(employees[1], companyResults[0].id);

      const employeesInfo = await CompanyEmployees.select({
        registration_no: companies[0].registration_no
      });
      expect(employeesInfo).to.have.lengthOf(2);
      employeesInfo.forEach((employee, index) => {
        expect(employee).to.have.property(
          'employee_model.emp_id',
          employees[index].emp_id
        );
        expect(employee).to.have.property(
          'employee_model.name',
          employees[index].name
        );
        expect(employee).to.have.property(
          'employee_model.email',
          employees[index].email
        );
        expect(employee).to.have.property(
          'employee_model.address',
          employees[index].address
        );
        expect(employee).to.have.property(
          'employee_model.phone_no',
          employees[index].phone_no
        );
      });
    });
  });

  describe('delete', () => {
    it('should delete employee1 from company1', async () => {
      await CompanyModel.create(companies[0]);
      const companyResults = await CompanyModel.findAll({
        raw: true,
        where: { registration_no: companies[0].registration_no }
      });
      Helper.compareCompanyResults(companyResults, companies[0]);

      const employee1Id = await insertEmployeeInCompany(
        employees[0],
        companyResults[0].id
      );
      const employee2Id = await insertEmployeeInCompany(
        employees[1],
        companyResults[0].id
      );

      await CompanyEmployees.delete({
        registration_no: companies[0].registration_no,
        emp_id: employees[0].emp_id
      });

      const results = await CompanyEmployeesModel.findAll({
        raw: true,
        where: {
          company_id: companyResults[0].id
        }
      });
      expect(results).to.have.lengthOf(1);
      expect(results[0]).to.have.property('company_id', companyResults[0].id);
      expect(results[0]).to.have.property('employee_id', employee2Id);
    });
  });

  const insertEmployeeInCompany = async (employee, companyId) => {
    await EmployeeModel.create(employee);
    const employeeResults = await EmployeeModel.findAll({
      raw: true,
      where: { emp_id: employee.emp_id }
    });
    Helper.compareEmployeeResults(employeeResults, employee);

    await CompanyEmployeesModel.create({
      employee_id: employeeResults[0].id,
      company_id: companyId
    });
    return employeeResults[0].id;
  };
});
