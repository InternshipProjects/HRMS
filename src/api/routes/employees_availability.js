const express = require('express');
const router = express.Router();
const EmployeeAvailabilityController = require('../../controller/project/employees_availability');

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
    return res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;
