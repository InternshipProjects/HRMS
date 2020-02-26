const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: 'id',
      autoIncrement: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: 'employee_id',
      autoIncrement: false,
      references: {
        key: 'id',
        model: 'employee_model'
      }
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: 'project_id',
      autoIncrement: false,
      references: {
        key: 'id',
        model: 'project_model'
      }
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: 'start_date',
      autoIncrement: false
    },
    likely_end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: 'likely_end_date',
      autoIncrement: false
    }
  };
  const options = {
    tableName: 'project_allocation',
    comment: '',
    indexes: []
  };
  const ProjectAllocationModel = sequelize.define(
    'project_allocation_model',
    attributes,
    options
  );
  return ProjectAllocationModel;
};
