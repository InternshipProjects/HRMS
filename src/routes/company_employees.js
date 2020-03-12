const express = require('express');
const router = express.Router();

const {
  addEmployeeToCompany,
  getCompanyEmployees,
  removeEmployeeFromCompany
} = require('../controllers/company_employees');

router.post('/', addEmployeeToCompany);
router.get('/', getCompanyEmployees);
router.delete('/', removeEmployeeFromCompany);

module.exports = router;
