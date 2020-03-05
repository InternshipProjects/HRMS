const expect = require('chai').expect;

const sequelize = require('../src/utils/connect_sequelize');
const ProjectAllocationModel = require('../src/models/project_allocation')(
  sequelize
);
const ProjectAllocation = require('../src/controller/project_allocation');
const Helper = require('./helper');
const { employees, projects } = require('./data');

describe('Project Allocation Table', () => {
  const allocation = [
    {
      emp_id: employees[0].emp_id,
      project_name: projects[0].name,
      start_date: projects[0].start_date,
      likely_end_date: projects[0].end_date
    },
    {
      emp_id: employees[1].emp_id,
      project_name: projects[1].name,
      start_date: projects[0].start_date,
      likely_end_date: projects[0].end_date
    }
  ];

  beforeEach(async () => {
    await Helper.truncateTable('project_allocation');
    await Helper.truncateTable('project');
    await Helper.truncateTable('employee');
  });

  describe('insert', () => {
    it('should insert employee1 and project1', async () => {
      const employeeInfo = await Helper.insertEmployee(employees[0]);
      const projectInfo = await Helper.insertProject(projects[0]);
      await ProjectAllocation.insert(allocation[0]);
      const allocationInfo = await ProjectAllocationModel.findAll({
        raw: true,
        where: { employee_id: employeeInfo.id }
      });

      const expectedInfo = {
        employeeId: employeeInfo.id,
        projectId: projectInfo.id,
        startDate: allocation[0].start_date,
        likelyEndDate: allocation[0].likely_end_date
      };
      compareProjectAllocationInfo(allocationInfo, expectedInfo);
    });

    it('should insert employee2 and project2', async () => {
      const employeeInfo = await Helper.insertEmployee(employees[1]);
      const projectInfo = await Helper.insertProject(projects[1]);
      await ProjectAllocation.insert(allocation[1]);
      const allocationInfo = await ProjectAllocationModel.findAll({
        raw: true,
        where: { employee_id: employeeInfo.id }
      });

      const expectedResults = {
        employeeId: employeeInfo.id,
        projectId: projectInfo.id,
        startDate: allocation[1].start_date,
        likelyEndDate: allocation[1].likely_end_date
      };
      compareProjectAllocationInfo(allocationInfo, expectedResults);
    });
  });

  describe('select', () => {
    it('should select employee project details based on emp_id', async () => {
      const employeeInfo = await Helper.insertEmployee(employees[0]);
      const projectInfo = await Helper.insertProject(projects[0]);
      await ProjectAllocationModel.create({
        employee_id: employeeInfo.id,
        project_id: projectInfo.id,
        start_date: allocation[0].start_date,
        likely_end_date: allocation[0].likely_end_date
      });
      const projectAllocationInfo = await ProjectAllocation.select({
        emp_id: employees[0].emp_id
      });
      expect(projectAllocationInfo[0]).to.have.property('id');
      expect(projectAllocationInfo[0]).to.have.property(
        'employee_id',
        employeeInfo.id
      );
      expect(projectAllocationInfo[0]).to.have.property(
        'project_id',
        projectInfo.id
      );
    });

    it('should select project employee details based on project_name', async () => {
      const employee1Info = await Helper.insertEmployee(employees[0]);
      const employee2Info = await Helper.insertEmployee(employees[1]);
      const projectInfo = await Helper.insertProject(projects[0]);
      await ProjectAllocationModel.create({
        employee_id: employee1Info.id,
        project_id: projectInfo.id,
        start_date: allocation[0].start_date,
        likely_end_date: allocation[0].likely_end_date
      });
      await ProjectAllocationModel.create({
        employee_id: employee2Info.id,
        project_id: projectInfo.id,
        start_date: allocation[0].start_date,
        likely_end_date: allocation[0].likely_end_date
      });

      const projectAllocationInfo = await ProjectAllocation.select({
        project_name: projects[0].name
      });
      expect(projectAllocationInfo).to.have.lengthOf(2);

      expect(projectAllocationInfo[0]).to.have.property(
        'employee_id',
        employee1Info.id
      );
      expect(projectAllocationInfo[1]).to.have.property(
        'employee_id',
        employee2Info.id
      );
      projectAllocationInfo.forEach(allocationInfo => {
        expect(allocationInfo).to.have.property('id');
        expect(allocationInfo).to.have.property('project_id', projectInfo.id);
        expect(allocationInfo).to.have.property(
          'start_date',
          allocation[0].start_date
        );
        expect(allocationInfo).to.have.property(
          'likely_end_date',
          allocation[0].likely_end_date
        );
      });
    });
  });

  describe('update', () => {
    it("should update employee1's project1 start_date", async () => {
      const employeeInfo = await Helper.insertEmployee(employees[0]);
      const projectInfo = await Helper.insertProject(projects[0]);
      await ProjectAllocationModel.create({
        employee_id: employeeInfo.id,
        project_id: projectInfo.id,
        start_date: allocation[0].start_date,
        likely_end_date: allocation[0].likely_end_date
      });

      const newStartDate = '2020-04-09';
      await ProjectAllocation.update({
        emp_id: employees[0].emp_id,
        project_name: projects[0].name,
        start_date: newStartDate
      });

      const allocationInfo = await ProjectAllocationModel.findAll({
        raw: true,
        where: {
          employee_id: employeeInfo.id
        }
      });
      const expectedInfo = {
        employeeId: employeeInfo.id,
        projectId: projectInfo.id,
        startDate: newStartDate,
        likelyEndDate: allocation[0].likely_end_date
      };
      compareProjectAllocationInfo(allocationInfo, expectedInfo);
    });

    it("should update employee1's project1 likely_end_date", async () => {
      const employeeInfo = await Helper.insertEmployee(employees[0]);
      const projectInfo = await Helper.insertProject(projects[0]);
      await ProjectAllocationModel.create({
        employee_id: employeeInfo.id,
        project_id: projectInfo.id,
        start_date: allocation[0].start_date,
        likely_end_date: allocation[0].likely_end_date
      });

      const newLikelyEndDate = '2020-05-19';
      await ProjectAllocation.update({
        emp_id: employees[0].emp_id,
        project_name: projects[0].name,
        likely_end_date: newLikelyEndDate
      });

      const allocationInfo = await ProjectAllocationModel.findAll({
        raw: true,
        where: {
          employee_id: employeeInfo.id
        }
      });
      const expectedInfo = {
        employeeId: employeeInfo.id,
        projectId: projectInfo.id,
        startDate: allocation[0].start_date,
        likelyEndDate: newLikelyEndDate
      };
      compareProjectAllocationInfo(allocationInfo, expectedInfo);
    });
  });

  describe('delete', () => {
    it('should delete employee1 from project1', async () => {
      const employeeInfo = await Helper.insertEmployee(employees[0]);
      const projectInfo = await Helper.insertProject(projects[0]);
      await ProjectAllocationModel.create({
        employee_id: employeeInfo.id,
        project_id: projectInfo.id,
        start_date: allocation[0].start_date,
        likely_end_date: allocation[0].likely_end_date
      });

      const empIds = [employees[0].emp_id];
      await ProjectAllocation.delete({
        emp_ids: empIds,
        project_name: projects[0].name
      });

      const projectAllocationInfo = await ProjectAllocationModel.findAll({
        raw: true,
        where: {
          project_id: projectInfo.id
        }
      });
      expect(projectAllocationInfo).to.have.lengthOf(0);
    });

    it('should delete employee1 and employee2 from project1', async () => {
      const employee1Info = await Helper.insertEmployee(employees[0]);
      const employee2Info = await Helper.insertEmployee(employees[1]);
      const projectInfo = await Helper.insertProject(projects[0]);
      await ProjectAllocationModel.create({
        employee_id: employee1Info.id,
        project_id: projectInfo.id,
        start_date: allocation[0].start_date,
        likely_end_date: allocation[0].likely_end_date
      });
      await ProjectAllocationModel.create({
        employee_id: employee2Info.id,
        project_id: projectInfo.id,
        start_date: allocation[0].start_date,
        likely_end_date: allocation[0].likely_end_date
      });

      const empIds = [employees[0].emp_id, employees[1].emp_id];
      await ProjectAllocation.delete({
        emp_ids: empIds,
        project_name: projects[0].name
      });

      const projectAllocationInfo = await ProjectAllocationModel.findAll({
        raw: true,
        where: {
          project_id: projectInfo.id
        }
      });
      expect(projectAllocationInfo).to.have.lengthOf(0);
    });
  });

  const compareProjectAllocationInfo = (allocationInfo, expectedInfo) => {
    expect(allocationInfo).to.have.lengthOf(1);
    expect(allocationInfo[0]).to.have.property('id');
    expect(allocationInfo[0]).to.have.property(
      'employee_id',
      expectedInfo.employeeId
    );
    expect(allocationInfo[0]).to.have.property(
      'project_id',
      expectedInfo.projectId
    );
    expect(allocationInfo[0]).to.have.property(
      'start_date',
      expectedInfo.startDate
    );
    expect(allocationInfo[0]).to.have.property(
      'likely_end_date',
      expectedInfo.likelyEndDate
    );
  };
});
