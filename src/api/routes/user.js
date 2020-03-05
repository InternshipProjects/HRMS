const express = require('express');
const router = express.Router();
const UserController = require('../../controller/user');

router.post('/', async (req, res, next) => {
  const user = {
    user_name: req.body.user_name,
    name: req.body.name,
    password: req.body.password,
    confirm_password: req.body.confirm_password,
    email: req.body.email,
    phone_no: req.body.phone_no
  };
  try {
    if (user.password === user.confirm_password) {
      await UserController.insert(user);
      return res.status(200).json({
        message: 'New user created',
        params: user
      });
    }
    const error = new Error('Confirm password and password should be same');
    error.status = 400;
    next(error);
  } catch (error) {
    console.error(error);
    error.status = 400;
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  const params = {
    user_name: req.body.user_name
  };
  try {
    const results = await UserController.select(params);
    return res.status(200).json({
      message: "User's details",
      results,
      params
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.patch('/', async (req, res, next) => {
  const user = {
    user_name: req.body.user_name,
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    phone_no: req.body.phone_no
  };
  try {
    await UserController.update(user);
    return res.status(200).json({
      message: 'User details updated',
      params: user
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  const params = {
    user_name: req.body.user_name
  };
  try {
    await UserController.delete(params);
    return res.status(200).json({
      message: 'User deleted',
      params
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

module.exports = router;
