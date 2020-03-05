const express = require('express');
const router = express.Router();
const ClientProjectController = require('../../controller/client_projects');

router.post('/', async (req, res, next) => {
  const params = {
    client_name: req.body.client_name,
    project_name: req.body.project_name
  };
  try {
    await ClientProjectController.insert(params);
    return res.status(200).json({
      message: 'Project assigned to client',
      params
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  const params = {
    client_name: req.body.client_name
  };
  try {
    const projects = await ClientProjectController.select(params);
    return res.status(200).json({
      message: "Client's projects",
      results: projects,
      params
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  const params = {
    client_name: req.body.client_name,
    project_name: req.body.project_name
  };
  try {
    await ClientProjectController.delete(params);
    return res.status(200).json({
      message: 'Client project deleted',
      params
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

module.exports = router;
