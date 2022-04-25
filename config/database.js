const Sequelize = require("sequelize");
const { databaseConfig } = require("./database-config");

/**
 * Constructing an object to connect to a database, in our case
 * MySQL will be used as we are connecting using the mysql2 dialect.
 */
const sequelize = new Sequelize(
  databaseConfig.databaseName,
  databaseConfig.username,
  databaseConfig.password,
  {
    dialect: databaseConfig.dialect,
    host: databaseConfig.host,
    logging: databaseConfig.logging,
    port: databaseConfig.port,
  }
);

module.exports = sequelize;
