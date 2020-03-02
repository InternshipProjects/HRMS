const expect = require('chai').expect;

const sequelize = require('../src/utils/connect_sequelize');
const ProjectAllocationModel = require('../src/models/project_allocation')(
  sequelize
);
const ProjectAllocation = require('../src/controller/project/project_allocation');
const { truncateTable, insertEmployee, insertProject } = require('./helpers');

describe('Project Allocation Table', () => {
  const data = {
    projects: [
      {
        name: 'todos',
        start_date: '2020-04-01',
        end_date: '2020-05-01'
      },
      {
        name: 'tic-tac-toe',
        start_date: '2020-08-08',
        end_date: '2020-07-09'
      }
    ],
    employees: [
      {
        emp_id: '471',
        name: 'dhanalakshmi narala',
        email: 'dhanalakshmi.narala@gmail.com',
        address: 'brahmapuri',
        phone_no: '1234567890'
      },
      {
        emp_id: '526',
        name: 'sailaja K',
        email: 'sailaja@gmail.com',
        address: 'amalapuram',
        phone_no: '0987654321'
      }
    ],
    allocation: [
      {
        emp_id: '471',
        project_name: 'todos',
        start_date: '2020-04-01',
        likely_end_date: '2020-05-01'
      },
      {
        emp_id: '526',
        project_name: 'tic-tac-toe',
        start_date: '2020-08-08',
        likely_end_date: '2020-07-09'
      }
    ]
  };

  beforeEach(() => {
    truncateTable('project_allocation');
    truncateTable('project');
    truncateTable('employee');
  });

  describe('insert', () => {
    it('should insert employee1 and project1', async () => {
      const employeeInfo = await insertEmployee(data.employees[0]);
      const projectInfo = await insertProject(data.projects[0]);
      await ProjectAllocation.insert(data.allocation[0], ProjectAllocation);
      const projectAlloctionInfo = await ProjectAllocationModel.findAll({
        raw: true,
        where: { employee_id: employeeInfo.id }
      });

      expect(projectAlloctionInfo).to.have.lengthOf(1);
      expect(projectAlloctionInfo[0]).to.have.property('id');
      expect(projectAlloctionInfo[0]).to.have.property(
        'employee_id',
        employeeInfo.id
      );
      expect(projectAlloctionInfo[0]).to.have.property(
        'project_id',
        projectInfo.id
      );
      expect(projectAlloctionInfo[0]).to.have.property(
        'start_date',
        data.allocation[0].start_date
      );
      expect(projectAlloctionInfo[0]).to.have.property(
        'likely_end_date',
        data.allocation[0].likely_end_date
      );
    });

    it('should insert employee2 and project2', async () => {
      const employeeInfo = await insertEmployee(data.employees[1]);
      const projectInfo = await insertProject(data.projects[1]);
      await ProjectAllocation.insert(data.allocation[1], ProjectAllocation);
      const projectAlloctionInfo = await ProjectAllocationModel.findAll({
        raw: true,
        where: { employee_id: employeeInfo.id }
      });

      expect(projectAlloctionInfo).to.have.lengthOf(1);
      expect(projectAlloctionInfo[0]).to.have.property('id');
      expect(projectAlloctionInfo[0]).to.have.property(
        'employee_id',
        employeeInfo.id
      );
      expect(projectAlloctionInfo[0]).to.have.property(
        'project_id',
        projectInfo.id
      );
      expect(projectAlloctionInfo[0]).to.have.property(
        'start_date',
        data.allocation[1].start_date
      );
      expect(projectAlloctionInfo[0]).to.have.property(
        'likely_end_date',
        data.allocation[1].likely_end_date
      );
    });
  });

  describe('select', () => {
    it('should select employee project details based on emp_id', async () => {
      const employeeInfo = await insertEmployee(data.employees[0]);
      const projectInfo = await insertProject(data.projects[0]);
      await ProjectAllocationModel.create({
        employee_id: employeeInfo.id,
        project_id: projectInfo.id,
        start_date: data.allocation[0].start_date,
        likely_end_date: data.allocation[0].likely_end_date
      });
      const projectAllocationInfo = await ProjectAllocation.select(
        {
          emp_id: data.employees[0].emp_id
        },
        ProjectAllocation
      );
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
      const employee1Info = await insertEmployee(data.employees[0]);
      const employee2Info = await insertEmployee(data.employees[1]);
      const projectInfo = await insertProject(data.projects[0]);
      await ProjectAllocationModel.create({
        employee_id: employee1Info.id,
        project_id: projectInfo.id,
        start_date: data.allocation[0].start_date,
        likely_end_date: data.allocation[0].likely_end_date
      });
      await ProjectAllocationModel.create({
        employee_id: employee2Info.id,
        project_id: projectInfo.id,
        start_date: data.allocation[0].start_date,
        likely_end_date: data.allocation[0].likely_end_date
      });

      const projectAllocationInfo = await ProjectAllocation.select(
        {
          project_name: data.projects[0].name
        },
        ProjectAllocation
      );
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
          data.allocation[0].start_date
        );
        expect(allocationInfo).to.have.property(
          'likely_end_date',
          data.allocation[0].likely_end_date
        );
      });
    });
  });

  describe('update', () => {
    it("should update employee1's project1 start_date", async () => {
      const employeeInfo = await insertEmployee(data.employees[0]);
      const projectInfo = await insertProject(data.projects[0]);
      await ProjectAllocationModel.create({
        employee_id: employeeInfo.id,
        project_id: projectInfo.id,
        start_date: data.allocation[0].start_date,
        likely_end_date: data.allocation[0].likely_end_date
      });

      const newStartDate = '2020-04-09';
      await ProjectAllocation.update(
        {
          emp_id: data.employees[0].emp_id,
          project_name: data.projects[0].name,
          start_date: newStartDate
        },
        ProjectAllocation
      );

      const projectAllocationInfo = await ProjectAllocationModel.findAll({
        raw: true,
        where: {
          employee_id: employeeInfo.id
        }
      });
      expect(projectAllocationInfo).to.have.lengthOf(1);
      expect(projectAllocationInfo[0]).to.have.property(
        'employee_id',
        employeeInfo.id
      );
      expect(projectAllocationInfo[0]).to.have.property(
        'project_id',
        projectInfo.id
      );
      expect(projectAllocationInfo[0]).to.have.property(
        'start_date',
        newStartDate
      );
      expect(projectAllocationInfo[0]).to.have.property(
        'likely_end_date',
        data.allocation[0].likely_end_date
      );
    });

    it("should update employee1's project1 likely_end_date", async () => {
      const employeeInfo = await insertEmployee(data.employees[0]);
      const projectInfo = await insertProject(data.projects[0]);
      await ProjectAllocationModel.create({
        employee_id: employeeInfo.id,
        project_id: projectInfo.id,
        start_date: data.allocation[0].start_date,
        likely_end_date: data.allocation[0].likely_end_date
      });

      const newLikelyEndDate = '2020-05-19';
      await ProjectAllocation.update(
        {
          emp_id: data.employees[0].emp_id,
          project_name: data.projects[0].name,
          likely_end_date: newLikelyEndDate
        },
        ProjectAllocation
      );

      const projectAllocationInfo = await ProjectAllocationModel.findAll({
        raw: true,
        where: {
          employee_id: employeeInfo.id
        }
      });
      expect(projectAllocationInfo).to.have.lengthOf(1);
      expect(projectAllocationInfo[0]).to.have.property(
        'employee_id',
        employeeInfo.id
      );
      expect(projectAllocationInfo[0]).to.have.property(
        'project_id',
        projectInfo.id
      );
      expect(projectAllocationInfo[0]).to.have.property(
        'start_date',
        data.allocation[0].start_date
      );
      expect(projectAllocationInfo[0]).to.have.property(
        'likely_end_date',
        newLikelyEndDate
      );
    });
  });

  describe('delete', () => {
    it('should delete employee1 from project1', async () => {
      const employeeInfo = await insertEmployee(data.employees[0]);
      const projectInfo = await insertProject(data.projects[0]);
      await ProjectAllocationModel.create({
        employee_id: employeeInfo.id,
        project_id: projectInfo.id,
        start_date: data.allocation[0].start_date,
        likely_end_date: data.allocation[0].likely_end_date
      });
      const empIds = [data.employees[0].emp_id];
      await ProjectAllocation.delete(
        {
          emp_ids: empIds,
          project_name: data.projects[0].name
        },
        ProjectAllocation
      );
      const projectAllocationInfo = await ProjectAllocationModel.findAll({
        raw: true,
        where: {
          project_id: projectInfo.id
        }
      });
      expect(projectAllocationInfo).to.have.lengthOf(0);
    });

    it('should delete employee1 and employee2 from project1', async () => {
      const employee1Info = await insertEmployee(data.employees[0]);
      const employee2Info = await insertEmployee(data.employees[1]);
      const projectInfo = await insertProject(data.projects[0]);
      await ProjectAllocationModel.create({
        employee_id: employee1Info.id,
        project_id: projectInfo.id,
        start_date: data.allocation[0].start_date,
        likely_end_date: data.allocation[0].likely_end_date
      });
      await ProjectAllocationModel.create({
        employee_id: employee2Info.id,
        project_id: projectInfo.id,
        start_date: data.allocation[0].start_date,
        likely_end_date: data.allocation[0].likely_end_date
      });

      const empIds = [data.employees[0].emp_id, data.employees[1].emp_id];
      await ProjectAllocation.delete(
        {
          emp_ids: empIds,
          project_name: data.projects[0].name
        },
        ProjectAllocation
      );
      const projectAllocationInfo = await ProjectAllocationModel.findAll({
        raw: true,
        where: {
          project_id: projectInfo.id
        }
      });
      expect(projectAllocationInfo).to.have.lengthOf(0);
    });
  });
});
