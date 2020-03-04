const sequelize = require('../utils/connect_sequelize');
const ProjectModel = require('../models/project')(sequelize);

class Project {
  async insert(params) {
    await ProjectModel.create(params);
  }

  async select(params) {
    return ProjectModel.findAll({ raw: true, where: params });
  }

  async update(params) {
    await ProjectModel.update(params, { where: { name: params['name'] } });
  }

  async delete(params) {
    await ProjectModel.destroy({ where: params });
  }
}

module.exports = new Project();
