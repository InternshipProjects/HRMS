const express = require('express');
const router = express.Router();
const ClientProjectController = require('../../controller/project/client_projects');

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
    return res.status(400).json({
      error: error.message
    });
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
    return res.status(400).json({
      error: error.message
    });
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
    return res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;
