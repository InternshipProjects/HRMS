const express = require('express');
const router = express.Router();
const ClientController = require('../../controller/client');

router.post('/', async (req, res, next) => {
  const client = {
    name: req.body.name,
    website: req.body.website,
    country: req.body.country
  };
  try {
    await ClientController.insert(client);
    return res.status(200).json({
      message: 'New client created',
      params: client
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
      message: 'Clients details',
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
  const client = {
    name: req.body.name,
    website: req.body.website,
    country: req.body.country
  };
  try {
    await ClientController.update(client);
    return res.status(200).json({
      message: 'Client details updated',
      params: client
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
      message: 'Client deleted',
      params: params
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;
