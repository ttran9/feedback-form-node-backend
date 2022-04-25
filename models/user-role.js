const sequelize = require("../config/database");
const User = require("./user");
const Role = require("./role");

/**
 * Helper function to create the associations.
 * note: This is just placeholder code and this approach will not be used. Instead
 * I will be creating the model and setting up the association and just exporting it
 * which would require for the use of the sync function.
 */
const AppUserRole = sequelize.define(
  "AppUserRole",
  {},
  {
    tableName: "AppUserRole",
  }
);

Role.belongsToMany(User, { through: "AppUserRole", foreignKey: "roleId" });
User.belongsToMany(Role, { through: "AppUserRole", foreignKey: "userId" });

module.exports = AppUserRole;
