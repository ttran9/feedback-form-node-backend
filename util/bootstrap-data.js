const User = require("../models/user");
const Role = require("../models/role");
const EngineeringFeedback = require("../models/engineering-feedback");
const bcrypt = require("bcryptjs");
const UserEngineeringFeedback = require("../models/user-engineering-feedback");
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
  CANDIDATE_ROLE_NAME,
  DIRECTOR_ROLE_NAME,
  ENGINEERING_ROLE_NAME,
  RECRUITING_ROLE_NAME,
  MANAGER_ROLE_NAME,
  MARKETING_ROLE_NAME,
  ADMIN_ROLE_NAME,
} = require("./constants");

/**
 * helper function to create users all with the same password for testing.
 * note: this is only meant to be used in testing and development environments.
 */
const createUsers = async () => {
  await User.create({
    username: GURPREET_USER_NAME,
    email: GURPREET_EMAIL,
    password: await bcrypt.hash(TEST_PASSWORD, 12),
  });
  await User.create({
    username: MATHILDE_USER_NAME,
    email: MATHILDE_EMAIL,
    password: await bcrypt.hash(TEST_PASSWORD, 12),
  });
  await User.create({
    username: JACKIE_USER_NAME,
    email: JACKIE_EMAIL,
    password: await bcrypt.hash(TEST_PASSWORD, 12),
  });
  await User.create({
    username: CONNICK_USER_NAME,
    email: CONNICK_EMAIL,
    password: await bcrypt.hash(TEST_PASSWORD, 12),
  });
  await User.create({
    username: AMBER_USER_NAME,
    email: AMBER_EMAIL,
    password: await bcrypt.hash(TEST_PASSWORD, 12),
  });
  await User.create({
    username: CANDIDATEONE_USER_NAME,
    email: CANDIDATEONE_EMAIL,
    password: await bcrypt.hash(TEST_PASSWORD, 12),
  });
  await User.create({
    username: CANDIDATETWO_USER_NAME,
    email: CANDIDATETWO_EMAIL,
    password: await bcrypt.hash(TEST_PASSWORD, 12),
  });
  await User.create({
    username: TESTCANDIDATE_USER_NAME,
    email: TESTCANDIDATE_EMAIL,
    password: await bcrypt.hash(TEST_PASSWORD, 12),
  });
  await User.create({
    username: TESTCANDIDATETWO_USER_NAME,
    email: TESTCANDIDATETWO_EMAIL,
    password: await bcrypt.hash(TEST_PASSWORD, 12),
  });
  await User.create({
    username: ADMIN_USER_NAME,
    email: ADMIN_EMAIL,
    password: await bcrypt.hash(ADMIN_PASSWORD, 12),
  });
};

/**
 * creating roles to assist with testing endpoints requiring different roles.
 */
const createRoles = async () => {
  await Role.create({
    name: CANDIDATE_ROLE_NAME,
  });
  await Role.create({
    name: DIRECTOR_ROLE_NAME,
  });
  await Role.create({
    name: ENGINEERING_ROLE_NAME,
  });
  await Role.create({
    name: RECRUITING_ROLE_NAME,
  });
  await Role.create({
    name: MANAGER_ROLE_NAME,
  });
  await Role.create({
    name: MARKETING_ROLE_NAME,
  });
  await Role.create({
    name: ADMIN_ROLE_NAME,
  });
};

/**
 * helper function to add roles to users.
 */
const createUserRoles = async () => {
  await createUsers();
  await createRoles();

  const admin = await User.findOne({ where: { username: ADMIN_ROLE_NAME } });
  const gurpreet = await User.findOne({
    where: { username: GURPREET_USER_NAME },
  });
  const mathilde = await User.findOne({
    where: { username: MATHILDE_USER_NAME },
  });
  const jackie = await User.findOne({ where: { username: JACKIE_USER_NAME } });
  const connick = await User.findOne({
    where: { username: CONNICK_USER_NAME },
  });
  const amber = await User.findOne({ where: { username: AMBER_USER_NAME } });
  const candidateone = await User.findOne({
    where: { username: CANDIDATEONE_USER_NAME },
  });
  const candidatetwo = await User.findOne({
    where: { username: CANDIDATETWO_USER_NAME },
  });
  const testCandidate = await User.findOne({
    where: { username: TESTCANDIDATE_USER_NAME },
  });
  const testCandidateTwo = await User.findOne({
    where: { username: TESTCANDIDATETWO_USER_NAME },
  });

  const candidateRole = await Role.findOne({
    where: {
      name: CANDIDATE_ROLE_NAME,
    },
  });
  const directorRole = await Role.findOne({
    where: {
      name: DIRECTOR_ROLE_NAME,
    },
  });
  const engineeringRole = await Role.findOne({
    where: {
      name: ENGINEERING_ROLE_NAME,
    },
  });
  const recruiterRole = await Role.findOne({
    where: {
      name: RECRUITING_ROLE_NAME,
    },
  });
  const managerRole = await Role.findOne({
    where: {
      name: MANAGER_ROLE_NAME,
    },
  });
  const marketingRole = await Role.findOne({
    where: {
      name: MARKETING_ROLE_NAME,
    },
  });
  const adminRole = await Role.findOne({
    where: {
      name: ADMIN_ROLE_NAME,
    },
  });

  addRolesToUser(gurpreet, [engineeringRole, directorRole]);
  addRolesToUser(mathilde, [recruiterRole, directorRole]);
  addRolesToUser(jackie, [recruiterRole]);
  addRolesToUser(connick, [engineeringRole]);
  addRolesToUser(amber, [marketingRole, managerRole]);
  addRolesToUser(candidateone, [candidateRole]);
  addRolesToUser(candidatetwo, [candidateRole]);
  addRolesToUser(admin, [adminRole]);
  addRolesToUser(testCandidate, [candidateRole, engineeringRole]); // this candidate will be used for testing adding user role.
  addRolesToUser(testCandidateTwo, [candidateRole]); // this candidate will be used for testing removing a user role.
};

/**
 * helper function to add specified roles to a user.
 * @param {object} user The user to have roles added to.
 * @param {array} roles The roles to be added.
 */
const addRolesToUser = async (user, roles) => {
  if (roles.length === 0) return;
  user.addRoles(roles);
};

/**
 * helper function to create feedback data for testing.
 */
const createEngineeringFeedback = async () => {
  const gurpreet = await User.findOne({
    where: { username: GURPREET_USER_NAME },
  });
  const candidateone = await User.findOne({
    where: { username: CANDIDATEONE_USER_NAME },
  });
  const candidatetwo = await User.findOne({
    where: { username: CANDIDATETWO_USER_NAME },
  });

  const engineeringFeedbackOne = await EngineeringFeedback.create({
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
  });

  const engineeringFeedbackTwo = await EngineeringFeedback.create({
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
  });

  await UserEngineeringFeedback.create({
    engineeringManagerId: gurpreet.id,
    candidateId: candidateone.id,
    engineeringFeedbackId: engineeringFeedbackOne.id,
  });
  await UserEngineeringFeedback.create({
    engineeringManagerId: gurpreet.id,
    candidateId: candidatetwo.id,
    engineeringFeedbackId: engineeringFeedbackTwo.id,
  });
};

module.exports = {
  createUserRoles,
  createEngineeringFeedback,
};
