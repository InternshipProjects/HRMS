const {
  insertCompanyInDB,
  getCompanyFromDB,
  updateCompanyInDB,
  deleteCompanyFromDB
} = require('../services/company');
const { successResponse, failureResponse } = require('../utils/response');

const addCompany = async (req, res, next) => {
  try {
    const company = {
      name: req.body.name,
      registration_no: req.body.registration_no,
      address: req.body.address,
      phone_no: req.body.phone_no,
      website: req.body.website
    };
    const isInserted = await insertCompanyInDB(company);
    if (isInserted) {
      return successResponse(res, {
        status: 201,
        message: 'New company created'
      });
    }
    return failureResponse(res, {
      status: 400,
      message: 'Comapny insertion failed'
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const getCompany = async (req, res, next) => {
  try {
    const params = {
      registration_no: req.body.registration_no
    };
    const company = await getCompanyFromDB(params);
    if (company) {
      return successResponse(res, {
        status: 200,
        message: 'Comapanies details',
        results: company
      });
    }
    return failureResponse(res, { status: 400, message: 'Company not found' });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const updateCompany = async (req, res, next) => {
  try {
    const company = {
      registration_no: req.body.registration_no,
      name: req.body.name,
      address: req.body.address,
      phone_no: req.body.phone_no,
      website: req.body.website
    };
    const isUpdated = await updateCompanyInDB(company);
    if (isUpdated) {
      return successResponse(res, {
        status: 200,
        message: 'Company details updated'
      });
    }
    return failureResponse(res, {
      status: 400,
      message: 'Company details updation failed'
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const deleteCompany = async (req, res, next) => {
  try {
    const params = {
      registration_no: req.body.registration_no
    };
    const isDeleted = await deleteCompanyFromDB(params);
    if (isDeleted) {
      return successResponse(res, { status: 200, message: 'Company deleted' });
    }
    return failureResponse(res, {
      status: 400,
      message: 'Company deletion failed'
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

module.exports = { addCompany, getCompany, updateCompany, deleteCompany };
