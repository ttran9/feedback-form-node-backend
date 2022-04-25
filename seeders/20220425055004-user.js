"use strict";
const bcrypt = require("bcryptjs");
const {
  GURPREET_USER_NAME,
  GURPREET_EMAIL,
  MATHILDE_USER_NAME,
  MATHILDE_EMAIL,
  JACKIE_USER_NAME,
  JACKIE_EMAIL,
  CONNICK_USER_NAME,
  CONNICK_EMAIL,
  AMBER_USER_NAME,
  AMBER_EMAIL,
  CANDIDATEONE_USER_NAME,
  CANDIDATEONE_EMAIL,
  CANDIDATETWO_USER_NAME,
  CANDIDATETWO_EMAIL,
  TESTCANDIDATE_USER_NAME,
  TESTCANDIDATE_EMAIL,
  TESTCANDIDATETWO_USER_NAME,
  TESTCANDIDATETWO_EMAIL,
  ADMIN_USER_NAME,
  ADMIN_EMAIL,
  TEST_PASSWORD,
  ADMIN_PASSWORD,
} = require("../util/constants");

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
    await queryInterface.bulkInsert(
      "AppUser",
      [
        {
          username: GURPREET_USER_NAME,
          email: GURPREET_EMAIL,
          password: await bcrypt.hash(TEST_PASSWORD, 12),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: MATHILDE_USER_NAME,
          email: MATHILDE_EMAIL,
          password: await bcrypt.hash(TEST_PASSWORD, 12),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: JACKIE_USER_NAME,
          email: JACKIE_EMAIL,
          password: await bcrypt.hash(TEST_PASSWORD, 12),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: CONNICK_USER_NAME,
          email: CONNICK_EMAIL,
          password: await bcrypt.hash(TEST_PASSWORD, 12),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: AMBER_USER_NAME,
          email: AMBER_EMAIL,
          password: await bcrypt.hash(TEST_PASSWORD, 12),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: CANDIDATEONE_USER_NAME,
          email: CANDIDATEONE_EMAIL,
          password: await bcrypt.hash(TEST_PASSWORD, 12),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: CANDIDATETWO_USER_NAME,
          email: CANDIDATETWO_EMAIL,
          password: await bcrypt.hash(TEST_PASSWORD, 12),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: TESTCANDIDATE_USER_NAME,
          email: TESTCANDIDATE_EMAIL,
          password: await bcrypt.hash(TEST_PASSWORD, 12),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: TESTCANDIDATETWO_USER_NAME,
          email: TESTCANDIDATETWO_EMAIL,
          password: await bcrypt.hash(TEST_PASSWORD, 12),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: ADMIN_USER_NAME,
          email: ADMIN_EMAIL,
          password: await bcrypt.hash(ADMIN_PASSWORD, 12),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
