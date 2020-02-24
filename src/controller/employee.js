const sequelize = require('../utils/connect_sequelize');
const EmployeeModel = require('../models/employee')(sequelize);
const EmployeeSkillsModel = require('../models/employee_skills')(sequelize);
const SkillsModel = require('../models/skills')(sequelize);

class EmployeeController {
  handleQuery(queryInput) {
    let { queryType, resource, params } = queryInput;
    switch (resource) {
      case 'employee':
        let employee = new Employee();
        return employee.query(queryType, params);
      case 'employee_skills':
        let employeeSkills = new EmployeeSkills();
        return employeeSkills.query(queryType, params);
    }
  }
}

class Employee {
  async query(queryType, params) {
    const queries = {
      POST: this.insert,
      GET: this.select,
      PATCH: this.update,
      DELETE: this.delete
    };
    try {
      await queries[queryType](params);
    } catch (error) {
      console.error(error);
      throw `Invalid query type: ${queryType}`;
    }
  }

  async insert(params) {
    await EmployeeModel.create(params);
  }

  async select(params) {
    let result = await EmployeeModel.findAll({ where: params });
    return result[0].dataValues;
  }

  async update(params) {
    await EmployeeModel.update(params, {
      where: { emp_id: params['emp_id'] }
    });
  }

  async delete(params) {
    await EmployeeModel.destroy({ where: params });
  }
}

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
    let employee = new Employee();
    let employeeInfo = await employee.select({ emp_id: params.emp_id });
    let skills = _this.getSkills(params);
    let skillsObj = new Skills();
    let promises = skills.map(async skill => {
      let skillId = await skillsObj.insert(skill);
      await EmployeeSkillsModel.create({
        employee_id: employeeInfo.id,
        skill_id: skillId
      });
    });
    await Promise.all(promises);
  }

  async select(params, _this) {
    let employee = new Employee();
    let employeeInfo = await employee.select({ emp_id: params.emp_id });
    let skillsInfo = await EmployeeSkillsModel.findAll({
      where: { employee_id: employeeInfo.id }
    });
    let skillsObj = new Skills();
    let promises = skillsInfo.map(async skillInfo => {
      await skillsObj.getSkillName(skillInfo.skill_id);
    });
    return Promise.all(promises).then(skills => {
      console.log(skills);
      return skills;
    });
  }

  async delete(params, _this) {
    let employee = new Employee();
    let employeeInfo = await employee.select({ emp_id: params.emp_id });
    let skills = _this.getSkills(params);
    let promises = skills.map(async skillName => {
      let skillObj = new Skills();
      let skillId = await skillObj.getSkillId(skillName);
      await EmployeeSkillsModel.destroy({
        where: { employee_id: employeeInfo.id, skill_id: skillId }
      });
    });
    return Promise.all(promises);
  }

  getSkills(params) {
    let skills = params.skills
      .substring(1, params.skills.length - 1)
      .split(', ');
    return skills;
  }
}

class Skills {
  async insert(skillName) {
    let result = await SkillsModel.create({
      name: skillName
    });
    return result.dataValues.id;
  }

  async getSkillName(skillId) {
    let results = await SkillsModel.findAll({ where: { id: skillId } });
    return results[0].dataValues.name;
  }

  async getSkillId(skillName) {
    let result = await SkillsModel.findAll({ where: { name: skillName } });
    return result[0].dataValues.id;
  }

  async delete(skillName) {
    await SkillsModel.destroy({ where: { name: skillName } });
  }
}

module.exports = new EmployeeController();
