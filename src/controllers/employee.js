const {
  insertEmployeeInDB,
  getEmployeeFromDB,
  updateEmployeeInDB,
  deleteEmployeeFromDB
} = require('../services/employee');
const { successResponse, failureResponse } = require('../utils/response');

const addEmployee = async (req, res, next) => {
  try {
    const employee = {
      emp_id: req.body.emp_id,
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone_no: req.body.phone_no
    };
    const isInserted = await insertEmployeeInDB(employee);
    if (isInserted) {
      return successResponse(res, {
        status: 200,
        message: 'New employee created'
      });
    }
    return failureResponse(res, {
      status: 400,
      message: 'Employee insertion failed'
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const getEmployee = async (req, res, next) => {
  try {
    const params = {
      emp_id: req.body.emp_id
    };
    const employee = await getEmployeeFromDB(params);
    if (employee) {
      return successResponse(res, {
        status: 200,
        message: 'Employee details',
        results: employee
      });
    }
    return failureResponse(res, { status: 400, message: 'Employee not found' });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const employee = {
      emp_id: req.body.emp_id,
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phone_no: req.body.phone_no
    };
    await updateEmployeeInDB(employee);
    return successResponse(res, {
      status: 200,
      message: 'Employee details updated'
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const params = {
      emp_id: req.body.emp_id
    };
    await deleteEmployeeFromDB(params);
    return successResponse(res, { status: 200, message: 'Employee deleted' });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

module.exports = { addEmployee, getEmployee, updateEmployee, deleteEmployee };
