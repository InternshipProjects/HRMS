const { resolve } = require('path');
require('dotenv').config({ path: resolve(__dirname, '../config/dev.env') });

const http = require('http');
const app = require('./app');

const port = process.env.SERVER_PORT || 5000;

const server = http.createServer(app);
server.listen(port);
