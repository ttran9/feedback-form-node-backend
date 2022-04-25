/**
 * the candidate (user) the engineering feedback is intended for.
 */
const sequelize = require("../config/database");
const User = require("./user");
const EngineeringFeedback = require("./engineering-feedback");

/**
 * the candidate (user) the engineering feedback is intended for.
 */

const UserEngineeringFeedback = sequelize.define(
  "UserEngineeringFeedback",
  {},
  { tableName: "UserEngineeringFeedback" }
);

EngineeringFeedback.hasMany(UserEngineeringFeedback, {
  foreignKey: "engineeringFeedbackId",
});

User.hasMany(UserEngineeringFeedback, {
  foreignKey: "engineeringManagerId",
});

UserEngineeringFeedback.belongsTo(User, {
  foreignKey: "engineeringManagerId",
});

User.hasMany(UserEngineeringFeedback, {
  foreignKey: "candidateId",
});

UserEngineeringFeedback.belongsTo(User, {
  foreignKey: "candidateId",
});

module.exports = UserEngineeringFeedback;
