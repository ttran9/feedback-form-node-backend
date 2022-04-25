"use strict";

const EngineeringFeedback = require("../models/engineering-feedback");
const {
  GURPREET_USER_NAME,
  CANDIDATEONE_USER_NAME,
  CANDIDATETWO_USER_NAME,
} = require("../util/constants");

const USER_TABLE_NAME = "AppUser";
const ENGINEERING_FEEDBACK_TABLE_NAME = "EngineeringFeedback";
const USER_ENGINEERING_FEEDBACK_TABLE_NAME = "UserEngineeringFeedback";
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const gurpreetId = await queryInterface.rawSelect(
      USER_TABLE_NAME,
      {
        where: {
          username: GURPREET_USER_NAME,
        },
      },
      ["id"]
    );
    const candidateOneId = await queryInterface.rawSelect(
      USER_TABLE_NAME,
      {
        where: {
          username: CANDIDATEONE_USER_NAME,
        },
      },
      ["id"]
    );
    const candidateTwoId = await queryInterface.rawSelect(
      USER_TABLE_NAME,
      {
        where: {
          username: CANDIDATETWO_USER_NAME,
        },
      },
      ["id"]
    );
    const engineeringFeedbackIds = await queryInterface.rawSelect(
      ENGINEERING_FEEDBACK_TABLE_NAME,
      {
        plain: false,
      },
      ["id"]
    );

    await queryInterface.bulkInsert(USER_ENGINEERING_FEEDBACK_TABLE_NAME, [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        engineeringManagerId: gurpreetId,
        candidateId: candidateOneId,
        engineeringFeedbackId: engineeringFeedbackIds[0].id,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        engineeringManagerId: gurpreetId,
        candidateId: candidateTwoId,
        engineeringFeedbackId: engineeringFeedbackIds[1].id,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("UserEngineeringFeedback", null, {});
    await queryInterface.bulkDelete("EngineeringFeedback", null, {});
    await queryInterface.bulkDelete("AppUserRole", null, {});
    await queryInterface.bulkDelete("AppRole", null, {});
    await queryInterface.bulkDelete("AppUser", null, {});
  },
};
