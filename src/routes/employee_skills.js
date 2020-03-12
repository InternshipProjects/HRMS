const express = require('express');
const router = express.Router();
const {
  addEmployeeSkills,
  getEmployeeSkills,
  deleteEmployeeSkills
} = require('../controllers/employee_skills');

router.post('/', addEmployeeSkills);
router.get('/', getEmployeeSkills);
router.delete('/', deleteEmployeeSkills);

module.exports = router;
