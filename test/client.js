const expect = require('chai').expect;

const sequelize = require('../src/utils/connect_sequelize');
const ClientModel = require('../src/models/client')(sequelize);
const Client = require('../src/controller/client');
const Helper = require('./helper');
const { clients } = require('./data');

describe('Client Table', () => {
  beforeEach(async () => {
    await Helper.truncateTable('client');
  });

  describe('insert', () => {
    it('should insert client1', async () => {
      await Client.insert(clients[0]);
      const clientInfo = await ClientModel.findAll({
        raw: true,
        where: { name: clients[0].name }
      });
      compareClientInfo(clientInfo, clients[0]);
    });

    it('should insert client2', async () => {
      await Client.insert(clients[1]);
      const clientInfo = await ClientModel.findAll({
        raw: true,
        where: { name: clients[1].name }
      });
      compareClientInfo(clientInfo, clients[1]);
    });
  });

  describe('select', () => {
    it('should select client1 details', async () => {
      await ClientModel.create(clients[0]);
      const clientInfo = await Client.select({ name: clients[0].name });
      compareClientInfo(clientInfo, clients[0]);
    });

    it('should select client2 details', async () => {
      await ClientModel.create(clients[1]);
      const clientInfo = await Client.select({ name: clients[1].name });
      compareClientInfo(clientInfo, clients[1]);
    });
  });

  describe('update', () => {
    it('should update client1 details', async () => {
      await ClientModel.create(clients[0]);
      const newWebsite = 'www.dell.in';
      await Client.update({ name: clients[0].name, website: newWebsite });
      const clientInfo = await ClientModel.findAll({
        raw: true,
        where: { name: clients[0].name }
      });
      const expectedInfo = Object.assign(clients[0], {});
      expectedInfo.website = newWebsite;
      compareClientInfo(clientInfo, expectedInfo);
    });

    it('should update client2 details', async () => {
      await ClientModel.create(clients[1]);
      const newWebsite = 'www.samsung.in';
      await Client.update({ name: clients[1].name, website: newWebsite });
      const results = await ClientModel.findAll({
        raw: true,
        where: { name: clients[1].name }
      });
      const expectedInfo = Object.assign(clients[1], {});
      expectedInfo.website = newWebsite;
      compareClientInfo(results, expectedInfo);
    });
  });

  describe('delete', () => {
    it('should delete client1', async () => {
      await ClientModel.create(clients[0]);
      await Client.delete({ name: clients[0].name });
      const results = await ClientModel.findAll({
        raw: true,
        where: { name: clients[0].name }
      });
      expect(results).to.have.lengthOf(0);
    });

    it('should delete client2', async () => {
      await ClientModel.create(clients[1]);
      await Client.delete({ name: clients[1].name });
      const results = await ClientModel.findAll({
        raw: true,
        where: { name: clients[1].name }
      });
      expect(results).to.have.lengthOf(0);
    });
  });

  const compareClientInfo = (clientsInfo, expectedInfo) => {
    expect(clientsInfo).to.have.lengthOf(1);
    const clientInfo = clientsInfo[0];
    expect(clientInfo).to.have.property('name', expectedInfo.name);
    expect(clientInfo).to.have.property('website', expectedInfo.website);
    expect(clientInfo).to.have.property('country', expectedInfo.country);
  };
});
