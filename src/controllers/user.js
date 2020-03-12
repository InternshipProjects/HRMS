const {
  insertUserInDB,
  getUserFromDB,
  updateUserInDB,
  deleteUserFromDB
} = require('../services/user');
const { successResponse, failureResponse } = require('../utils/response');

const addUser = async (req, res, next) => {
  try {
    const user = {
      user_name: req.body.username,
      name: req.body.name,
      password: req.body.password,
      confirm_password: req.body.confirm_password,
      email: req.body.email,
      phone_no: req.body.phone_no
    };
    if (user.password === user.confirm_password) {
      const isCreated = await insertUserInDB(user);
      if (isCreated) {
        return successResponse(res, {
          status: 200,
          message: 'New user created'
        });
      }
    } else {
      return failureResponse(res, {
        status: 400,
        message: 'Confirm password and password should be same'
      });
    }
    return failureResponse(res, {
      status: 400,
      message: 'Failed to create user'
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const getUser = async (req, res, next) => {
  try {
    const params = {
      user_name: req.body.username
    };
    const user = await getUserFromDB(params);
    if (user) {
      return successResponse(res, {
        status: 200,
        message: "User's details",
        results: user
      });
    }
    return failureResponse(res, {
      status: 400,
      message: 'User not found'
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = {
      user_name: req.body.username,
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      phone_no: req.body.phone_no
    };
    const isUpdated = await updateUserInDB(user);
    if (isUpdated) {
      return successResponse(res, {
        status: 200,
        message: 'User details updated'
      });
    }
    return failureResponse(res, {
      status: 400,
      message: 'Updation failed'
    });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const params = {
      user_name: req.body.username
    };
    const isDeleted = await deleteUserFromDB(params);
    if (isDeleted) {
      return successResponse(res, { status: 200, message: 'User deleted' });
    }
    return failureResponse(res, { status: 400, message: 'Deletion failed' });
  } catch (error) {
    return failureResponse(res, { status: 400, message: error.message });
  }
};

module.exports = { addUser, getUser, updateUser, deleteUser };
