const employeeController = require('./employee');
const projectController = require('./project');
const companyController = require('./company');
const clientController = require('./client');

class QueriesHandler {
  handleQueries(data) {
    let promises = data.map(queryData => {
      return this.handleQuery(queryData);
    });
    return Promise.all(promises)
      .then(result => {
        console.log('------ All queries executed --------');
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleQuery(queryData) {
    switch (queryData.resources[0]) {
      case 'employee':
        return employeeController.handleQuery(queryData);
      case 'company':
        return companyController.handleQuery(queryData);
      case 'project':
      case 'project_allocation':
        return projectController.handleQuery(queryData);
      case 'client':
        return clientController.handleQuery(queryData);
    }
    throw `Invalid table name: ${queryData.resources}`;
  }
}

module.exports = new QueriesHandler();
