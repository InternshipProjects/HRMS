const sequelize = require('../utils/connect_sequelize');
const SkillsModel = require('../models/skills')(sequelize);

class Skills {
  async selectOrInsert(params) {
    const skillName = params.name.toLowerCase();
    const [skill, isCreated] = await SkillsModel.findOrCreate({
      raw: true,
      where: { name: skillName },
      defaults: {
        name: skillName
      }
    });
    return skill.dataValues;
  }

  async select(params) {
    return SkillsModel.findAll({ raw: true, where: params });
  }

  async delete(params) {
    await SkillsModel.destroy({ where: params });
  }
}

module.exports = new Skills();
