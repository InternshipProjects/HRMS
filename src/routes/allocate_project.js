const express = require('express');
const router = express.Router();

const {
  allocateProjectForEmployee,
  getEmployeeProjectInfo,
  updateEmployeeProjectInfo,
  deleteEmployeeProjectInfo
} = require('../controllers/allocate_project');

router.post('/', allocateProjectForEmployee);
router.get('/', getEmployeeProjectInfo);
router.patch('/', updateEmployeeProjectInfo);
router.delete('/', deleteEmployeeProjectInfo);

module.exports = router;
