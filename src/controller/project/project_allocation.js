const sequelize = require('../../utils/connect_sequelize');
const ProjectAllocationModel = require('../../models/project_allocation')(
  sequelize
);
const Employee = require('../employee/employee');
const Project = require('./project');

class ProjectAllocation {
  // params: {emp_id: string, project_name: string, start_date: Date, likely_end_date: }
  async insert(params) {
    const employeeInfo = await Employee.select({ emp_id: params.emp_id });
    const projectInfo = await Project.select({ name: params.project_name });
    await ProjectAllocationModel.create({
      employee_id: employeeInfo[0].id,
      project_id: projectInfo[0].id,
      start_date: params.start_date,
      likely_end_date: params.likely_end_date
    });
  }

  // params: { emp_id?: string, project_name?: string }
  async select(params) {
    if (params.emp_id) {
      return this.selectBasedOnEmpId(params.emp_id);
    } else if (params.project_name) {
      return this.selectBasedOnProjectName(params.project_name);
    }
  }

  async selectBasedOnEmpId(empId) {
    const employeeInfo = await Employee.select({ emp_id: empId });
    return ProjectAllocationModel.findAll({
      raw: true,
      where: { employee_id: employeeInfo[0].id }
    });
  }

  async selectBasedOnProjectName(projectName) {
    const projectInfo = await Project.select({
      name: projectName
    });
    return await ProjectAllocationModel.findAll({
      raw: true,
      where: { project_id: projectInfo[0].id }
    });
  }

  async selectBasedOnEmpIdAndProjectName(empId, projectName) {
    const employeeInfo = await Employee.select({
      emp_id: empId
    });
    const projectInfo = await Project.select({
      name: projectName
    });
    return await ProjectAllocationModel.findAll({
      raw: true,
      where: { project_id: projectInfo[0].id, employee_id: employeeInfo[0].id }
    });
  }

  // params: {emp_id: string, project_name: string, start_date?: Date, likely_end_date?: Date}
  async update(params) {
    const allocationInfo = await this.selectBasedOnEmpIdAndProjectName(
      params.emp_id,
      params.project_name
    );
    if (params.start_date) {
      await this.updateStartDate(allocationInfo[0].id, params.start_date);
    } else if (params.likely_end_date) {
      await this.updateLikelyEndDate(
        allocationInfo[0].id,
        params.likely_end_date
      );
    }
  }

  async updateStartDate(id, startDate) {
    await ProjectAllocationModel.update(
      { start_date: startDate },
      { where: { id: id } }
    );
  }

  async updateLikelyEndDate(id, likelyEndDate) {
    await ProjectAllocationModel.update(
      { likely_end_date: likelyEndDate },
      { where: { id: id } }
    );
  }

  //param: {emp_id: string[], project_name: string}
  async delete(params) {
    const empIds = params.emp_ids;
    const promises = empIds.map(async empId => {
      const allocationInfo = await this.selectBasedOnEmpIdAndProjectName(
        empId,
        params.project_name
      );
      await ProjectAllocationModel.destroy({
        where: { id: allocationInfo[0].id }
      });
    });
    await Promise.all(promises);
  }
}

module.exports = new ProjectAllocation();
