"use strict";
const {
  CANDIDATE_ROLE_NAME,
  DIRECTOR_ROLE_NAME,
  ENGINEERING_ROLE_NAME,
  RECRUITING_ROLE_NAME,
  MANAGER_ROLE_NAME,
  MARKETING_ROLE_NAME,
  ADMIN_ROLE_NAME,
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
      "AppRole",
      [
        {
          name: CANDIDATE_ROLE_NAME,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: DIRECTOR_ROLE_NAME,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: ENGINEERING_ROLE_NAME,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: RECRUITING_ROLE_NAME,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: MANAGER_ROLE_NAME,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: MARKETING_ROLE_NAME,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: ADMIN_ROLE_NAME,
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
