const sequelize = require('../../utils/connect_sequelize');
const SkillsModel = require('../../models/skills')(sequelize);

class Skills {
  async insert(skillName) {
    const result = await SkillsModel.create({
      name: skillName
    });
    return result.dataValues.id;
  }

  async getSkillName(skillId) {
    const results = await SkillsModel.findAll({ where: { id: skillId } });
    return results[0].dataValues.name;
  }

  async getSkillId(skillName) {
    const result = await SkillsModel.findAll({ where: { name: skillName } });
    return result[0].dataValues.id;
  }

  async delete(skillName) {
    await SkillsModel.destroy({ where: { name: skillName } });
  }
}

module.exports = new Skills();
