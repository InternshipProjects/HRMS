const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const UserController = require('../../controller/user');
const JWTTokensController = require('../../controller/jwt_tokens');

router.post('/', async (req, res, next) => {
  const user = {
    user_name: req.body.user_name,
    password: req.body.password
  };
  try {
    const dbUsers = await UserController.select({ user_name: user.user_name });
    if (!dbUsers.length) {
      return res.status(400).json({
        error: 'Cannot find user'
      });
    }
    if (await bcrypt.compare(user.password, dbUsers[0].password)) {
      const userInfo = {
        id: dbUsers[0].id,
        name: dbUsers[0].name
      };
      const accessToken = JWTTokensController.generateAccessToken(userInfo);
      const refreshToken = JWTTokensController.generateRefreshToken(userInfo);
      await JWTTokensController.insert(refreshToken);

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

module.exports = router;
