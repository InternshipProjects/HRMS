const sequelize = require('../utils/connect_sequelize');
const ProjectModel = require('../models/project')(sequelize);

class ProjectController {
  handleQuery(queryInput) {
    const queries = {
      POST: this.insert,
      GET: this.select,
      PATCH: this.update,
      DELETE: this.delete
    };
    const { queryType, resources, params } = queryInput;
    try {
      return queries[queryType](resources, params);
    } catch (error) {
      console.error(error);
      throw `Invalid query type: ${queryType}`;
    }
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
