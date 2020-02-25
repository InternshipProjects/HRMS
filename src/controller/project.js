const sequelize = require('../utils/connect_sequelize');
const ProjectModel = require('../models/project')(sequelize);
const ProjectAllocationModel = require('../models/project_allocation')(
  sequelize
);
const EmployeeController = require('./employee');

class ProjectController {
  handleQuery(queryInput) {
    const { queryType, resource, params } = queryInput;
    switch (resource) {
      case 'project':
        const project = new Project();
        return project.query(queryType, params);
      case 'allocate_project':
        const projectAllocate = new ProjectAllocation();
        return projectAllocate.query(queryType, params);
    }
  }
}

class Project {
  async query(queryType, params) {
    const queries = {
      POST: this.insert,
      GET: this.select,
      PATCH: this.update,
      DELETE: this.delete
    };
    try {
      return queries[queryType](params);
    } catch (error) {
      throw `Invalid query type: ${queryType}`;
    }
  }

  async insert(params) {
    await ProjectModel.create(params);
  }

  async select(params) {
    const results = await ProjectModel.findAll({ where: params });
    return results[0].dataValues;
  }

  async update(params) {
    await ProjectModel.update({ params }, { where: { name: params['name'] } });
  }

  async delete(params) {
    await ProjectModel.destroy({ where: params });
  }
}

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

  async insert(params, _this) {
    const employeeInfo = await EmployeeController.handleQuery({
      queryType: 'GET',
      resource: 'employee',
      params: { emp_id: params.emp_id }
    });
    const projectObj = new Project();
    const projectInfo = await projectObj.select({ name: params.project_name });
    await ProjectAllocationModel.create({
      employee_id: employeeInfo.id,
      project_id: projectInfo.id,
      start_date: params.start_date,
      likely_end_date: params.likely_end_date
    });
  }

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
    const results = await ProjectAllocationModel.findAll({
      where: { employee_id: employeeInfo.id }
    });
    return results[0].dataValues;
  }

  async selectBasedOnProjectName(projectName) {
    const projectObj = new Project();
    const projectInfo = await projectObj.select({
      name: projectName
    });
    const results = await ProjectAllocationModel.findAll({
      where: { project_id: projectInfo.id }
    });
    return results[0].dataValues;
  }

  async selectBasedOnEmpIdAndProjectName(empId, projectName) {
    const employeeInfo = await EmployeeController.handleQuery({
      queryType: 'GET',
      resource: 'employee',
      params: { emp_id: empId }
    });
    const projectObj = new Project();
    const projectInfo = await projectObj.select({
      name: projectName
    });
    const results = await ProjectAllocationModel.findAll({
      where: { project_id: projectInfo.id, employee_id: employeeInfo.id }
    });
    return results[0].dataValues;
  }

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

module.exports = new ProjectController();
