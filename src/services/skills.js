const sequelize = require('../utils/connect_sequelize');
const SkillsModel = require('../models/skills')(sequelize);

const insertSkillInDB = async params => {
  const skill = await SkillsModel.create({ name: params.name.toLowerCase() });
  return skill ? true : false;
};

const getSkillInfoFromDB = async params => {
  if (params.name) {
    params.name = params.name.toLowerCase();
  }
  return SkillsModel.findOne({ raw: true, where: params });
};

const deleteSkillFromDB = async params => {
  const skill = await SkillsModel.destroy({ where: params });
  return skill ? true : false;
};

module.exports = { insertSkillInDB, getSkillInfoFromDB, deleteSkillFromDB };
