const Employee = require('./employee');
const EmployeeSkills = require('./employee_skills');
const CompanyEmployees = require('./company_employees');

class EmployeeController {
  handleQuery(queryInput) {
    let { queryType, resource, params } = queryInput;
    switch (resource) {
      case 'employee':
        return Employee.query(queryType, params);
      case 'employee_skills':
        return EmployeeSkills.query(queryType, params);
      case 'company_employees':
        return CompanyEmployees.query(queryType, params);
    }
  }
}

module.exports = new EmployeeController();
