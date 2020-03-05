const expect = require('chai').expect;

const sequelize = require('../src/utils/connect_sequelize');
const ProjectModel = require('../src/models/project')(sequelize);
const Project = require('../src/controller/project');
const Helper = require('./helper');
const { projects } = require('./data');

describe('Project Table', () => {
  beforeEach(async () => {
    await Helper.truncateTable('project');
  });

  describe('insert', () => {
    it('should insert project1', async () => {
      await Project.insert(projects[0]);
      const projectInfo = await ProjectModel.findAll({
        raw: true,
        where: { name: projects[0].name }
      });
      compareProjectInfo(projectInfo, projects[0]);
    });

    it('should insert project2', async () => {
      await Project.insert(projects[1]);
      const projectInfo = await ProjectModel.findAll({
        raw: true,
        where: { name: projects[1].name }
      });
      compareProjectInfo(projectInfo, projects[1]);
    });
  });

  describe('select', () => {
    it('should select project1 details', async () => {
      await ProjectModel.create(projects[0]);
      const projectInfo = await Project.select({ name: projects[0].name });
      compareProjectInfo(projectInfo, projects[0]);
    });

    it('should select project2 details', async () => {
      await ProjectModel.create(projects[1]);
      const projectInfo = await Project.select({ name: projects[1].name });
      compareProjectInfo(projectInfo, projects[1]);
    });
  });

  describe('update', () => {
    it('should update project1 details', async () => {
      await ProjectModel.create(projects[0]);
      const newStartDate = '2020-04-01';
      await Project.update({
        name: projects[0].name,
        start_date: newStartDate
      });
      const projectInfo = await ProjectModel.findAll({
        raw: true,
        where: { name: projects[0].name }
      });

      const expectedProjectInfo = Object.assign(projects[0], {});
      expectedProjectInfo.start_date = newStartDate;
      compareProjectInfo(projectInfo, expectedProjectInfo);
    });

    it('should update project2 details', async () => {
      await ProjectModel.create(projects[1]);
      const newEndDate = '2020-08-17';
      await Project.update({ name: projects[1].name, end_date: newEndDate });
      const projectInfo = await ProjectModel.findAll({
        raw: true,
        where: { name: projects[1].name }
      });

      const expectedProjectInfo = Object.assign(projects[1], {});
      expectedProjectInfo.end_date = newEndDate;
      compareProjectInfo(projectInfo, expectedProjectInfo);
    });
  });

  describe('delete', () => {
    it('should delete project1', async () => {
      await ProjectModel.create(projects[0]);
      await Project.delete({ name: projects[0].name });
      const projectInfo = await ProjectModel.findAll({
        raw: true,
        where: { name: projects[0].name }
      });
      expect(projectInfo).to.have.lengthOf(0);
    });

    it('should delete project2', async () => {
      await ProjectModel.create(projects[1]);
      await Project.delete({ name: projects[1].name });
      const projectInfo = await ProjectModel.findAll({
        raw: true,
        where: { name: projects[1].name }
      });
      expect(projectInfo).to.have.lengthOf(0);
    });
  });

  const compareProjectInfo = (results, project) => {
    expect(results).to.have.lengthOf(1);
    const projectInfo = results[0];
    expect(projectInfo).to.have.property('name', project.name);
    expect(projectInfo).to.have.property('start_date', project.start_date);
    expect(projectInfo).to.have.property('end_date', project.end_date);
  };
});
