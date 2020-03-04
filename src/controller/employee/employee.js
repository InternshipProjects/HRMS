const sequelize = require('../../utils/connect_sequelize');
const EmployeeModel = require('../../models/employee')(sequelize);

class Employee {
  async insert(params) {
    await EmployeeModel.create(params);
  }

  async select(params) {
    return EmployeeModel.findAll({ raw: true, where: params });
  }

  async update(params) {
    await EmployeeModel.update(params, {
      where: { emp_id: params.emp_id }
    });
  }

  async delete(params) {
    await EmployeeModel.destroy({ where: params });
  }
}

module.exports = new Employee();
