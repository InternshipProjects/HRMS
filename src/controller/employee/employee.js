const sequelize = require('../../utils/connect_sequelize');
const EmployeeModel = require('../../models/employee')(sequelize);

class Employee {
  async query(queryType, params) {
    const queries = {
      POST: this.insert,
      GET: this.select,
      PATCH: this.update,
      DELETE: this.delete
    };
    try {
      return queries[queryType](params);
    } catch (error) {
      console.error(error);
      throw `Invalid query type: ${queryType}`;
    }
  }

  async insert(params) {
    await EmployeeModel.create(params);
  }

  async select(params) {
    const results = await EmployeeModel.findAll({ raw: true, where: params });
    return results;
  }

  async update(params) {
    await EmployeeModel.update(params, {
      where: { emp_id: params['emp_id'] }
    });
  }

  async delete(params) {
    await EmployeeModel.destroy({ where: params });
  }
}

module.exports = new Employee();
