const express = require('express');
const router = express.Router();
const JWTTokensController = require('../../controller/jwt_tokens');

router.delete('/', async (req, res, next) => {
  try {
    await JWTTokensController.delete(req.body.token);
    return res.status(204).json({
      message: 'Successfully logout'
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

module.exports = router;
