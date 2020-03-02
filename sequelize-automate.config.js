require('dotenv').config({ path: './config/dev.env' });

module.exports = {
  dbOptions: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_TYPE,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    logging: false
  },
  options: {
    type: 'js',
    dir: 'src/models'
  }
};
