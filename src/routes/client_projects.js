const express = require('express');
const router = express.Router();
const {
  addClientProject,
  getClientProject,
  deleteClientProject
} = require('../controllers/client_projects');

router.post('/', addClientProject);
router.get('/', getClientProject);
router.delete('/', deleteClientProject);

module.exports = router;
