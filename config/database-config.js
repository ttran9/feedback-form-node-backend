const { CONFIG_CONTENT } = require("../util/constants");
// setup the object and pass in database contents depending on the run-time environment specified.
const runtimeEnv = process.env.NODE_ENV;

const dbTestConfig = {
  username: CONFIG_CONTENT.DB_TEST_USER,
  databaseName: CONFIG_CONTENT.DB_TEST_NAME,
  password: CONFIG_CONTENT.DB_TEST_PASSWORD,
  dialect: CONFIG_CONTENT.DB_TEST_DIALECT,
  host: CONFIG_CONTENT.DB_TEST_HOST,
  port: CONFIG_CONTENT.DB_TEST_PORT,
  logging: false,
};
const dbDevelopmentConfig = {
  username: CONFIG_CONTENT.DB_USER,
  databaseName: CONFIG_CONTENT.DB_NAME,
  password: CONFIG_CONTENT.DB_PASSWORD,
  dialect: CONFIG_CONTENT.DB_DIALECT,
  host: CONFIG_CONTENT.DB_HOST,
  port: CONFIG_CONTENT.DB_PORT, // can leave blank/omit in our case because we use 3306 in our development flow.
  logging: false,
};
const dbProductionConfig = {
  username: CONFIG_CONTENT.DB_PROD_USER,
  databaseName: CONFIG_CONTENT.DB_PROD_NAME,
  password: CONFIG_CONTENT.DB_PROD_PASSWORD,
  dialect: CONFIG_CONTENT.DB_PROD_DIALECT,
  host: CONFIG_CONTENT.DB_PROD_HOST,
  port: CONFIG_CONTENT.DB_PROD_PORT,
  logging: false,
};

let databaseConfig;

switch (runtimeEnv) {
  case "test":
    databaseConfig = dbTestConfig;
    break;
  case "production":
    databaseConfig = dbProductionConfig;
    break;
  default:
    databaseConfig = dbDevelopmentConfig;
    break;
}

module.exports = { databaseConfig };
