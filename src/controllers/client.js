const {
  insertClientInDB,
  getClientFromDB,
  updateClientInDB,
  deleteClientFromDB
} = require('../services/client');
const { successResponse, failureResponse } = require('../utils/response');

const addClient = async (req, res, next) => {
  try {
    const client = {
      name: req.body.name,
      website: req.body.website,
      country: req.body.country
    };
    const isInserted = await insertClientInDB(client);
    if (isInserted) {
      return successResponse(res, {
        status: 200,
        message: 'New client created'
      });
    }
    return failureResponse(res, {
      status: 400,
      message: 'Client insertion failed'
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const getClient = async (req, res, next) => {
  try {
    const params = {
      name: req.body.name
    };
    const client = await getClientFromDB(params);
    if (client) {
      return successResponse(res, {
        status: 200,
        message: 'Client details',
        results: client
      });
    }
    return failureResponse(res, { status: 400, message: 'Client not found' });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const updateClient = async (req, res, next) => {
  try {
    const client = {
      name: req.body.name,
      website: req.body.website,
      country: req.body.country
    };
    const isUpdated = await updateClientInDB(client);
    if (isUpdated) {
      return successResponse(res, {
        status: 200,
        message: 'Client details updated'
      });
    }
    return failureResponse(res, {
      status: 400,
      message: 'Client details updation failed'
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const deleteClient = async (req, res, next) => {
  try {
    const params = {
      name: req.body.name
    };
    const isDeleted = await deleteClientFromDB(params);
    if (isDeleted) {
      return successResponse(res, { status: 200, message: 'Client deleted' });
    }
    return failureResponse(res, {
      status: 400,
      message: 'Client deletion failed'
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

module.exports = { addClient, getClient, updateClient, deleteClient };
