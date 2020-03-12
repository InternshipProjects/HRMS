const express = require('express');
const router = express.Router();
const {
  addClient,
  getClient,
  updateClient,
  deleteClient
} = require('../controllers/client');

router.post('/', addClient);
router.get('/', getClient);
router.patch('/', updateClient);
router.delete('/', deleteClient);

module.exports = router;
