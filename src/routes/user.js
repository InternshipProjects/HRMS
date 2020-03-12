const express = require('express');
const router = express.Router();
const {
  addUser,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/user');

router.post('/', addUser);
router.get('/', getUser);
router.patch('/', updateUser);
router.delete('/', deleteUser);

module.exports = router;
