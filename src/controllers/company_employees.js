const {
  insertCompanyEmployeesInDB,
  getCompanyEmployeesFromDB,
  deleteEmployeesFromCompanyInDB
} = require('../services/company_employees');
const { successResponse, failureResponse } = require('../utils/response');

const addEmployeeToCompany = async (req, res, next) => {
  try {
    const params = {
      registration_no: req.body.registration_no,
      emp_id: req.body.emp_id
    };
    const isInserted = await insertCompanyEmployeesInDB(params);
    if (isInserted) {
      return successResponse(res, {
        status: 200,
        message: 'Employee added to company'
      });
    }
    return failureResponse(res, {
      status: 400,
      message: 'Failed to add employee to company'
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const getCompanyEmployees = async (req, res, next) => {
  try {
    const params = {
      registration_no: req.body.registration_no
    };
    const employeesInfo = await getCompanyEmployeesFromDB(params);
    return successResponse(res, {
      status: 200,
      message: "Company employee's details",
      results: employeesInfo
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const removeEmployeeFromCompany = async (req, res, next) => {
  try {
    const params = {
      registration_no: req.body.registration_no,
      emp_id: req.body.emp_id
    };
    const isDeleted = await deleteEmployeesFromCompanyInDB(params);
    if (isDeleted) {
      return successResponse(res, {
        status: 200,
        message: 'Remove employee from company'
      });
    }
    return failureResponse(res, {
      status: 400,
      message: 'Removing employee from company failed'
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

module.exports = {
  addEmployeeToCompany,
  getCompanyEmployees,
  removeEmployeeFromCompany
};
