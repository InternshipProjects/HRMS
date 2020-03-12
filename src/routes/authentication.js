const express = require('express');
const router = express.Router();
const { login, logout, getToken } = require('../controllers/authentication');

router.post('/login', login);
router.post('/token', getToken);
router.delete('/logout', logout);

module.exports = router;
