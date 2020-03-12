const express = require('express');
const app = express();
const morgon = require('morgan');
const log = require('loglevel');

const userRoutes = require('./routes/user');
const authenticationRoutes = require('./routes/authentication');
const companyRoutes = require('./routes/company');
const employeeRoutes = require('./routes/employee');
const employeeSkillsRoutes = require('./routes/employee_skills');
const companyEmployeesRoutes = require('./routes/company_employees');
const clientRoutes = require('./routes/client');
const projectRoutes = require('./routes/project');
const clientProjectsRoutes = require('./routes/client_projects');
const allocateProjectRoutes = require('./routes/allocate_project');
const employeesAvailabilityRoutes = require('./routes/employees_availability');

const { authorize } = require('./controllers/authentication');

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
app.use('/auth', authenticationRoutes);

app.use(authorize);
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
  log.error(`\n\nError Message: ${error.message}`);
  log.error(`Status code: ${error.status}`);
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
