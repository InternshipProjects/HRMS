const expect = require('chai').expect;
const { Promise } = require('bluebird');

const EmployeeSkills = require('../src/controller/employee/employee_skills');
const { truncateTable, insertEmployee } = require('./helpers');
const sequelize = require('../src/utils/connect_sequelize');
const EmployeeSkillsModel = require('../src/models/employee_skills')(sequelize);
const SkillsModel = require('../src/models/skills')(sequelize);

describe('Employee skills Table', () => {
  const employee1 = {
    emp_id: '471',
    name: 'dhanalakshmi narala',
    email: 'dhanalakshmi.narala@gmail.com',
    address: 'brahmapuri',
    phone_no: '1234567890'
  };
  const employee1Skills = ['Python', 'Java', 'C', 'Javascript'];

  const employee2 = {
    emp_id: '526',
    name: 'sailaja K',
    email: 'sailaja@gmail.com',
    address: 'amalapuram',
    phone_no: '0987654321'
  };
  const employee2Skills = ['C', 'Java', 'Machine learning'];

  beforeEach(async () => {
    await truncateTable('employee_skills');
    await truncateTable('employee');
    await truncateTable('skills');
  });

  describe('insert', () => {
    it('should insert employee1 with skills', async () => {
      const employeeInfo = await insertEmployee(employee1);
      await EmployeeSkills.insert(
        { emp_id: employee1.emp_id, skills: employee1Skills },
        EmployeeSkills
      );

      const employeeSkills = await EmployeeSkillsModel.findAll({
        raw: true,
        where: { employee_id: employeeInfo.id }
      });
      expect(employeeSkills).to.have.lengthOf(employee1Skills.length);

      const promises = employeeSkills.map(async (employeeSkill, index) => {
        expect(employeeSkill).to.have.property('employee_id', employeeInfo.id);
        expect(employeeSkill).to.have.property('skill_id');
        const skillInfo = await SkillsModel.findAll({
          raw: true,
          where: { id: employeeSkill.skill_id }
        });
        expect(skillInfo).to.have.lengthOf(1);
        expect(skillInfo[0]).to.have.property(
          'name',
          employee1Skills[index].toLowerCase()
        );
      });
      return Promise.all(promises);
    });

    it('should insert employee2 with skills', async () => {
      const employeeInfo = await insertEmployee(employee2);
      await EmployeeSkills.insert(
        {
          emp_id: employee2.emp_id,
          skills: employee2Skills
        },
        EmployeeSkills
      );

      const employeeSkills = await EmployeeSkillsModel.findAll({
        raw: true,
        where: { employee_id: employeeInfo.id }
      });
      expect(employeeSkills).to.have.lengthOf(employee2Skills.length);

      const promises = employeeSkills.map(async (employeeSkill, index) => {
        expect(employeeSkill).to.have.property('employee_id', employeeInfo.id);
        expect(employeeSkill).to.have.property('skill_id');
        const skillInfo = await SkillsModel.findAll({
          raw: true,
          where: { id: employeeSkill.skill_id }
        });
        expect(skillInfo).to.have.lengthOf(1);
        expect(skillInfo[0]).to.have.property(
          'name',
          employee2Skills[index].toLowerCase()
        );
      });
      return Promise.all(promises);
    });
  });

  describe('select', () => {
    it('should select employee1 skills', async () => {
      const employeeInfo = await insertEmployee(employee1);
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
        emp_id: employee1.emp_id
      });
      expect(employeeSkills).to.deep.equal(employee1Skills);
    });

    it('should select employee2 skills', async () => {
      const employeeInfo = await insertEmployee(employee2);
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
        emp_id: employee2.emp_id
      });
      expect(employeeSkills).to.deep.equal(employee2Skills);
    });
  });

  describe('delete', () => {
    it('should delete employee1 skills', async () => {
      const employeeInfo = await insertEmployee(employee1);
      await insertEmployeeSkills(employeeInfo.id, employee1Skills);

      const skillsForDelete = employee1Skills.slice(0, 2);
      await EmployeeSkills.delete(
        {
          emp_id: employee1.emp_id,
          skills: skillsForDelete
        },
        EmployeeSkills
      );
      const skillsRemaining = await getEmployeeSkills(employeeInfo.id);
      expect(skillsRemaining).to.deep.equal(employee1Skills.slice(2));
    });

    it('should delete employee2 skills', async () => {
      const employeeInfo = await insertEmployee(employee2);
      await insertEmployeeSkills(employeeInfo.id, employee2Skills);

      const skillsForDelete = employee2Skills.slice(0, 2);
      await EmployeeSkills.delete(
        {
          emp_id: employee2.emp_id,
          skills: skillsForDelete
        },
        EmployeeSkills
      );
      const skillsRemaining = await getEmployeeSkills(employeeInfo.id);
      expect(skillsRemaining).to.deep.equal(employee2Skills.slice(2));
    });
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
