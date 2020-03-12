const express = require('express');
const router = express.Router();
const {
  addCompany,
  getCompany,
  updateCompany,
  deleteCompany
} = require('../controllers/company');

router.post('/', addCompany);
router.get('/', getCompany);
router.patch('/', updateCompany);
router.delete('/', deleteCompany);

module.exports = router;
