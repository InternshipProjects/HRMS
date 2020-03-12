const sequelize = require('../utils/connect_sequelize');
const ProjectAllocationModel = require('../models/project_allocation')(
  sequelize
);
const { getEmployeeFromDB } = require('./employee');
const { getProjectFromDB } = require('./project');

// params: {emp_id: string, project_name: string, start_date: Date, likely_end_date: }
const insertProjectAllocationInfoInDB = async params => {
  const employeeInfo = await getEmployeeFromDB({ emp_id: params.emp_id });
  const projectInfo = await getProjectFromDB({ name: params.project_name });
  const insertedRecord = await ProjectAllocationModel.create({
    employee_id: employeeInfo.id,
    project_id: projectInfo.id,
    start_date: params.start_date,
    likely_end_date: params.likely_end_date
  });
  return insertedRecord ? true : false;
};

// params: { emp_id?: string, project_name?: string }
const getProjectAllocationInfoFromDB = async params => {
  if (params.emp_id && params.project_name) {
    return selectBasedOnEmpIdAndProjectName(params.emp_id, params.project_name);
  } else if (params.emp_id) {
    return selectBasedOnEmpId(params.emp_id);
  } else if (params.project_name) {
    return selectBasedOnProjectName(params.project_name);
  }
};

const selectBasedOnEmpId = async empId => {
  const employeeInfo = await getEmployeeFromDB({ emp_id: empId });
  return ProjectAllocationModel.findAll({
    raw: true,
    where: { employee_id: employeeInfo.id }
  });
};

const selectBasedOnProjectName = async projectName => {
  const projectInfo = await getProjectFromDB({
    name: projectName
  });
  return await ProjectAllocationModel.findAll({
    raw: true,
    where: { project_id: projectInfo.id }
  });
};

const selectBasedOnEmpIdAndProjectName = async (empId, projectName) => {
  const employeeInfo = await getEmployeeFromDB({
    emp_id: empId
  });
  const projectInfo = await getProjectFromDB({
    name: projectName
  });
  return await ProjectAllocationModel.findAll({
    raw: true,
    where: { project_id: projectInfo.id, employee_id: employeeInfo.id }
  });
};

// params: {emp_id: string, project_name: string, start_date?: Date, likely_end_date?: Date}
const updateProjectAllocationInfoInDB = async params => {
  const allocationInfo = await selectBasedOnEmpIdAndProjectName(
    params.emp_id,
    params.project_name
  );
  let updateParams = {};
  if (params.start_date) {
    updateParams['start_date'] = params.start_date;
  }
  if (params.likely_end_date) {
    updateParams['likely_end_date'] = params.likely_end_date;
  }
  const updatedRecord = await ProjectAllocationModel.update(updateParams, {
    where: { id: allocationInfo[0].id }
  });
  return updatedRecord ? true : false;
};

//param: {emp_id: string[], project_name: string}
const deleteProjectAllocationInfoFromDB = async params => {
  const empIds = params.emp_ids;
  const promises = empIds.map(async empId => {
    const allocationInfo = await selectBasedOnEmpIdAndProjectName(
      empId,
      params.project_name
    );
    await ProjectAllocationModel.destroy({
      where: { id: allocationInfo[0].id }
    });
  });
  const deletedRecords = await Promise.all(promises);
  return deletedRecords.length === empIds.length;
};

module.exports = {
  insertProjectAllocationInfoInDB,
  getProjectAllocationInfoFromDB,
  updateProjectAllocationInfoInDB,
  deleteProjectAllocationInfoFromDB
};
