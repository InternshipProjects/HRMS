const { Promise } = require('bluebird');

const sequelize = require('../../utils/connect_sequelize');
const EmployeeSkillsModel = require('../../models/employee_skills')(sequelize);
const Employee = require('./employee');
const Skills = require('./skills');

class EmployeeSkills {
  // params - {emp_id: string, skills: string[]}
  async insert(params) {
    const employeesInfo = await Employee.select({ emp_id: params.emp_id });
    const skills = params.skills;
    return Promise.mapSeries(skills, async skill => {
      await Skills.insert({ name: skill });
      const skillsInfo = await Skills.select({ name: skill });
      await EmployeeSkillsModel.create({
        employee_id: employeesInfo[0].id,
        skill_id: skillsInfo[0].id
      });
    });
  }

  //params: {emp_id: string}
  async select(params) {
    const employeesInfo = await Employee.select({ emp_id: params.emp_id });
    const skills = await EmployeeSkillsModel.findAll({
      raw: true,
      where: { employee_id: employeesInfo[0].id }
    });
    return Promise.mapSeries(skills, async skill => {
      const skillInfo = await Skills.select({ id: skill.skill_id });
      return skillInfo[0].name;
    });
  }

  //params: {emp_id: string, skills: string[]}
  async delete(params) {
    const employeeInfo = await Employee.select({ emp_id: params.emp_id });
    const skills = params.skills;
    const promises = skills.map(async skillName => {
      const skillInfo = await Skills.select({ name: skillName });
      await EmployeeSkillsModel.destroy({
        where: { employee_id: employeeInfo[0].id, skill_id: skillInfo[0].id }
      });
    });
    return Promise.all(promises);
  }
}

module.exports = new EmployeeSkills();
