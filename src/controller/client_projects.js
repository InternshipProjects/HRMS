const Client = require('./client');
const Project = require('./project');
const sequelize = require('../utils/connect_sequelize');
const { QueryTypes } = require('sequelize');

class ClientProjects {
  async insert(params) {
    const clientInfo = await Client.select({ name: params.client_name });
    await Project.update({
      name: params.project_name,
      client_id: clientInfo[0].id
    });
  }

  async select(params) {
    const clientInfo = await Client.select({ name: params.client_name });
    return Project.select({ client_id: clientInfo[0].id });
  }

  async delete(params) {
    const clientInfo = await Client.select({ name: params.client_name });
    await Project.delete({
      client_id: clientInfo[0].id,
      name: params.project_name
    });
  }
}

module.exports = new ClientProjects();
