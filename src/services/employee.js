const sequelize = require('../utils/connect_sequelize');
const EmployeeModel = require('../models/employee')(sequelize);

const insertEmployeeInDB = async params => {
  const employee = await EmployeeModel.create(params);
  return employee ? true : false;
};

const getEmployeeFromDB = async params => {
  return EmployeeModel.findOne({ raw: true, where: params });
};

const updateEmployeeInDB = async params => {
  const employee = await EmployeeModel.update(params, {
    where: { emp_id: params.emp_id }
  });
  return employee ? true : false;
};

const deleteEmployeeFromDB = async params => {
  const employee = await EmployeeModel.destroy({ where: params });
  return employee ? true : false;
};

module.exports = {
  insertEmployeeInDB,
  getEmployeeFromDB,
  updateEmployeeInDB,
  deleteEmployeeFromDB
};
