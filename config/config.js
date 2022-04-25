const { CONFIG_CONTENT } = require("../util/constants");
// setup the object and pass in database contents depending on the run-time environment specified.

module.exports = {
  development: {
    username: CONFIG_CONTENT.DB_USER,
    database: CONFIG_CONTENT.DB_NAME,
    password: CONFIG_CONTENT.DB_PASSWORD,
    dialect: CONFIG_CONTENT.DB_DIALECT,
    host: CONFIG_CONTENT.DB_HOST,
    port: CONFIG_CONTENT.DB_PORT, // can leave blank/omit in our case because we use 3306 in our development flow.
    logging: false,
  },
  test: {
    username: CONFIG_CONTENT.DB_TEST_USER,
    database: CONFIG_CONTENT.DB_TEST_NAME,
    password: CONFIG_CONTENT.DB_TEST_PASSWORD,
    dialect: CONFIG_CONTENT.DB_TEST_DIALECT,
    host: CONFIG_CONTENT.DB_TEST_HOST,
    port: CONFIG_CONTENT.DB_TEST_PORT,
    logging: true,
  },
  production: {
    username: CONFIG_CONTENT.DB_PROD_USER,
    database: CONFIG_CONTENT.DB_PROD_NAME,
    password: CONFIG_CONTENT.DB_PROD_PASSWORD,
    dialect: CONFIG_CONTENT.DB_PROD_DIALECT,
    host: CONFIG_CONTENT.DB_PROD_HOST,
    port: CONFIG_CONTENT.DB_PROD_PORT,
    logging: false,
  },
};
