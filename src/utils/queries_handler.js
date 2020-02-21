const Promise = require('bluebird');
const employeeController = require('../controller/employee');
const projectController = require('../controller/project');
const companyController = require('../controller/company');
const clientController = require('../controller/client');

class QueriesHandler {
  handleQueries(queriesInput) {
    return Promise.mapSeries(queriesInput, input => {
      return this.handleQuery(input);
    })
      .then(results => {
        console.log('------- All queries executed -----');
        console.log(results);
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleQuery(queryInput) {
    const controllers = {
      employee: employeeController,
      company: companyController,
      project: projectController,
      project_allocation: projectController,
      client: clientController
    };
    try {
      return controllers[queryInput.resources[0]].handleQuery(queryInput);
    } catch (error) {
      console.error(error);
      throw `Invalid table name: ${queryInput.resources}`;
    }
  }
}

module.exports = new QueriesHandler();
