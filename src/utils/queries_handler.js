const Promise = require('bluebird');
const employeeController = require('../controller/employee/controller');
const projectController = require('../controller/project/controller');
const companyController = require('../controller/company');
const clientController = require('../controller/client');

class QueriesHandler {
  handleQueries(queriesInput) {
    return Promise.mapSeries(queriesInput, input => {
      return this.handleQuery(input);
    })
      .then(results => {
        console.log('------- All queries executed -----');
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleQuery(queryInput) {
    const controllers = {
      company: companyController,

      employee: employeeController,
      employee_skills: employeeController,
      company_employees: employeeController,

      client: clientController,

      project: projectController,
      allocate_project: projectController,
      client_projects: projectController,
      availability: projectController
    };
    try {
      return controllers[queryInput.resource].handleQuery(queryInput);
    } catch (error) {
      console.error(error);
      throw `Invalid table name: ${queryInput.resource}`;
    }
  }
}

module.exports = new QueriesHandler();
