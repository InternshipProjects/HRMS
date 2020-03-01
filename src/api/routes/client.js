const express = require('express');
const router = express.Router();
const ClientController = require('../../controller/client');

router.post('/', async (req, res, next) => {
  const params = {
    name: req.body.name,
    website: req.body.website,
    country: req.body.country
  };
  try {
    await ClientController.insert(params);
    return res.status(200).json({
      message: 'Post method on client',
      params: params
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

router.get('/', async (req, res, next) => {
  const params = {
    name: req.body.name
  };
  try {
    const client = await ClientController.select(params);
    return res.status(200).json({
      message: 'Get method on client',
      result: client,
      params: params
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

router.patch('/', async (req, res, next) => {
  const params = {
    name: req.body.name,
    website: req.body.website,
    country: req.body.country
  };
  try {
    await ClientController.update(params);
    return res.status(200).json({
      message: 'Patch method on client',
      params: params
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

router.delete('/', async (req, res, next) => {
  const params = {
    name: req.body.name
  };
  try {
    await ClientController.delete(params);
    return res.status(200).json({
      message: 'Delete method on client',
      params: params
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;
