const Project = require('./project');
const ProjectAllocation = require('./project_allocation');
const EmployeeAvailability = require('./employee_availability');
const ClientProjects = require('./client_project');

class ProjectController {
  handleQuery(queryInput) {
    const { queryType, resource, params } = queryInput;
    switch (resource) {
      case 'project':
        return Project.query(queryType, params);
      case 'allocate_project':
        return ProjectAllocation.query(queryType, params);
      case 'client_projects':
        return ClientProjects.query(queryType, params);
      case 'availability':
        return EmployeeAvailability.query(queryType, params);
    }
  }
}

module.exports = new ProjectController();
