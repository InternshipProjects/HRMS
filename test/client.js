const expect = require('chai').expect;

const sequelize = require('../src/utils/connect_sequelize');
const ClientModel = require('../models/client')(sequelize);
const Client = require('../src/controller/client');
const { truncateTable } = require('./helpers');

describe('Client Table', () => {
  const client1 = {
    name: 'dell',
    website: 'dell.com',
    country: 'india'
  };
  const client2 = {
    name: 'samsung',
    website: 'hp.com',
    country: 'south korea'
  };

  beforeEach(async () => {
    await truncateTable('client');
  });

  describe('insert', () => {
    it('should insert client1', async () => {
      await Client.insert(client1);
      const results = await ClientModel.findAll({
        raw: true,
        where: { name: client1.name }
      });
      expect(results).to.have.lengthOf(1);
      const clientInfo = results[0];
      expect(clientInfo).to.have.property('name', client1.name);
      expect(clientInfo).to.have.property('website', client1.website);
      expect(clientInfo).to.have.property('country', client1.country);
    });

    it('should insert client2', async () => {
      await Client.insert(client2);
      const results = await ClientModel.findAll({
        raw: true,
        where: { name: client2.name }
      });
      expect(results).to.have.lengthOf(1);
      const clientInfo = results[0];
      expect(clientInfo).to.have.property('name', client2.name);
      expect(clientInfo).to.have.property('website', client2.website);
      expect(clientInfo).to.have.property('country', client2.country);
    });
  });

  describe('select', () => {
    it('should select client1 details', async () => {
      await ClientModel.create(client1);
      const results = await Client.select({ name: client1.name });
      expect(results).to.have.lengthOf(1);
      const clientInfo = results[0];
      expect(clientInfo).to.have.property('name', client1.name);
      expect(clientInfo).to.have.property('website', client1.website);
      expect(clientInfo).to.have.property('country', client1.country);
    });

    it('should select client2 details', async () => {
      await ClientModel.create(client2);
      const results = await Client.select({ name: client2.name });
      expect(results).to.have.lengthOf(1);
      const clientInfo = results[0];
      expect(clientInfo).to.have.property('name', client2.name);
      expect(clientInfo).to.have.property('website', client2.website);
      expect(clientInfo).to.have.property('country', client2.country);
    });
  });

  describe('update', () => {
    it('should update client1 details', async () => {
      await ClientModel.create(client1);
      const clientNewWebsite = 'www.dell.in';
      await Client.update({ name: client1.name, website: clientNewWebsite });
      const results = await ClientModel.findAll({
        raw: true,
        where: { name: client1.name }
      });
      expect(results).to.have.lengthOf(1);
      const clientInfo = results[0];
      expect(clientInfo).to.have.property('name', client1.name);
      expect(clientInfo).to.have.property('website', clientNewWebsite);
      expect(clientInfo).to.have.property('country', client1.country);
    });

    it('should update client2 details', async () => {
      await ClientModel.create(client2);
      const clientNewWebsite = 'www.samsung.in';
      await Client.update({ name: client2.name, website: clientNewWebsite });
      const results = await ClientModel.findAll({
        raw: true,
        where: { name: client2.name }
      });
      expect(results).to.have.lengthOf(1);
      const clientInfo = results[0];
      expect(clientInfo).to.have.property('name', client2.name);
      expect(clientInfo).to.have.property('website', clientNewWebsite);
      expect(clientInfo).to.have.property('country', client2.country);
    });
  });

  describe('delete', () => {
    it('should delete client1', async () => {
      await ClientModel.create(client1);
      await Client.delete({ name: client1.name });
      const results = await ClientModel.findAll({
        raw: true,
        where: { name: client1.name }
      });
      expect(results).to.have.lengthOf(0);
    });

    it('should delete client2', async () => {
      await ClientModel.create(client2);
      await Client.delete({ name: client2.name });
      const results = await ClientModel.findAll({
        raw: true,
        where: { name: client2.name }
      });
      expect(results).to.have.lengthOf(0);
    });
  });
});
