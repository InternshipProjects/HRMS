const expect = require('chai').expect;

const {
  insertCompanyEmployeesInDB,
  getCompanyEmployeesFromDB,
  deleteEmployeesFromCompanyInDB
} = require('../src/services/company_employees');
const sequelize = require('../src/utils/connect_sequelize');
const CompanyEmployeesModel = require('../src/models/company_employees')(
  sequelize
);
const { truncateTable, insertCompany, insertEmployee } = require('./helper');
const { companies, employees } = require('./data');

describe('CompanyEmployees table', () => {
  beforeEach(async () => {
    await truncateTable('company');
    await truncateTable('employee');
    await truncateTable('company_employees');
  });

  describe('insert', () => {
    it('should insert employee1 into company1', async () => {
      const companyInfo = await insertCompany(companies[0]);
      const employeeInfo = await insertEmployee(employees[0]);

      const isInserted = await insertCompanyEmployeesInDB({
        registration_no: companies[0].registration_no,
        emp_id: employees[0].emp_id
      });
      expect(isInserted).to.be.true;

      const results = await CompanyEmployeesModel.findAll({
        raw: true,
        where: { company_id: companyInfo.id }
      });
      compareCompanyEmployeesResults(results, companyInfo.id, employeeInfo.id);
    });

    it('should insert employee2 into company2', async () => {
      const companyInfo = await insertCompany(companies[1]);
      const employeeInfo = await insertEmployee(employees[1]);

      const isInserted = await insertCompanyEmployeesInDB({
        registration_no: companies[1].registration_no,
        emp_id: employees[1].emp_id
      });
      expect(isInserted).to.be.true;

      const results = await CompanyEmployeesModel.findAll({
        raw: true,
        where: { company_id: companyInfo.id }
      });

      compareCompanyEmployeesResults(results, companyInfo.id, employeeInfo.id);
    });
  });

  describe('select', () => {
    it('should select company1 employees details', async () => {
      const companyInfo = await insertCompany(companies[0]);

      await insertEmployeeInCompany(employees[0], companyInfo.id);
      await insertEmployeeInCompany(employees[1], companyInfo.id);

      const employeesInfo = await getCompanyEmployeesFromDB({
        registration_no: companies[0].registration_no
      });
      compareEmployeesInfo(employeesInfo, 2);
    });
  });

  describe('delete', () => {
    it('should delete employee1 from company1', async () => {
      const companyInfo = await insertCompany(companies[0]);

      const employee1Id = await insertEmployeeInCompany(
        employees[0],
        companyInfo.id
      );
      const employee2Id = await insertEmployeeInCompany(
        employees[1],
        companyInfo.id
      );

      const isDeleted = await deleteEmployeesFromCompanyInDB({
        registration_no: companies[0].registration_no,
        emp_id: employees[0].emp_id
      });
      expect(isDeleted).to.be.true;

      const results = await CompanyEmployeesModel.findAll({
        raw: true,
        where: {
          company_id: companyInfo.id
        }
      });
      compareCompanyEmployeesResults(results, companyInfo.id, employee2Id);
    });
  });

  const insertEmployeeInCompany = async (employee, companyId) => {
    const employeeInfo = await insertEmployee(employee);
    await CompanyEmployeesModel.create({
      employee_id: employeeInfo.id,
      company_id: companyId
    });
    return employeeInfo.id;
  };

  const compareCompanyEmployeesResults = (results, companyId, employeeId) => {
    expect(results).to.have.lengthOf(1);
    expect(results[0]).to.have.property('id');
    expect(results[0]).to.have.property('company_id', companyId);
    expect(results[0]).to.have.property('employee_id', employeeId);
  };

  const compareEmployeesInfo = (employeesInfo, employeesCount) => {
    expect(employeesInfo).to.have.lengthOf(employeesCount);
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
  };
});
