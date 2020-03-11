const sequelize = require('../utils/connect_sequelize');
const { QueryTypes } = require('sequelize');

const getEmployeesWhoAreOnBench = async params => {
  let query;
  if (params.date) {
    query = `select * from employee, project_allocation 
        where employee.id <> project_allocation.employee_id or 
        project_allocation.likely_end_date < '${params.date})'`;
  } else {
    query = `select * from employee, project_allocation 
        where employee.id <> project_allocation.employee_id`;
  }
  return sequelize.query(query, {
    type: QueryTypes.SELECT
  });
};

module.exports = { getEmployeesWhoAreOnBench };
