const expect = require('chai').expect;

const Company = require('../src/controller/company');
const sequelize = require('../src/utils/connect_sequelize');
const CompanyModel = require('../src/models/company')(sequelize);
const Helper = require('./helper');
const { companies } = require('./data');

describe('Company table', () => {
  beforeEach(async () => {
    await Helper.truncateTable('company');
  });

  describe('insert', () => {
    it('should insert company1', async () => {
      await Company.insert(companies[0]);
      const results = await CompanyModel.findAll({
        raw: true,
        where: { name: companies[0].name }
      });
      Helper.compareCompanyResults(results, companies[0]);
    });

    it('should insert company2', async () => {
      await Company.insert(companies[1]);
      const results = await CompanyModel.findAll({
        raw: true,
        where: { name: companies[1].name }
      });
      Helper.compareCompanyResults(results, companies[1]);
    });
  });

  describe('select', () => {
    it('should select company1 details', async () => {
      await CompanyModel.create(companies[0]);
      const results = await Company.select({ name: companies[0].name });
      Helper.compareCompanyResults(results, companies[0]);
    });

    it('should select company2 details', async () => {
      await CompanyModel.create(companies[1]);
      const results = await Company.select({ name: companies[1].name });
      Helper.compareCompanyResults(results, companies[1]);
    });
  });

  describe('update', () => {
    it('should update company1 details', async () => {
      await CompanyModel.create(companies[0]);

      const comapanyNewName = 'Everest';
      await Company.update({
        name: comapanyNewName,
        registration_no: companies[0].registration_no
      });

      const results = await CompanyModel.findAll({
        raw: true,
        where: { registration_no: companies[0].registration_no }
      });

      const updatedCompanyDetails = Object.assign(companies[0], {});
      updatedCompanyDetails.name = comapanyNewName;

      Helper.compareCompanyResults(results, updatedCompanyDetails);
    });

    it('should update company2 details', async () => {
      await CompanyModel.create(companies[1]);

      const comapanyNewName = 'Iamnotout';
      await Company.update({
        name: comapanyNewName,
        registration_no: companies[1].registration_no
      });

      const results = await CompanyModel.findAll({
        raw: true,
        where: { registration_no: companies[1].registration_no }
      });

      const updatedCompanyDetails = Object.assign(companies[1], {});
      updatedCompanyDetails.name = comapanyNewName;

      Helper.compareCompanyResults(results, updatedCompanyDetails);
    });
  });

  describe('delete', () => {
    it('delete company1', async () => {
      await CompanyModel.create(companies[0]);
      await Company.delete({ registration_no: companies[0].registration_no });
      const results = await CompanyModel.findAll({
        raw: true,
        where: { registration_no: companies[0].registration_no }
      });
      expect(results).to.be.empty;
    });

    it('delete company2', async () => {
      await CompanyModel.create(companies[1]);
      await Company.delete({ registration_no: companies[1].registration_no });
      const results = await CompanyModel.findAll({
        raw: true,
        where: { registration_no: companies[1].registration_no }
      });
      expect(results).to.be.empty;
    });
  });
});
