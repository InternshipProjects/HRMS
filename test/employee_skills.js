const expect = require('chai').expect;

const {
  insertEmployeeSkillsInDB,
  getEmployeeSkillsFromDB,
  deleteEmployeeSkillsFromDB
} = require('../src/services/employee_skills');
const { truncateTable, insertEmployee } = require('./helper');
const sequelize = require('../src/utils/connect_sequelize');
const EmployeeSkillsModel = require('../src/models/employee_skills')(sequelize);
const SkillsModel = require('../src/models/skills')(sequelize);
const { employees } = require('./data');

describe('Employee skills Table', () => {
  const employee1Skills = ['Python', 'Java', 'C', 'Javascript'];
  const employee2Skills = ['C', 'Java', 'Machine learning'];

  beforeEach(async () => {
    await truncateTable('employee_skills');
    await truncateTable('employee');
    await truncateTable('skills');
  });

  describe('insert', () => {
    it('should insert employee1 with skills', async () => {
      const employeeInfo = await insertEmployee(employees[0]);
      await insertEmployeeSkillsInDB({
        emp_id: employees[0].emp_id,
        skills: employee1Skills
      });

      const employeeSkillsInfo = await EmployeeSkillsModel.findAll({
        raw: true,
        where: { employee_id: employeeInfo.id }
      });

      await compareEmployeeSkills(
        employeeSkillsInfo,
        employee1Skills,
        employeeInfo.id
      );
    });

    it('should insert employee2 with skills', async () => {
      const employeeInfo = await insertEmployee(employees[1]);
      await insertEmployeeSkillsInDB({
        emp_id: employees[1].emp_id,
        skills: employee2Skills
      });

      const employeeSkillsInfo = await EmployeeSkillsModel.findAll({
        raw: true,
        where: { employee_id: employeeInfo.id }
      });

      await compareEmployeeSkills(
        employeeSkillsInfo,
        employee2Skills,
        employeeInfo.id
      );
    });
  });

  describe('select', () => {
    it('should select employee1 skills', async () => {
      const employeeInfo = await insertEmployee(employees[0]);
      const promises = employee1Skills.map(async skill => {
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
      await Promise.all(promises);

      let employeeSkills = await getEmployeeSkillsFromDB({
        emp_id: employees[0].emp_id
      });
      compareSkills(employeeSkills, employee1Skills);
    });

    it('should select employee2 skills', async () => {
      const employeeInfo = await insertEmployee(employees[1]);
      const promises = employee2Skills.map(async skill => {
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
      await Promise.all(promises);

      const employeeSkills = await getEmployeeSkillsFromDB({
        emp_id: employees[1].emp_id
      });
      compareSkills(employeeSkills, employee2Skills);
    });
  });

  describe('delete', () => {
    it('should delete employee1 skills', async () => {
      const employeeInfo = await insertEmployee(employees[0]);
      await insertEmployeeSkills(employeeInfo.id, employee1Skills);

      const skillsForDelete = employee1Skills.slice(0, 2);
      await deleteEmployeeSkillsFromDB({
        emp_id: employees[0].emp_id,
        skills: skillsForDelete
      });
      const skillsRemaining = await getEmployeeSkills(employeeInfo.id);
      compareSkills(skillsRemaining, employee1Skills.slice(2));
    });

    it('should delete employee2 skills', async () => {
      const employeeInfo = await insertEmployee(employees[1]);
      await insertEmployeeSkills(employeeInfo.id, employee2Skills);

      const skillsForDelete = employee2Skills.slice(0, 2);
      await deleteEmployeeSkillsFromDB({
        emp_id: employees[1].emp_id,
        skills: skillsForDelete
      });
      const skillsRemaining = await getEmployeeSkills(employeeInfo.id);
      compareSkills(skillsRemaining, employee2Skills.slice(2));
    });
  });

  const insertEmployeeSkills = async (employeeId, skills) => {
    const promises = skills.map(async skill => {
      skill = skill.toLowerCase();
      await SkillsModel.create({ name: skill.toLowerCase() });
      const skillInfo = await SkillsModel.findOne({
        raw: true,
        where: { name: skill }
      });
      await EmployeeSkillsModel.create({
        employee_id: employeeId,
        skill_id: skillInfo.id
      });
    });
    return Promise.all(promises);
  };

  const compareEmployeeSkills = async (
    employeeSkillsInfo,
    expectedSkills,
    employeeId
  ) => {
    expect(employeeSkillsInfo).to.have.lengthOf(expectedSkills.length);
    const promises = employeeSkillsInfo.map(async (employeeSkill, index) => {
      expect(employeeSkill).to.have.property('employee_id', employeeId);
      expect(employeeSkill).to.have.property('skill_id');
      const skillInfo = await SkillsModel.findAll({
        raw: true,
        where: { id: employeeSkill.skill_id }
      });
      expect(skillInfo).to.have.lengthOf(1);
      return skillInfo[0].name;
    });
    const employeeSkills = await Promise.all(promises);
    compareSkills(employeeSkills, expectedSkills);
  };

  const compareSkills = (skills, expectedSkills) => {
    skills = skills.sort().map(skill => skill.toLowerCase());
    expectedSkills = expectedSkills.sort().map(skill => skill.toLowerCase());
    expect(skills).deep.equal(expectedSkills);
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
