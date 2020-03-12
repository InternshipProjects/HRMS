const {
  insertClientProjectsInDB,
  getClientProjectsFromDB,
  deleteClientProjectsFromDB
} = require('../services/client_projects');
const { successResponse, failureResponse } = require('../utils/response');

const addClientProject = async (req, res, next) => {
  try {
    const params = {
      client_name: req.body.client_name,
      project_name: req.body.project_name
    };
    await insertClientProjectsInDB(params);
    return successResponse(res, {
      status: 200,
      message: 'Client project created'
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const getClientProject = async (req, res, next) => {
  try {
    const params = {
      client_name: req.body.client_name
    };
    const projects = await getClientProjectsFromDB(params);
    return successResponse(res, {
      status: 200,
      message: "Client's projects",
      results: projects ? projects : "Client don't have any projects"
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const deleteClientProject = async (req, res, next) => {
  try {
    const params = {
      client_name: req.body.client_name,
      project_name: req.body.project_name
    };
    await deleteClientProjectsFromDB(params);
    return successResponse(res, {
      status: 200,
      message: 'Client project deleted'
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};
module.exports = { addClientProject, getClientProject, deleteClientProject };
