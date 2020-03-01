const express = require('express');
const router = express.Router();
const EmployeeController = require('../../controller/employee/employee');

router.post('/', async (req, res, next) => {
  const params = {
    emp_id: req.body.emp_id,
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    phone_no: req.body.phone_no
  };
  try {
    await EmployeeController.insert(params);
    return res.status(200).json({
      message: 'Post method on employee',
      params: params
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

router.get('/', async (req, res, next) => {
  const params = {
    emp_id: req.body.emp_id
  };
  try {
    const employee = await EmployeeController.select(params);
    return res.status(200).json({
      message: 'Get method on employee',
      result: employee,
      params: params
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

router.patch('/', async (req, res, next) => {
  const params = {
    emp_id: req.body.emp_id,
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    phone_no: req.body.phone_no
  };
  try {
    await EmployeeController.update(params);
    return res.status(200).json({
      message: 'Patch method on employee',
      params: params
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

router.delete('/', async (req, res, next) => {
  const params = {
    emp_id: req.body.emp_id
  };
  try {
    await EmployeeController.delete(params);
    return res.status(200).json({
      message: 'Delete method on employee',
      params: params
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;
