const {
  insertProjectInDB,
  getProjectFromDB,
  updateProjectInDB,
  deleteProjectFromDB
} = require('../services/project');
const { successResponse, failureResponse } = require('../utils/response');

const addProject = async (req, res, next) => {
  try {
    const project = {
      name: req.body.name,
      start_date: req.body.start_date,
      end_date: req.body.end_date
    };
    const isInserted = await insertProjectInDB(project);
    if (isInserted) {
      return successResponse(res, {
        status: 200,
        message: 'New project created'
      });
    }
    return failureResponse(res, {
      status: 400,
      message: 'Project insertion failed'
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const getProject = async (req, res, next) => {
  try {
    const params = {
      name: req.body.name
    };
    const project = await getProjectFromDB(params);
    if (project) {
      return successResponse(res, {
        status: 200,
        message: 'Project details',
        results: project
      });
    }
    return failureResponse(res, { status: 400, message: 'Project not found' });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const updateProject = async (req, res, next) => {
  try {
    const project = {
      name: req.body.name,
      start_date: req.body.start_date,
      end_date: req.body.end_date
    };
    const isUpdated = await updateProjectInDB(project);
    if (isUpdated) {
      return successResponse(res, {
        status: 200,
        message: 'Project details updated'
      });
    }
    return failureResponse(res, {
      status: 400,
      message: 'Project updatation failed'
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const params = {
      name: req.body.name
    };
    const isDeleted = await deleteProjectFromDB(params);
    if (isDeleted) {
      return successResponse(res, { status: 200, message: 'Project deleted' });
    }
    return failureResponse(res, {
      status: 400,
      message: 'Project deletion failed'
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

module.exports = { addProject, getProject, updateProject, deleteProject };
