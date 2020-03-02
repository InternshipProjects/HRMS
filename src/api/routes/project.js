const express = require('express');
const router = express.Router();
const ProjectController = require('../../controller/project/project');

router.post('/', async (req, res, next) => {
  const project = {
    name: req.body.name,
    start_date: req.body.start_date,
    end_date: req.body.end_date
  };
  try {
    await ProjectController.insert(project);
    return res.status(200).json({
      message: 'New project created',
      params: project
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
    const project = await ProjectController.select(params);
    return res.status(200).json({
      message: 'Projects details',
      results: project,
      params
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

router.patch('/', async (req, res, next) => {
  const project = {
    name: req.body.name,
    start_date: req.body.start_date,
    end_date: req.body.end_date
  };
  try {
    await ProjectController.update(project);
    return res.status(200).json({
      message: 'Project details updated',
      params: project
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
    await ProjectController.delete(params);
    return res.status(200).json({
      message: 'Project deleted',
      params
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;
