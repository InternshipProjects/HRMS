const expect = require('chai').expect;

const sequelize = require('../src/utils/connect_sequelize');
const ProjectModel = require('../src/models/project')(sequelize);
const Project = require('../src/controller/project');
const Helper = require('./helper');
const { projectes } = require('./data');

describe('Project Table', () => {
  beforeEach(async () => {
    await Helper.truncateTable('project');
  });

  describe('insert', () => {
    it('should insert project1', async () => {
      await Project.insert(projectes[0]);
      const results = await ProjectModel.findAll({
        raw: true,
        where: { name: projectes[0].name }
      });
      compareProjectResults(results, projectes[0]);
    });

    it('should insert project2', async () => {
      await Project.insert(projectes[1]);
      const results = await ProjectModel.findAll({
        raw: true,
        where: { name: projectes[1].name }
      });
      compareProjectResults(results, projectes[1]);
    });
  });

  describe('select', () => {
    it('should select project1 details', async () => {
      await ProjectModel.create(projectes[0]);
      const results = await Project.select({ name: projectes[0].name });
      compareProjectResults(results, projectes[0]);
    });

    it('should select project2 details', async () => {
      await ProjectModel.create(projectes[1]);
      const results = await Project.select({ name: projectes[1].name });
      compareProjectResults(results, projectes[1]);
    });
  });

  describe('update', () => {
    it('should update project1 details', async () => {
      await ProjectModel.create(projectes[0]);
      const newStartDate = '2020-04-01';
      await Project.update({
        name: projectes[0].name,
        start_date: newStartDate
      });
      const results = await ProjectModel.findAll({
        raw: true,
        where: { name: projectes[0].name }
      });

      const updatedProjectInfo = Object.assign(projectes[0], {});
      updatedProjectInfo.start_date = newStartDate;
      compareProjectResults(results, updatedProjectInfo);
    });

    it('should update project2 details', async () => {
      await ProjectModel.create(projectes[1]);
      const newEndDate = '2020-08-17';
      await Project.update({ name: projectes[1].name, end_date: newEndDate });
      const results = await ProjectModel.findAll({
        raw: true,
        where: { name: projectes[1].name }
      });

      const updatedProjectInfo = Object.assign(projectes[1], {});
      updatedProjectInfo.end_date = newEndDate;
      compareProjectResults(results, updatedProjectInfo);
    });
  });

  describe('delete', () => {
    it('should delete project1', async () => {
      await ProjectModel.create(projectes[0]);
      await Project.delete({ name: projectes[0].name });
      const results = await ProjectModel.findAll({
        raw: true,
        where: { name: projectes[0].name }
      });
      expect(results).to.have.lengthOf(0);
    });

    it('should delete project2', async () => {
      await ProjectModel.create(projectes[1]);
      await Project.delete({ name: projectes[1].name });
      const results = await ProjectModel.findAll({
        raw: true,
        where: { name: projectes[1].name }
      });
      expect(results).to.have.lengthOf(0);
    });
  });

  const compareProjectResults = (results, project) => {
    expect(results).to.have.lengthOf(1);
    const projectInfo = results[0];
    expect(projectInfo).to.have.property('name', project.name);
    expect(projectInfo).to.have.property('start_date', project.start_date);
    expect(projectInfo).to.have.property('end_date', project.end_date);
  };
});
