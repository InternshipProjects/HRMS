const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWTTokensController = require('../../controller/jwt_tokens');

router.get('/', async (req, res, next) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token is required' });
  }

  const dbToken = await JWTTokensController.select(refreshToken);
  if (!dbToken) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const accessToken = JWTTokensController.generateAccessToken({
      name: user.name
    });
    return res.status(200).json({ accessToken });
  });
});

module.exports = router;
