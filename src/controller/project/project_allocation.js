const sequelize = require('../../utils/connect_sequelize');
const ProjectAllocationModel = require('../../models/project_allocation')(
  sequelize
);
const EmployeeController = require('../employee/controller');
const Project = require('./project');

class ProjectAllocation {
  query(queryType, params) {
    const queries = {
      POST: this.insert,
      GET: this.select,
      PATCH: this.update,
      DELETE: this.delete
    };
    try {
      return queries[queryType](params, this);
    } catch (error) {
      throw `Invalid query type: ${queryType}`;
    }
  }

  // params: {emp_id: string, project_name: string, start_date: Date, likely_end_date: }
  async insert(params, _this) {
    const employeeInfo = await EmployeeController.handleQuery({
      queryType: 'GET',
      resource: 'employee',
      params: { emp_id: params.emp_id }
    });
    const projectInfo = await Project.select({ name: params.project_name });
    await ProjectAllocationModel.create({
      employee_id: employeeInfo[0].id,
      project_id: projectInfo[0].id,
      start_date: params.start_date,
      likely_end_date: params.likely_end_date
    });
  }

  // params: { emp_id?: string, project_name?: string }
  async select(params, _this) {
    if (params.emp_id) {
      return _this.selectBasedOnEmpId(params.emp_id);
    } else if (params.project_name) {
      return _this.selectBasedOnProjectName(params.project_name);
    }
  }

  async selectBasedOnEmpId(empId) {
    const employeeInfo = await EmployeeController.handleQuery({
      queryType: 'GET',
      resource: 'employee',
      params: { emp_id: empId }
    });
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
    const employeeInfo = await EmployeeController.handleQuery({
      queryType: 'GET',
      resource: 'employee',
      params: { emp_id: empId }
    });
    const projectInfo = await Project.select({
      name: projectName
    });
    const results = await ProjectAllocationModel.findAll({
      where: { project_id: projectInfo[0].id, employee_id: employeeInfo[0].id }
    });
    return results[0].dataValues;
  }

  // params: {emp_id: string, project_name: string, start_date?: Date, likely_end_date?: Date}
  async update(params, _this) {
    const allocationInfo = await _this.selectBasedOnEmpIdAndProjectName(
      params.emp_id,
      params.project_name
    );
    if (params.start_date) {
      await _this.updateStartDate(allocationInfo.id, params.start_date);
    } else if (params.likely_end_date) {
      await _this.updateLikelyEndDate(
        allocationInfo.id,
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
  async delete(params, _this) {
    const empIds = _this.getEmpIds(params);
    const promises = empIds.map(async empId => {
      const allocationInfo = await _this.selectBasedOnEmpIdAndProjectName(
        empId,
        params.project_name
      );
      await ProjectAllocationModel.destroy({
        where: { id: allocationInfo.id }
      });
    });
    await Promise.all(promises);
  }

  getEmpIds(params) {
    const empIdsStr = params.emp_ids.slice(1, params.emp_ids.length - 1);
    return empIdsStr.split(', ');
  }
}

module.exports = new ProjectAllocation();
