const sequelize = require('../../utils/connect_sequelize');
const { QueryTypes } = require('sequelize');

class EmployeeAvailability {
  async query(queryType, params) {
    const queries = {
      GET: this.select
    };
    try {
      return queries[queryType](params);
    } catch (error) {
      console.log(error);
    }
  }

  async select(params) {
    let query;
    if (params.date) {
      query = `select * from employee, project_allocation 
        where employee.id <> project_allocation.employee_id or 
        project_allocation.likely_end_date < '${params.date})'`;
    } else {
      query = `select * from employee, project_allocation 
        where employee.id <> project_allocation.employee_id`;
    }
    const results = await sequelize.query(query, {
      type: QueryTypes.SELECT
    });
    return results;
  }
}

module.exports = new EmployeeAvailability();
