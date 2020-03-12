const express = require('express');
const router = express.Router();
const {
  addEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employee');

router.post('/', addEmployee);
router.get('/', getEmployee);
router.patch('/', updateEmployee);
router.delete('/', deleteEmployee);

module.exports = router;
