const expect = require('chai').expect;

const {
  insertSkillInDB,
  getSkillInfoFromDB,
  deleteSkillFromDB
} = require('../src/services/skills');
const sequelize = require('../src/utils/connect_sequelize');
const SkillsModel = require('../src/models/skills')(sequelize);
const { truncateTable } = require('./helper');

describe('Skills Table', () => {
  const skill1 = {
    name: 'Python'
  };
  const skill2 = {
    name: 'Java'
  };

  beforeEach(async () => {
    await truncateTable('skills');
  });

  describe('insert', () => {
    it('should insert skill1', async () => {
      const isInserted = await insertSkillInDB(skill1);
      expect(isInserted).to.be.true;

      const results = await SkillsModel.findAll({
        raw: true,
        where: { name: skill1.name.toLowerCase() }
      });
      expect(results).to.have.lengthOf(1);
      expect(results[0]).to.have.property('name', skill1.name.toLowerCase());
    });

    it('should insert skill2', async () => {
      const isInserted = await insertSkillInDB(skill2);
      expect(isInserted).to.be.true;

      const results = await SkillsModel.findAll({
        raw: true,
        where: { name: skill2.name.toLowerCase() }
      });
      expect(results).to.have.lengthOf(1);
      expect(results[0]).to.have.property('name', skill2.name.toLowerCase());
    });
  });

  describe('select', () => {
    it('should select skill1', async () => {
      const skillName = skill1.name.toLowerCase();
      await SkillsModel.create({ name: skillName });
      const skillInfo = await getSkillInfoFromDB({ name: skillName });
      expect(skillInfo).to.have.property('name', skillName);
    });

    it('should select skill2', async () => {
      const skillName = skill2.name.toLowerCase();
      await SkillsModel.create({ name: skillName });
      const skillInfo = await getSkillInfoFromDB({ name: skillName });
      expect(skillInfo).to.have.property('name', skillName);
    });
  });

  describe('delete', () => {
    it('should delete skill1', async () => {
      await SkillsModel.create(skill1);
      const isDeleted = await deleteSkillFromDB({ name: skill1.name });
      expect(isDeleted).to.be.true;

      const results = await SkillsModel.findAll({
        raw: true,
        where: { name: skill1.name }
      });
      expect(results).to.have.lengthOf(0);
    });

    it('should delete skill2', async () => {
      await SkillsModel.create(skill2);
      const isDeleted = await deleteSkillFromDB({ name: skill2.name });
      expect(isDeleted).to.be.true;

      const results = await SkillsModel.findAll({
        raw: true,
        where: { name: skill2.name }
      });
      expect(results).to.have.lengthOf(0);
    });
  });
});
