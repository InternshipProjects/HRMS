const express = require('express');
const router = express.Router();

const {
  getEmployeesOnBench
} = require('../controllers/employees_availability');

router.get('/', getEmployeesOnBench);

module.exports = router;
