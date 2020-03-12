const { getClientFromDB } = require('./client');
const {
  getProjectFromDB,
  updateProjectInDB,
  deleteProjectFromDB
} = require('./project');

const insertClientProjectsInDB = async params => {
  const clientInfo = await getClientFromDB({ name: params.client_name });
  await updateProjectInDB({
    name: params.project_name,
    client_id: clientInfo.id
  });
};

const getClientProjectsFromDB = async params => {
  const clientInfo = await getClientFromDB({ name: params.client_name });
  return getProjectFromDB({ client_id: clientInfo.id });
};

const deleteClientProjectsFromDB = async params => {
  const clientInfo = await getClientFromDB({ name: params.client_name });
  await deleteProjectFromDB({
    client_id: clientInfo.id,
    name: params.project_name
  });
};

module.exports = {
  insertClientProjectsInDB,
  getClientProjectsFromDB,
  deleteClientProjectsFromDB
};
