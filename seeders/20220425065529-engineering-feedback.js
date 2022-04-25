"use strict";

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
      "EngineeringFeedback",
      [
        {
          documentation:
            "There was good documentation but it could've been slightly cut down.",
          modularization:
            "There was modularization as code was broken into different modules.",
          logging:
            "There was the use of basic logging. There was error handling with multiple libraries (morgan and winston).",
          errorhandling:
            "There was custom error handling with an error handling middleware.",
          testing: "There was testing using mocha and chai.",
          stylequality:
            "The style could be improved with proper use of constants and using them when necessary.",
          comments:
            "Overall a good candidate but would look for a candidate with slightly stronger technical skills (more experience).",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          documentation: "There was thorough documentation. Good.",
          modularization:
            "There was modularization as code was broken into different modules.",
          logging:
            "There was the use of basic logging. There was error handling with multiple libraries (morgan and winston).",
          errorhandling:
            "There was custom error handling with an error handling middleware.",
          testing: "There was testing using mocha and chai.",
          stylequality: "The style was consistent. The quality was good.",
          comments:
            "Strong candidate. Will need feedback of others to verify for good fit.",
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
