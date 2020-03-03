const express = require('express');
const router = express.Router();
const UserController = require('../../controller/user');

router.post('/', async (req, res, next) => {
  const user = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    phone_no: req.body.phone_no
  };
  try {
    await UserController.insert(user);
    return res.status(200).json({
      message: 'New user created',
      params: user
    });
  } catch (error) {
    console.error(error);
    error.status = 400;
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  const params = {
    name: req.body.name
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
    name: req.body.name
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
