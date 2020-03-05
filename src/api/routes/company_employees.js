const express = require('express');
const router = express.Router();
const CompanyEmployeesController = require('../../controller/company_employees');

router.post('/', async (req, res, next) => {
  const params = {
    registration_no: req.body.registration_no,
    emp_id: req.body.emp_id
  };
  try {
    await CompanyEmployeesController.insert(params);
    return res.status(200).json({
      message: 'Employee added to company',
      params
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  const params = {
    registration_no: req.body.registration_no
  };
  try {
    const results = await CompanyEmployeesController.select(params);
    return res.status(200).json({
      message: "Company employee's details",
      results,
      params
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  const params = {
    registration_no: req.body.registration_no,
    emp_id: req.body.emp_id
  };
  try {
    await CompanyEmployeesController.delete(params);
    return res.status(200).json({
      message: 'Removed employee from company',
      params
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

module.exports = router;
