const {
  getEmployeesWhoAreOnBench
} = require('../services/employees_availability');
const { successResponse, failureResponse } = require('../utils/response');

const getEmployeesOnBench = async (req, res, next) => {
  try {
    const params = {
      date: req.body.date
    };
    const employees = await getEmployeesWhoAreOnBench(params);
    return successResponse(res, {
      status: 200,
      message: "Employee's who are on bench",
      results: employees
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

module.exports = { getEmployeesOnBench };
