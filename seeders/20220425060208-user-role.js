"use strict";

const ROLE_TABLE_NAME = "AppRole";
const USER_TABLE_NAME = "AppUser";
const USER_ROLE_TABLE_NAME = "AppUserRole";
const {
  GURPREET_USER_NAME,
  MATHILDE_USER_NAME,
  JACKIE_USER_NAME,
  CONNICK_USER_NAME,
  AMBER_USER_NAME,
  CANDIDATEONE_USER_NAME,
  CANDIDATETWO_USER_NAME,
  TESTCANDIDATE_USER_NAME,
  TESTCANDIDATETWO_USER_NAME,
  ADMIN_USER_NAME,
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
    const engineeringRoleId = await queryInterface.rawSelect(
      ROLE_TABLE_NAME,
      {
        where: {
          name: ENGINEERING_ROLE_NAME,
        },
      },
      ["id"]
    );

    const recruitingRoleId = await queryInterface.rawSelect(
      ROLE_TABLE_NAME,
      {
        where: {
          name: RECRUITING_ROLE_NAME,
        },
      },
      ["id"]
    );

    const managerRoleId = await queryInterface.rawSelect(
      ROLE_TABLE_NAME,
      {
        where: {
          name: MANAGER_ROLE_NAME,
        },
      },
      ["id"]
    );

    const directorRoleId = await queryInterface.rawSelect(
      ROLE_TABLE_NAME,
      {
        where: {
          name: DIRECTOR_ROLE_NAME,
        },
      },
      ["id"]
    );

    const marketingRoleId = await queryInterface.rawSelect(
      ROLE_TABLE_NAME,
      {
        where: {
          name: MARKETING_ROLE_NAME,
        },
      },
      ["id"]
    );

    const candidateRoleId = await queryInterface.rawSelect(
      ROLE_TABLE_NAME,
      {
        where: {
          name: CANDIDATE_ROLE_NAME,
        },
      },
      ["id"]
    );

    const adminRoleId = await queryInterface.rawSelect(
      ROLE_TABLE_NAME,
      {
        where: {
          name: ADMIN_ROLE_NAME,
        },
      },
      ["id"]
    );

    const gurpreetId = await queryInterface.rawSelect(
      USER_TABLE_NAME,
      {
        where: {
          username: GURPREET_USER_NAME,
        },
      },
      ["id"]
    );

    const mathildeId = await queryInterface.rawSelect(
      USER_TABLE_NAME,
      {
        where: {
          username: MATHILDE_USER_NAME,
        },
      },
      ["id"]
    );

    const jackieId = await queryInterface.rawSelect(
      USER_TABLE_NAME,
      {
        where: {
          username: JACKIE_USER_NAME,
        },
      },
      ["id"]
    );

    const connickId = await queryInterface.rawSelect(
      USER_TABLE_NAME,
      {
        where: {
          username: CONNICK_USER_NAME,
        },
      },
      ["id"]
    );

    const amberId = await queryInterface.rawSelect(
      USER_TABLE_NAME,
      {
        where: {
          username: AMBER_USER_NAME,
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
    const testCandidateId = await queryInterface.rawSelect(
      USER_TABLE_NAME,
      {
        where: {
          username: TESTCANDIDATE_USER_NAME,
        },
      },
      ["id"]
    );
    const testCandidateTwoId = await queryInterface.rawSelect(
      USER_TABLE_NAME,
      {
        where: {
          username: TESTCANDIDATETWO_USER_NAME,
        },
      },
      ["id"]
    );
    const adminId = await queryInterface.rawSelect(
      USER_TABLE_NAME,
      {
        where: {
          username: ADMIN_USER_NAME,
        },
      },
      ["id"]
    );

    await queryInterface.bulkInsert(USER_ROLE_TABLE_NAME, [
      {
        userId: gurpreetId,
        roleId: engineeringRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: gurpreetId,
        roleId: directorRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: mathildeId,
        roleId: recruitingRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: mathildeId,
        roleId: directorRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: jackieId,
        roleId: recruitingRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: connickId,
        roleId: engineeringRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: amberId,
        roleId: marketingRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: amberId,
        roleId: managerRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: candidateOneId,
        roleId: candidateRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: candidateTwoId,
        roleId: candidateRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: adminId,
        roleId: adminRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: testCandidateId,
        roleId: candidateRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: testCandidateId,
        roleId: engineeringRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: testCandidateTwoId,
        roleId: candidateRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
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
  },
};
