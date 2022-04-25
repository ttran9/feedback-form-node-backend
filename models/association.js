const User = require("./user");
const Role = require("./role");

/**
 * note: unused but another way to create the associations.
 * Helper function to create the associations.
 * note: This is just placeholder code and this approach will not be used. Instead
 * I will be creating the model and setting up the association and just exporting it
 * which would require for the use of the sync function.
 */
const createAssociations = () => {
  User.hasMany(Role);
  Role.belongsTo(User);
};

module.exports = createAssociations;
