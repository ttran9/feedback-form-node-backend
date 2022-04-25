const Sequelize = require("sequelize");

const sequelize = require("../config/database");

/**
 * Defining the columns in the Users table.
 */
const Role = sequelize.define(
  "Role",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { tableName: "AppRole" }
);

module.exports = Role;
