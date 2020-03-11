const sequelize = require('../utils/connect_sequelize');
const EmployeeSkillsModel = require('../models/employee_skills')(sequelize);
const { getEmployeeFromDB } = require('./employee');
const { insertSkillInDB, getSkillInfoFromDB } = require('./skills');

// params - { emp_id: string, skills: string[] }
const insertEmployeeSkillsInDB = async params => {
  const skills = params.skills;
  const employeeInfo = await getEmployeeFromDB({ emp_id: params.emp_id });
  const promises = skills.map(async skill => {
    await insertSkillInDB({ name: skill });
    const skillInfo = await getSkillInfoFromDB({ name: skill });
    return EmployeeSkillsModel.create({
      employee_id: employeeInfo.id,
      skill_id: skillInfo.id
    });
  });
  const insertedRecords = await Promise.all(promises);
  return insertedRecords.length === skills.length;
};

// params: { emp_id: string }
const getEmployeeSkillsFromDB = async params => {
  const employeesInfo = await getEmployeeFromDB({ emp_id: params.emp_id });
  const skills = await EmployeeSkillsModel.findAll({
    raw: true,
    where: { employee_id: employeesInfo.id }
  });
  const promises = skills.map(async skill => {
    const skillInfo = await getSkillInfoFromDB({ id: skill.skill_id });
    return skillInfo.name;
  });
  return Promise.all(promises);
};

// params: { emp_id: string, skills: string[] }
const deleteEmployeeSkillsFromDB = async params => {
  const employeeInfo = await getEmployeeFromDB({ emp_id: params.emp_id });
  const promises = params.skills.map(async skillName => {
    const skillInfo = await getSkillInfoFromDB({ name: skillName });
    await EmployeeSkillsModel.destroy({
      where: { employee_id: employeeInfo.id, skill_id: skillInfo.id }
    });
  });
  return Promise.all(promises);
};

module.exports = {
  insertEmployeeSkillsInDB,
  getEmployeeSkillsFromDB,
  deleteEmployeeSkillsFromDB
};
