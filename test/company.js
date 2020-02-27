const expect = require('chai').expect;
const Company = require('../src/controller/company');
const sequelize = require('../src/utils/connect_sequelize');
const CompanyModel = require('../models/company')(sequelize);
const { truncateTable } = require('./helpers');

describe('Company table', () => {
  const company1 = {
    name: 'everest engineering',
    address: 'banglore',
    registration_no: '10000',
    phone_no: '1234567890',
    website: 'everestengineering.com'
  };
  const company2 = {
    name: 'imnotout',
    address: 'vizag',
    registration_no: '10001',
    phone_no: '0987654321',
    website: 'imnotout.com'
  };

  beforeEach(async () => {
    await truncateTable('company');
  });

  describe('insert', () => {
    it('should insert company1', async () => {
      await Company.insert(company1);
      const results = await CompanyModel.findAll({
        raw: true,
        where: { name: company1.name }
      });
      expect(results).to.have.lengthOf(1);

      const companyInfo = results[0];
      expect(companyInfo).to.have.property('name', company1.name);
      expect(companyInfo).to.have.property('address', company1.address);
      expect(companyInfo).to.have.property(
        'registration_no',
        company1.registration_no
      );
      expect(companyInfo).to.have.property('phone_no', company1.phone_no);
      expect(companyInfo).to.have.property('website', company1.website);
    });

    it('should insert company2', async () => {
      await Company.insert(company2);
      const results = await CompanyModel.findAll({
        raw: true,
        where: { name: company2.name }
      });
      expect(results).to.have.lengthOf(1);

      const companyInfo = results[0];
      expect(companyInfo).to.have.property('name', company2.name);
      expect(companyInfo).to.have.property('address', company2.address);
      expect(companyInfo).to.have.property(
        'registration_no',
        company2.registration_no
      );
      expect(companyInfo).to.have.property('phone_no', company2.phone_no);
      expect(companyInfo).to.have.property('website', company2.website);
    });
  });

  describe('select', () => {
    it('should select company1 details', async () => {
      await CompanyModel.create(company1);
      const results = await Company.select({ name: company1.name });
      expect(results).to.have.lengthOf(1);
      const companyInfo = results[0];
      expect(companyInfo).to.have.property('name', company1.name);
      expect(companyInfo).to.have.property('address', company1.address);
      expect(companyInfo).to.have.property(
        'registration_no',
        company1.registration_no
      );
      expect(companyInfo).to.have.property('phone_no', company1.phone_no);
      expect(companyInfo).to.have.property('website', company1.website);
    });

    it('should select company2 details', async () => {
      await CompanyModel.create(company2);
      const results = await Company.select({ name: company2.name });
      expect(results).to.have.lengthOf(1);
      const companyInfo = results[0];
      expect(companyInfo).to.have.property('name', company2.name);
      expect(companyInfo).to.have.property('address', company2.address);
      expect(companyInfo).to.have.property(
        'registration_no',
        company2.registration_no
      );
      expect(companyInfo).to.have.property('phone_no', company2.phone_no);
      expect(companyInfo).to.have.property('website', company2.website);
    });
  });

  describe('update', () => {
    it('should update company1 details', async () => {
      await CompanyModel.create(company1);
      const comapanyNewName = 'Everest';
      await Company.update({
        name: comapanyNewName,
        registration_no: company1.registration_no
      });
      const results = await CompanyModel.findAll({
        raw: true,
        where: { registration_no: company1.registration_no }
      });
      expect(results).to.have.lengthOf(1);

      const companyInfo = results[0];
      expect(companyInfo).to.have.property('name', comapanyNewName);
      expect(companyInfo).to.have.property('address', company1.address);
      expect(companyInfo).to.have.property(
        'registration_no',
        company1.registration_no
      );
      expect(companyInfo).to.have.property('phone_no', company1.phone_no);
      expect(companyInfo).to.have.property('website', company1.website);
    });

    it('should update company2 details', async () => {
      await CompanyModel.create(company2);
      const comapanyNewName = 'Iamnotout';
      await Company.update({
        name: comapanyNewName,
        registration_no: company2.registration_no
      });
      const results = await CompanyModel.findAll({
        raw: true,
        where: { registration_no: company2.registration_no }
      });
      expect(results).to.have.lengthOf(1);

      const companyInfo = results[0];
      expect(companyInfo).to.have.property('name', comapanyNewName);
      expect(companyInfo).to.have.property('address', company2.address);
      expect(companyInfo).to.have.property(
        'registration_no',
        company2.registration_no
      );
      expect(companyInfo).to.have.property('phone_no', company2.phone_no);
      expect(companyInfo).to.have.property('website', company2.website);
    });
  });

  describe('delete', () => {
    it('delete company1', async () => {
      await CompanyModel.create(company1);
      await Company.delete({ registration_no: company1.registration_no });
      const results = await CompanyModel.findAll({
        raw: true,
        where: { registration_no: company1.registration_no }
      });
      expect(results).to.be.empty;
    });

    it('delete company2', async () => {
      await CompanyModel.create(company2);
      await Company.delete({ registration_no: company2.registration_no });
      const results = await CompanyModel.findAll({
        raw: true,
        where: { registration_no: company2.registration_no }
      });
      expect(results).to.be.empty;
    });
  });
});
