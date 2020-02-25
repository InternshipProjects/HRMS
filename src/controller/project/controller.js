const Project = require('./project');
const ProjectAllocation = require('./project_allocation');

class ProjectController {
  handleQuery(queryInput) {
    const { queryType, resource, params } = queryInput;
    switch (resource) {
      case 'project':
        return Project.query(queryType, params);
      case 'allocate_project':
        return ProjectAllocation.query(queryType, params);
    }
  }
}

module.exports = new ProjectController();
