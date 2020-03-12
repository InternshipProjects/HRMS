const express = require('express');
const router = express.Router();

const {
  addProject,
  getProject,
  updateProject,
  deleteProject
} = require('../controllers/project');

router.post('/', addProject);
router.get('/', getProject);
router.patch('/', updateProject);
router.delete('/', deleteProject);

module.exports = router;
