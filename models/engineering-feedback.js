const Sequelize = require("sequelize");

const sequelize = require("../config/database");

/**
 * Defining the columns in the Engineering Feedback
 */
const EngineeringFeedback = sequelize.define(
  "EngineeringFeedback",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    documentation: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: "no feedback/comment",
    },
    modularization: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: "no feedback/comment",
    },
    logging: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: "no feedback/comment",
    },
    errorhandling: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: "no feedback/comment",
    },
    testing: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: "no feedback/comment",
    },
    stylequality: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: "no feedback/comment",
    },
    comments: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: "no feedback/comment",
    },
  },
  { tableName: "EngineeringFeedback" }
);

module.exports = EngineeringFeedback;
