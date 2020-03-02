const express = require('express');
const app = express();
const morgon = require('morgan');
const bodyParser = require('body-parser');

const companyRoutes = require('./api/routes/company');
const employeeRoutes = require('./api/routes/employee');
const employeeSkillsRoutes = require('./api/routes/employee_skills');
const clientRoutes = require('./api/routes/client');
const projectRoutes = require('./api/routes/project');
const clientProjectsRoutes = require('./api/routes/client_projects');
const allocateProjectRoutes = require('./api/routes/allocate_project');
const employeesAvailabilityRoutes = require('./api/routes/employees_availability');

app.use(morgon('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/company', companyRoutes);
app.use('/employee', employeeRoutes);
app.use('/employee_skills', employeeSkillsRoutes);
app.use('/client_projects', clientProjectsRoutes);
app.use('/client', clientRoutes);
app.use('/project', projectRoutes);
app.use('/allocate_project', allocateProjectRoutes);
app.use('/employees_availability', employeesAvailabilityRoutes);

app.use((req, res, next) => {
  const error = new Error();
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
