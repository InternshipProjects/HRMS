const sequelize = require('../utils/connect_sequelize');
const ProjectModel = require('../models/project')(sequelize);

const insertProjectInDB = async params => {
  const project = await ProjectModel.create(params);
  return project ? true : false;
};

const getProjectFromDB = async params => {
  return ProjectModel.findOne({ raw: true, where: params });
};

const updateProjectInDB = async params => {
  const project = await ProjectModel.update(params, {
    where: { name: params['name'] }
  });
  return project ? true : false;
};

const deleteProjectFromDB = async params => {
  const project = await ProjectModel.destroy({ where: params });
  return project ? true : false;
};

module.exports = {
  insertProjectInDB,
  getProjectFromDB,
  updateProjectInDB,
  deleteProjectFromDB
};
