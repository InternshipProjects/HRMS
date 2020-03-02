const express = require('express');
const app = express();
const morgon = require('morgan');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const companyRoutes = require('./src/api/routes/company');
const employeeRoutes = require('./src/api/routes/employee');
const employeeSkillsRoutes = require('./src/api/routes/employee_skills');
const clientRoutes = require('./src/api/routes/client');
const projectRoutes = require('./src/api/routes/project');
const clientProjectsRoutes = require('./src/api/routes/client_projects');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'HRMS API',
      description: 'Human Resource Management System for a company'
    },
    servers: ['http://localhost:5000']
  },
  apis: ['./src/api/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(morgon('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/company', companyRoutes);
app.use('/employee', employeeRoutes);
app.use('/employee_skills', employeeSkillsRoutes);
app.use('/client_projects', clientProjectsRoutes);
app.use('/client', clientRoutes);
app.use('/project', projectRoutes);

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
