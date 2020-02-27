const sequelize = require('../src/utils/connect_sequelize');

const truncateTable = async tableName => {
  await sequelize.query(`truncate ${tableName} cascade`);
};

module.exports = { truncateTable };
