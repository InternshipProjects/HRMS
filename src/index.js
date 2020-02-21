const { resolve } = require('path');
require('dotenv').config({
  path: resolve(__dirname, '../config/dev.env')
});

const convertXlsxToJson = require('./utils/parse_xlsx');
const jsonHandler = require('./utils/json_handler.js');
const queriesHandler = require('./utils/queries_handler');

main = () => {
  const queriesJson = convertXlsxToJson(
    resolve(__dirname, './data/HRMS-queries.xlsx'),
    'queries'
  );
  const queriesInput = jsonHandler.convertJsonToQueryInput(queriesJson);
  queriesHandler.handleQueries(queriesInput);
};

main();
