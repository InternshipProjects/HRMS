const { getClientFromDB } = require('./client');
const {
  getProjectFromDB,
  updateProjectInDB,
  deleteProjectFromDB
} = require('./project');

const insertClientProjects = async params => {
  const clientInfo = await getClientFromDB({ name: params.client_name });
  await updateProjectInDB({
    name: params.project_name,
    client_id: clientInfo.id
  });
};

const getClientProjects = async params => {
  const clientInfo = await getClientFromDB({ name: params.client_name });
  return getProjectFromDB({ client_id: clientInfo.id });
};

const deleteClientProjects = async params => {
  const clientInfo = await Client.select({ name: params.client_name });
  await deleteProjectFromDB({
    client_id: clientInfo.id,
    name: params.project_name
  });
};

module.exports = {
  insertClientProjects,
  getClientProjects,
  deleteClientProjects
};
