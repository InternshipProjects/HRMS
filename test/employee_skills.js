const expect = require('chai').expect;
const { Promise } = require('bluebird');

const EmployeeSkills = require('../src/controller/employee_skills');
const Helper = require('./helper');
const sequelize = require('../src/utils/connect_sequelize');
const EmployeeSkillsModel = require('../src/models/employee_skills')(sequelize);
const SkillsModel = require('../src/models/skills')(sequelize);
const { employees } = require('./data');

describe('Employee skills Table', () => {
  const employee1Skills = ['Python', 'Java', 'C', 'Javascript'];
  const employee2Skills = ['C', 'Java', 'Machine learning'];

  beforeEach(async () => {
    await Helper.truncateTable('employee_skills');
    await Helper.truncateTable('employee');
    await Helper.truncateTable('skills');
  });

  describe('insert', () => {
    it('should insert employee1 with skills', async () => {
      const employeeInfo = await Helper.insertEmployee(employees[0]);
      await EmployeeSkills.insert({
        emp_id: employees[0].emp_id,
        skills: employee1Skills
      });

      const employeeSkills = await EmployeeSkillsModel.findAll({
        raw: true,
        where: { employee_id: employeeInfo.id }
      });

      await compareEmployeeSkills(
        employeeSkills,
        employee1Skills,
        employeeInfo.id
      );
    });

    it('should insert employee2 with skills', async () => {
      const employeeInfo = await Helper.insertEmployee(employees[1]);
      await EmployeeSkills.insert(
        {
          emp_id: employees[1].emp_id,
          skills: employee2Skills
        },
        EmployeeSkills
      );

      const employeeSkills = await EmployeeSkillsModel.findAll({
        raw: true,
        where: { employee_id: employeeInfo.id }
      });

      await compareEmployeeSkills(
        employeeSkills,
        employee2Skills,
        employeeInfo.id
      );
    });
  });

  describe('select', () => {
    it('should select employee1 skills', async () => {
      const employeeInfo = await Helper.insertEmployee(employees[0]);
      await Promise.mapSeries(employee1Skills, async skill => {
        await SkillsModel.create({ name: skill });
        const skillInfo = await SkillsModel.findOne({
          raw: true,
          where: { name: skill }
        });
        await EmployeeSkillsModel.create({
          employee_id: employeeInfo.id,
          skill_id: skillInfo.id
        });
      });

      const employeeSkills = await EmployeeSkills.select({
        emp_id: employees[0].emp_id
      });
      expect(employeeSkills).to.deep.equal(employee1Skills);
    });

    it('should select employee2 skills', async () => {
      const employeeInfo = await Helper.insertEmployee(employees[1]);
      await Promise.mapSeries(employee2Skills, async skill => {
        await SkillsModel.create({ name: skill });
        const skillInfo = await SkillsModel.findOne({
          raw: true,
          where: { name: skill }
        });
        await EmployeeSkillsModel.create({
          employee_id: employeeInfo.id,
          skill_id: skillInfo.id
        });
      });

      const employeeSkills = await EmployeeSkills.select({
        emp_id: employees[1].emp_id
      });
      expect(employeeSkills).to.deep.equal(employee2Skills);
    });
  });

  describe('delete', () => {
    it('should delete employee1 skills', async () => {
      const employeeInfo = await Helper.insertEmployee(employees[0]);
      await insertEmployeeSkills(employeeInfo.id, employee1Skills);

      const skillsForDelete = employee1Skills.slice(0, 2);
      await EmployeeSkills.delete(
        {
          emp_id: employees[0].emp_id,
          skills: skillsForDelete
        },
        EmployeeSkills
      );
      const skillsRemaining = await getEmployeeSkills(employeeInfo.id);
      expect(skillsRemaining).to.deep.equal(employee1Skills.slice(2));
    });

    it('should delete employee2 skills', async () => {
      const employeeInfo = await Helper.insertEmployee(employees[1]);
      await insertEmployeeSkills(employeeInfo.id, employee2Skills);

      const skillsForDelete = employee2Skills.slice(0, 2);
      await EmployeeSkills.delete(
        {
          emp_id: employees[1].emp_id,
          skills: skillsForDelete
        },
        EmployeeSkills
      );
      const skillsRemaining = await getEmployeeSkills(employeeInfo.id);
      expect(skillsRemaining).to.deep.equal(employee2Skills.slice(2));
    });
  });

  const insertEmployeeSkills = async (employeeId, skills) => {
    await Promise.mapSeries(skills, async skill => {
      await SkillsModel.create({ name: skill });
      const skillInfo = await SkillsModel.findOne({
        raw: true,
        where: { name: skill }
      });
      await EmployeeSkillsModel.create({
        employee_id: employeeId,
        skill_id: skillInfo.id
      });
    });
  };

  const compareEmployeeSkills = async (
    employeeSkills,
    expectedSkills,
    employeeId
  ) => {
    expect(employeeSkills).to.have.lengthOf(expectedSkills.length);
    const promises = employeeSkills.map(async (employeeSkill, index) => {
      expect(employeeSkill).to.have.property('employee_id', employeeId);
      expect(employeeSkill).to.have.property('skill_id');
      const skillInfo = await SkillsModel.findAll({
        raw: true,
        where: { id: employeeSkill.skill_id }
      });
      expect(skillInfo).to.have.lengthOf(1);
      expect(skillInfo[0]).to.have.property(
        'name',
        expectedSkills[index].toLowerCase()
      );
    });
    return Promise.all(promises);
  };

  const getEmployeeSkills = async employeeId => {
    await EmployeeSkillsModel.belongsTo(SkillsModel, {
      foreignKey: 'skill_id'
    });

    const remainingEmployeeSkills = await EmployeeSkillsModel.findAll({
      raw: true,
      where: {
        employee_id: employeeId
      },
      attributes: [],
      include: [
        {
          model: SkillsModel,
          attributes: ['name']
        }
      ]
    });

    const skillsRemaining = remainingEmployeeSkills.reduce(
      (skillsLeft, skillObj) => {
        return skillsLeft.concat(Object.values(skillObj));
      },
      []
    );
    return skillsRemaining;
  };
});
