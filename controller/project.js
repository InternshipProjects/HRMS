const sequelize = require('../process/connect_sequelize');
const ProjectModel = require('../models/project')(sequelize);

class ProjectController {
  handleQuery(input) {
    const queryType = input.queryType;
    const resources = input.resources;
    const params = input.params;
    switch (queryType) {
      case 'POST':
        return this.insert(resources, params);
      case 'GET':
        return this.select(resources, params);
      case 'PATCH':
        return this.update(input.resources, params);
      case 'DELETE':
        return this.delete(input.resources, params);
    }
    throw `Invalid query type: ${queryType}`;
  }

  insert(resources, params) {
    return ProjectModel.create(params);
  }

  select(resources, params) {
    return ProjectModel.findAll({ where: params }).then(result => {
      if (result) {
        console.log(JSON.stringify(result, null, 4));
      }
    });
  }

  update(resources, params) {
    return ProjectModel.update({ params }, { where: { name: params['name'] } });
  }

  delete(resources, params) {
    return ProjectModel.destroy({ where: params });
  }
}

module.exports = new ProjectController();
