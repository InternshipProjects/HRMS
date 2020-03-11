const expect = require('chai').expect;

const {
  insertCompanyInDB,
  getCompanyFromDB,
  updateCompanyInDB,
  deleteCompanyFromDB
} = require('../src/services/company');
const sequelize = require('../src/utils/connect_sequelize');
const CompanyModel = require('../src/models/company')(sequelize);
const { truncateTable, compareCompanyResults } = require('./helper');
const { companies } = require('./data');

describe('Company table', () => {
  beforeEach(async () => {
    await truncateTable('company');
  });

  describe('insert', () => {
    it('should insert company1', async () => {
      const isInserted = await insertCompanyInDB(companies[0]);
      expect(isInserted).to.be.true;

      const results = await CompanyModel.findAll({
        raw: true,
        where: { name: companies[0].name }
      });
      compareCompanyResults(results, companies[0]);
    });

    it('should insert company2', async () => {
      const isInserted = await insertCompanyInDB(companies[1]);
      expect(isInserted).to.be.true;

      const results = await CompanyModel.findAll({
        raw: true,
        where: { name: companies[1].name }
      });
      compareCompanyResults(results, companies[1]);
    });
  });

  describe('select', () => {
    it('should select company1 details', async () => {
      await CompanyModel.create(companies[0]);
      const results = await getCompanyFromDB({ name: companies[0].name });
      compareCompanyResults(results, companies[0]);
    });

    it('should select company2 details', async () => {
      await CompanyModel.create(companies[1]);
      const results = await getCompanyFromDB({ name: companies[1].name });
      compareCompanyResults(results, companies[1]);
    });
  });

  describe('update', () => {
    it('should update company1 details', async () => {
      await CompanyModel.create(companies[0]);

      const comapanyNewName = 'Everest';
      const isUpdated = await updateCompanyInDB({
        name: comapanyNewName,
        registration_no: companies[0].registration_no
      });
      expect(isUpdated).to.be.true;

      const results = await CompanyModel.findAll({
        raw: true,
        where: { registration_no: companies[0].registration_no }
      });

      const updatedCompanyDetails = Object.assign(companies[0], {});
      updatedCompanyDetails.name = comapanyNewName;

      compareCompanyResults(results, updatedCompanyDetails);
    });

    it('should update company2 details', async () => {
      await CompanyModel.create(companies[1]);

      const comapanyNewName = 'Iamnotout';
      const isUpdated = await updateCompanyInDB({
        name: comapanyNewName,
        registration_no: companies[1].registration_no
      });
      expect(isUpdated).to.be.true;

      const results = await CompanyModel.findAll({
        raw: true,
        where: { registration_no: companies[1].registration_no }
      });

      const updatedCompanyDetails = Object.assign(companies[1], {});
      updatedCompanyDetails.name = comapanyNewName;

      compareCompanyResults(results, updatedCompanyDetails);
    });
  });

  describe('delete', () => {
    it('delete company1', async () => {
      await CompanyModel.create(companies[0]);
      const isDeleted = await deleteCompanyFromDB({
        registration_no: companies[0].registration_no
      });
      expect(isDeleted).to.be.true;

      const results = await CompanyModel.findAll({
        raw: true,
        where: { registration_no: companies[0].registration_no }
      });
      expect(results).to.be.empty;
    });

    it('delete company2', async () => {
      await CompanyModel.create(companies[1]);
      const isDeleted = await deleteCompanyFromDB({
        registration_no: companies[1].registration_no
      });
      expect(isDeleted).to.be.true;

      const results = await CompanyModel.findAll({
        raw: true,
        where: { registration_no: companies[1].registration_no }
      });
      expect(results).to.be.empty;
    });
  });
});
