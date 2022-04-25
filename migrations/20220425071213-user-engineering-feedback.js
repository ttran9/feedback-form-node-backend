"use strict";

const EngineeringFeedback = require("../models/engineering-feedback");
const User = require("../models/user");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("UserEngineeringFeedback", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      engineeringFeedbackId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "EngineeringFeedback",
          key: "id",
        },
      },
      engineeringManagerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "AppUser",
          key: "id",
        },
      },
      candidateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "AppUser",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
