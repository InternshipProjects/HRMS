const express = require('express');
const router = express.Router();
const ProjectAllocationController = require('../../controller/project/project_allocation');

router.post('/', async (req, res, next) => {
  const params = {
    emp_id: req.body.emp_id,
    project_name: req.body.project_name,
    start_date: req.body.start_date,
    likely_end_date: req.body.likely_end_date
  };
  try {
    await ProjectAllocationController.insert(params);
    return res.status(200).json({
      message: 'Employee allocated a project',
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
    emp_id: req.body.emp_id,
    project_name: req.body.project_name
  };
  try {
    const results = await ProjectAllocationController.select(params);
    return res.status(200).json({
      message: 'Get method on allocate_project',
      results,
      params
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

router.patch('/', async (req, res, next) => {
  const params = {
    emp_id: req.body.emp_id,
    project_name: req.body.project_name,
    start_date: req.body.start_date,
    likely_end_date: req.body.likely_end_date
  };
  try {
    await ProjectAllocationController.update(params);
    return res.status(200).json({
      message: 'Patch method on allocate_project',
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
    project_name: req.body.project_name,
    emp_ids: req.body.emp_ids
  };
  try {
    await ProjectAllocationController.delete(params);
    return res.status(200).json({
      message: 'Delete method on allocate_project',
      params
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

module.exports = router;
