const expect = require('chai').expect;

const sequelize = require('../src/utils/connect_sequelize');
const SkillsModel = require('../src/models/skills')(sequelize);
const Skills = require('../src/controller/skills');
const Helper = require('./helper');

describe('Skills Table', () => {
  const skill1 = {
    name: 'Python'
  };
  const skill2 = {
    name: 'Java'
  };

  beforeEach(async () => {
    await Helper.truncateTable('skills');
  });

  describe('insert', () => {
    it('should insert skill1', async () => {
      const results = await Skills.selectOrInsert(skill1);
      expect(results).to.have.property('name', skill1.name.toLowerCase());
    });

    it('should insert skill2', async () => {
      const results = await Skills.selectOrInsert(skill2);
      expect(results).to.have.property('name', skill2.name.toLowerCase());
    });
  });

  describe('select', () => {
    it('should select skill1', async () => {
      await SkillsModel.create(skill1);
      const results = await Skills.select({ name: skill1.name });
      expect(results).to.have.lengthOf(1);
      expect(results[0]).to.have.property('name', skill1.name);
    });

    it('should select skill2', async () => {
      await SkillsModel.create(skill2);
      const results = await Skills.select({ name: skill2.name });
      expect(results).to.have.lengthOf(1);
      expect(results[0]).to.have.property('name', skill2.name);
    });
  });

  describe('delete', () => {
    it('should delete skill1', async () => {
      await SkillsModel.create(skill1);
      await Skills.delete({ name: skill1.name });
      const results = await SkillsModel.findAll({
        raw: true,
        where: { name: skill1.name }
      });
      expect(results).to.have.lengthOf(0);
    });

    it('should delete skill2', async () => {
      await SkillsModel.create(skill2);
      await Skills.delete({ name: skill2.name });
      const results = await SkillsModel.findAll({
        raw: true,
        where: { name: skill2.name }
      });
      expect(results).to.have.lengthOf(0);
    });
  });
});
