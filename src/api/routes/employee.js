const express = require('express');
const router = express.Router();
const EmployeeController = require('../../controller/employee');

router.post('/', async (req, res, next) => {
  const employee = {
    emp_id: req.body.emp_id,
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    phone_no: req.body.phone_no
  };
  try {
    await EmployeeController.insert(employee);
    return res.status(200).json({
      message: 'New employee created',
      params: employee
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  const params = {
    emp_id: req.body.emp_id
  };
  try {
    const employee = await EmployeeController.select(params);
    return res.status(200).json({
      message: 'Employees details',
      result: employee,
      params: params
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.patch('/', async (req, res, next) => {
  const employee = {
    emp_id: req.body.emp_id,
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    phone_no: req.body.phone_no
  };
  try {
    await EmployeeController.update(employee);
    return res.status(200).json({
      message: 'Updated employee details',
      params: employee
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  const params = {
    emp_id: req.body.emp_id
  };
  try {
    await EmployeeController.delete(params);
    return res.status(200).json({
      message: 'Deleted employee',
      params: params
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

module.exports = router;
