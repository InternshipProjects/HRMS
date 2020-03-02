const expect = require('chai').expect;

const sequelize = require('../src/utils/connect_sequelize');
const ProjectModel = require('../src/models/project')(sequelize);
const Project = require('../src/controller/project/project');
const { truncateTable } = require('./helpers');

describe('Project Table', () => {
  const project1 = {
    name: 'todos',
    start_date: '2020-02-27',
    end_date: '2020-03-27'
  };
  const project2 = {
    name: 'tic-toc-toe',
    start_date: '2020-04-01',
    end_date: '2020-05-01'
  };

  beforeEach(async () => {
    await truncateTable('project');
  });

  describe('insert', () => {
    it('should insert project1', async () => {
      await Project.insert(project1);
      const results = await ProjectModel.findAll({
        raw: true,
        where: { name: project1.name }
      });
      expect(results).to.have.lengthOf(1);
      const projectInfo = results[0];
      expect(projectInfo).to.have.property('name', project1.name);
      expect(projectInfo).to.have.property('start_date', project1.start_date);
      expect(projectInfo).to.have.property('end_date', project1.end_date);
    });

    it('should insert project2', async () => {
      await Project.insert(project2);
      const results = await ProjectModel.findAll({
        raw: true,
        where: { name: project2.name }
      });
      expect(results).to.have.lengthOf(1);
      const projectInfo = results[0];
      expect(projectInfo).to.have.property('name', project2.name);
      expect(projectInfo).to.have.property('start_date', project2.start_date);
      expect(projectInfo).to.have.property('end_date', project2.end_date);
    });
  });

  describe('select', () => {
    it('should select project1 details', async () => {
      await ProjectModel.create(project1);
      const results = await Project.select({ name: project1.name });
      expect(results).to.have.lengthOf(1);
      const projectInfo = results[0];
      expect(projectInfo).to.have.property('name', project1.name);
      expect(projectInfo).to.have.property('start_date', project1.start_date);
      expect(projectInfo).to.have.property('end_date', project1.end_date);
    });

    it('should select project2 details', async () => {
      await ProjectModel.create(project2);
      const results = await Project.select({ name: project2.name });
      expect(results).to.have.lengthOf(1);
      const projectInfo = results[0];
      expect(projectInfo).to.have.property('name', project2.name);
      expect(projectInfo).to.have.property('start_date', project2.start_date);
      expect(projectInfo).to.have.property('end_date', project2.end_date);
    });
  });

  describe('update', () => {
    it('should update project1 details', async () => {
      await ProjectModel.create(project1);
      const newStartDate = '2020-04-01';
      await Project.update({ name: project1.name, start_date: newStartDate });
      const results = await ProjectModel.findAll({
        raw: true,
        where: { name: project1.name }
      });
      expect(results).to.have.lengthOf(1);
      const projectInfo = results[0];
      expect(projectInfo).to.have.property('name', project1.name);
      expect(projectInfo).to.have.property('start_date', newStartDate);
      expect(projectInfo).to.have.property('end_date', project1.end_date);
    });

    it('should update project2 details', async () => {
      await ProjectModel.create(project2);
      const newEndDate = '2020-08-17';
      await Project.update({ name: project2.name, end_date: newEndDate });
      const results = await ProjectModel.findAll({
        raw: true,
        where: { name: project2.name }
      });
      expect(results).to.have.lengthOf(1);
      const projectInfo = results[0];
      expect(projectInfo).to.have.property('name', project2.name);
      expect(projectInfo).to.have.property('start_date', project2.start_date);
      expect(projectInfo).to.have.property('end_date', newEndDate);
    });
  });

  describe('delete', () => {
    it('should delete project1', async () => {
      await ProjectModel.create(project1);
      await Project.delete({ name: project1.name });
      const results = await ProjectModel.findAll({
        raw: true,
        where: { name: project1.name }
      });
      expect(results).to.have.lengthOf(0);
    });

    it('should delete project2', async () => {
      await ProjectModel.create(project2);
      await Project.delete({ name: project2.name });
      const results = await ProjectModel.findAll({
        raw: true,
        where: { name: project2.name }
      });
      expect(results).to.have.lengthOf(0);
    });
  });
});
