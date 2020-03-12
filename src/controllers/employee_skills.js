const {
  insertEmployeeSkillsInDB,
  getEmployeeSkillsFromDB,
  deleteEmployeeSkillsFromDB
} = require('../services/employee_skills');
const { successResponse, failureResponse } = require('../utils/response');

const addEmployeeSkills = async (req, res, next) => {
  try {
    const params = {
      emp_id: req.body.emp_id,
      skills: req.body.skills
    };
    const isInserted = await insertEmployeeSkillsInDB(params);
    if (isInserted) {
      return successResponse(res, {
        status: 200,
        message: 'Skills are added for employee'
      });
    }
    return failureResponse(res, {
      status: 400,
      message: 'Employee skills insertion failed'
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const getEmployeeSkills = async (req, res, next) => {
  try {
    const params = {
      emp_id: req.body.emp_id
    };
    const skills = await getEmployeeSkillsFromDB(params);
    return successResponse(res, {
      status: 200,
      message: "Employee's skills",
      results: skills
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const deleteEmployeeSkills = async (req, res, next) => {
  try {
    const params = {
      emp_id: req.body.emp_id,
      skills: req.body.skills
    };
    const isDeleted = await deleteEmployeeSkillsFromDB(params);
    if (isDeleted) {
      return successResponse(res, {
        status: 200,
        message: 'Employee skills deleted'
      });
    }
    return failureResponse(res, {
      status: 400,
      message: 'Employee skills deletion failed'
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

module.exports = { addEmployeeSkills, getEmployeeSkills, deleteEmployeeSkills };
