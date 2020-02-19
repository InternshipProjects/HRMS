const sequelize = require('../process/connect_sequelize');
const EmployeeModel = require('../models/employee')(sequelize);

class EmployeeController {
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
        return this.update(resources, params);
      case 'DELETE':
        return this.delete(resources, params);
    }
    throw `Invalid query type: ${queryType}`;
  }

  insert(resources, params) {
    return EmployeeModel.create(params);
  }

  select(resources, params) {
    return EmployeeModel.findAll({ where: params }).then(result => {
      if (result) {
        console.log(JSON.stringify(result, null, 4));
      }
    });
  }

  update(resources, params) {
    return EmployeeModel.update(params, {
      where: { emp_id: params['emp_id'] }
    });
  }

  delete(resources, params) {
    return EmployeeModel.destroy({ where: params });
  }
}

module.exports = new EmployeeController();
