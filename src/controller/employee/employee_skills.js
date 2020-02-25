const sequelize = require('../../utils/connect_sequelize');
const EmployeeSkillsModel = require('../../models/employee_skills')(sequelize);
const Employee = require('./employee');
const Skills = require('./skills');

class EmployeeSkills {
  async query(queryType, params) {
    const queries = {
      POST: this.insert,
      GET: this.select,
      DELETE: this.delete
    };
    try {
      await queries[queryType](params, this);
    } catch (error) {
      console.error(error);
      throw `Invalid query type: ${queryType}`;
    }
  }

  async insert(params, _this) {
    const employeeInfo = await Employee.select({ emp_id: params.emp_id });
    const skills = _this.getSkills(params);
    const promises = skills.map(async skill => {
      const skillId = await Skills.insert(skill);
      await EmployeeSkillsModel.create({
        employee_id: employeeInfo.id,
        skill_id: skillId
      });
    });
    await Promise.all(promises);
  }

  async select(params, _this) {
    const employeeInfo = await Employee.select({ emp_id: params.emp_id });
    const skillsInfo = await EmployeeSkillsModel.findAll({
      where: { employee_id: employeeInfo.id }
    });
    const promises = skillsInfo.map(async skillInfo => {
      return Skills.getSkillName(skillInfo.skill_id);
    });
    return Promise.all(promises).then(skills => {
      return skills;
    });
  }

  async delete(params, _this) {
    const employeeInfo = await Employee.select({ emp_id: params.emp_id });
    const skills = _this.getSkills(params);
    const promises = skills.map(async skillName => {
      const skillId = await Skills.getSkillId(skillName);
      await EmployeeSkillsModel.destroy({
        where: { employee_id: employeeInfo.id, skill_id: skillId }
      });
    });
    return Promise.all(promises);
  }

  getSkills(params) {
    const skills = params.skills
      .substring(1, params.skills.length - 1)
      .split(', ');
    return skills;
  }
}

module.exports = new EmployeeSkills();
