const sequelize = require('../../utils/connect_sequelize');
const SkillsModel = require('../../models/skills')(sequelize);

class Skills {
  async insert(params) {
    await SkillsModel.create(params);
  }

  async select(params) {
    return SkillsModel.findAll({ raw: true, where: params });
  }

  async delete(params) {
    await SkillsModel.destroy({ where: params });
  }
}

module.exports = new Skills();
