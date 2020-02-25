const Employee = require('./employee');
const EmployeeSkills = require('./employee_skills');

class EmployeeController {
  handleQuery(queryInput) {
    let { queryType, resource, params } = queryInput;
    switch (resource) {
      case 'employee':
        return Employee.query(queryType, params);
      case 'employee_skills':
        return EmployeeSkills.query(queryType, params);
    }
  }
}

module.exports = new EmployeeController();
