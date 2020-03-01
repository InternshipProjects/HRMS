const express = require('express');
const router = express.Router();
const ProjectController = require('../../controller/project/project');

router.post('/', async (req, res, next) => {
  const params = {
    name: req.body.name,
    start_date: req.body.start_date,
    end_date: req.body.end_date
  };
  try {
    await ProjectController.insert(params);
    return res.status(200).json({
      message: 'Post method on project',
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
    const project = await ProjectController.select(params);
    return res.status(200).json({
      message: 'Get method on project',
      results: project,
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
    start_date: req.body.start_date,
    end_date: req.body.end_date
  };
  try {
    await ProjectController.update(params);
    return res.status(200).json({
      message: 'Patch method on project',
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
    name: req.body.name
  };
  try {
    await ProjectController.delete(params);
    return res.status(200).json({
      message: 'Delete method on project',
      params
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;
