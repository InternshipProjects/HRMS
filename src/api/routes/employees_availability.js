const express = require('express');
const router = express.Router();
const EmployeeAvailabilityController = require('../../controller/employees_availability');

router.get('/', async (req, res, next) => {
  const params = {
    date: req.body.date
  };
  try {
    const results = await EmployeeAvailabilityController.select(params);
    return res.status(200).json({
      message: 'Get method on availability',
      results,
      params
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

module.exports = router;
