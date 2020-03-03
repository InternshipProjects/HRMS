const express = require('express');
const router = express.Router();
const EmployeeSkillsController = require('../../controller/employee/employee_skills');

router.post('/', async (req, res, next) => {
  const params = {
    emp_id: req.body.emp_id,
    skills: req.body.skills
  };
  try {
    await EmployeeSkillsController.insert(params);
    return res.status(200).json({
      message: 'Skills are added for employee',
      params: params
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  const params = {
    emp_id: req.body.emp_id
  };
  try {
    const skills = await EmployeeSkillsController.select(params);
    return res.status(200).json({
      message: "Employee's skills",
      result: skills,
      params: params
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  const params = {
    emp_id: req.body.emp_id,
    skills: req.body.skills
  };
  try {
    await EmployeeSkillsController.delete(params);
    return res.status(200).json({
      message: 'Skills deleted for employee',
      params: params
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

module.exports = router;
