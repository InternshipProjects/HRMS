const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserController = require('../../controller/user');

let refreshTokens = [];

router.post('/', async (req, res, next) => {
  const user = {
    name: req.body.name,
    password: req.body.password
  };
  const dbUsers = await UserController.select({ name: user.name });
  if (!dbUsers.length) {
    return res.status(400).json({
      error: 'Cannot find user'
    });
  }
  try {
    if (await bcrypt.compare(user.password, dbUsers[0].password)) {
      const accessToken = generateAccessToken(user);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      refreshTokens.push(refreshToken);
      return res.status(200).json({
        message: 'Successfully logged in',
        accessToken,
        refreshToken
      });
    } else {
      return res.status(400).json({
        message: 'Invalid password'
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const generateAccessToken = user => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
};

module.exports = router;
