const { resolve } = require('path');
require('dotenv').config({
  path: resolve(__dirname, '../config/dev.env')
});

const convertXlsxToJson = require('./xlsx/parse_xlsx');
const jsonHandler = require('./process/json_handler.js');
const queriesHandler = require('./controller/queries_handler');

main = () => {
  const json = convertXlsxToJson(
    resolve(__dirname, './input/HRMS-queries.xlsx'),
    'queries'
  );
  const queriesData = jsonHandler.convertJsonToQueryInput(json);
  queriesHandler.handleQueries(queriesData);
};

main();
