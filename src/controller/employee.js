const sequelize = require('../utils/connect_sequelize');
const EmployeeModel = require('../models/employee')(sequelize);

class EmployeeController {
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
