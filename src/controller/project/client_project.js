const Client = require('../client');
const Project = require('./project');
const sequelize = require('../../utils/connect_sequelize');
const { QueryTypes } = require('sequelize');

class ClientProjects {
  async query(queryType, params) {
    const queries = {
      POST: this.insert,
      GET: this.select,
      DELETE: this.delete
    };
    try {
      return queries[queryType](params);
    } catch (error) {
      console.error(error);
      throw `Invalid queryType ${queryType}`;
    }
  }

  async insert(params) {
    const clientInfo = await Client.select({ name: params.client_name });
    await sequelize.query(
      `update project set client_id=${clientInfo.id} where name = '${params.project_name}'`,
      { type: QueryTypes.INSERT }
    );
  }
  async select(params) {
    const clientInfo = await Client.select({ name: params.client_name });
    const results = await sequelize.query(
      `select * from project where client_id=${clientInfo.id}`,
      { type: QueryTypes.SELECT }
    );
    return results;
  }
  async delete(params) {
    const clientInfo = await Client.select({ name: params.client_name });
    await Project.delete({
      client_id: clientInfo.id,
      name: params.project_name
    });
  }
}

module.exports = new ClientProjects();
