const {
  insertProjectAllocationInfoInDB,
  getProjectAllocationInfoFromDB,
  updateProjectAllocationInfoInDB,
  deleteProjectAllocationInfoFromDB
} = require('../services/project_allocation');
const { successResponse, failureResponse } = require('../utils/response');

const allocateProjectForEmployee = async (req, res, next) => {
  try {
    const params = {
      emp_id: req.body.emp_id,
      project_name: req.body.project_name,
      start_date: req.body.start_date,
      likely_end_date: req.body.likely_end_date
    };
    const isInserted = await insertProjectAllocationInfoInDB(params);
    if (isInserted) {
      return successResponse(res, {
        status: 200,
        message: 'Project allocated for employee'
      });
    }
    return failureResponse(res, {
      status: 200,
      message: 'Project allocation failed'
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const getEmployeeProjectInfo = async (req, res, next) => {
  try {
    const params = {
      emp_id: req.body.emp_id,
      project_name: req.body.project_name
    };
    const allocationInfo = await getProjectAllocationInfoFromDB(params);
    return successResponse(res, {
      status: 200,
      message: "Employee's project allocation details",
      results: allocationInfo
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const updateEmployeeProjectInfo = async (req, res, next) => {
  try {
    const params = {
      emp_id: req.body.emp_id,
      project_name: req.body.project_name,
      start_date: req.body.start_date,
      likely_end_date: req.body.likely_end_date
    };
    const isUpdated = await updateProjectAllocationInfoInDB(params);
    if (isUpdated) {
      return successResponse(res, {
        status: 200,
        message: "Employee's project allocation details updated"
      });
    }
    return failureResponse(res, {
      status: 400,
      message: 'Project allocation updatation failed'
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const deleteEmployeeProjectInfo = async (req, res, next) => {
  try {
    const params = {
      project_name: req.body.project_name,
      emp_ids: req.body.emp_ids
    };
    const isDeleted = await deleteProjectAllocationInfoFromDB(params);
    if (isDeleted) {
      return successResponse(res, {
        status: 200,
        message: 'Employee deallocated from project'
      });
    }
    return failureResponse(res, {
      status: 400,
      message: 'Deleting employee from company failed'
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

module.exports = {
  allocateProjectForEmployee,
  getEmployeeProjectInfo,
  updateEmployeeProjectInfo,
  deleteEmployeeProjectInfo
};
