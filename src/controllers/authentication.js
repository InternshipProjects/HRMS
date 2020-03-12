const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { getUserFromDB } = require('../services/user');
const {
  generateJWTAccessToken,
  generateJWTRefreshToken,
  insertJWTRefreshTokenInDB,
  getJWTRefreshTokenFromDB,
  deleteJWTRefreshTokenFromDB
} = require('../services/jwt_tokens');
const { successResponse, failureResponse } = require('../utils/response');

const login = async (req, res, next) => {
  try {
    const user = {
      user_name: req.body.username,
      password: req.body.password
    };
    const dbUsers = await getUserFromDB({ user_name: user.user_name });
    if (dbUsers.length < 1) {
      return failureResponse(res, { status: 400, message: 'Cannot find user' });
    }
    if (await bcrypt.compare(user.password, dbUsers.password)) {
      const userInfo = {
        id: dbUsers.id,
        name: dbUsers.name
      };
      const accessToken = generateJWTAccessToken(userInfo);
      const refreshToken = generateJWTRefreshToken(userInfo);
      await insertJWTRefreshTokenInDB(refreshToken);

      return successResponse(res, {
        status: 200,
        message: 'Successfully logged in',
        results: {
          accessToken,
          refreshToken
        }
      });
    } else {
      return failureResponse(res, { status: 400, message: 'Invalid password' });
    }
  } catch (error) {
    console.log(error);
    return failureResponse(res, { status: 500, message: error.message });
  }
};

const logout = async (req, res, next) => {
  try {
    await deleteJWTRefreshTokenFromDB(req.body.token);
    return successResponse(res, {
      status: 204,
      message: 'Successfully logged out'
    });
  } catch (error) {
    console.log(error);
    return failureResponse(res, { status: 400, message: error.message });
  }
};

const getToken = async (req, res, next) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return failureResponse(res, {
      status: 401,
      message: 'Refresh token is required'
    });
  }

  const dbToken = await getJWTRefreshTokenFromDB(refreshToken);
  if (!dbToken) {
    return failureResponse(res, {
      status: 403,
      message: 'Invalid refresh token'
    });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return failureResponse(res, {
        status: 403,
        message: 'Invalid refresh token'
      });
    }

    console.log('user: ', user);
    const accessToken = generateJWTAccessToken({
      id: user.id,
      name: user.name
    });
    return successResponse(res, {
      status: 200,
      message: 'New access token generated',
      results: { accessToken }
    });
  });
};

//Authentication
const authorize = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return failureResponse(res, {
      status: 401,
      message: 'Access token is required'
    });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return failureResponse(res, {
        status: 403,
        message: 'Unauthorized'
      });
    }
    req.user = user;
  });
  next();
};

module.exports = { login, logout, getToken, authorize };
