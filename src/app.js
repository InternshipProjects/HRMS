const express = require('express');
const app = express();
const morgon = require('morgan');

const userRoutes = require('./api/routes/user');
const companyRoutes = require('./api/routes/company');
const employeeRoutes = require('./api/routes/employee');
const employeeSkillsRoutes = require('./api/routes/employee_skills');
const companyEmployeesRoutes = require('./api/routes/company_employees');
const clientRoutes = require('./api/routes/client');
const projectRoutes = require('./api/routes/project');
const clientProjectsRoutes = require('./api/routes/client_projects');
const allocateProjectRoutes = require('./api/routes/allocate_project');
const employeesAvailabilityRoutes = require('./api/routes/employees_availability');

app.use(morgon('dev'));
app.use(express.json());

// Handling CORS errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/user', userRoutes);
app.use('/company', companyRoutes);
app.use('/employee', employeeRoutes);
app.use('/employee_skills', employeeSkillsRoutes);
app.use('/company_employees', companyEmployeesRoutes);
app.use('/client_projects', clientProjectsRoutes);
app.use('/client', clientRoutes);
app.use('/project', projectRoutes);
app.use('/allocate_project', allocateProjectRoutes);
app.use('/employees_availability', employeesAvailabilityRoutes);

app.use((req, res, next) => {
  const error = new Error();
  error.status = 404;
  error.message = 'Route not found';
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
