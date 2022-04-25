const dotenv = require("dotenv");
const CONFIG_CONTENT = dotenv.config().parsed;

// regexes for user validation.
const USER_NAME_REGEX = /^[a-z]{5,16}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/;
const EMAIL_REGEX =
  /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;

// constants for roles to view contents on endpoints.
const ENGINEERING_DIRECTOR_ROLES = { Engineering: true, Director: true };
const RECRUITING_DIRECTOR_ROLES = { Recruiting: true, Director: true };
const RECRUITING_ROLE = { Recruiting: true };
const CANDIDATE_ROLE = { Candidate: true };
const ADMIN_ROLE = { Admin: true };

// constants for operations used in the endpoints.
const ADD_USER_ROLE = "ADD_USER_ROLE";
const REMOVE_USER_ROLE = "REMOVE_USER_ROLE";

// test constants.
const GURPREET_USER_NAME = "gurpreet";
const GURPREET_EMAIL = "gurpreet@test.com";

const MATHILDE_USER_NAME = "mathilde";
const MATHILDE_EMAIL = "mathilde@test.com";

const JACKIE_USER_NAME = "jackie";
const JACKIE_EMAIL = "jackie@test.com";

const CONNICK_USER_NAME = "connick";
const CONNICK_EMAIL = "connick@test.com";

const AMBER_USER_NAME = "amber";
const AMBER_EMAIL = "amber@test.com";

const CANDIDATEONE_USER_NAME = "candidateone";
const CANDIDATEONE_EMAIL = "candidateone@test.com";

const CANDIDATETWO_USER_NAME = "candidatetwo";
const CANDIDATETWO_EMAIL = "candidatetwo@test.com";

const TESTCANDIDATE_USER_NAME = "testcandidate";
const TESTCANDIDATE_EMAIL = "testcandidate@test.com";

const TESTCANDIDATETWO_USER_NAME = "testcandidatetwo";
const TESTCANDIDATETWO_EMAIL = "testcandidatetwo@test.com";

const ADMIN_USER_NAME = "admin";
const ADMIN_EMAIL = "admin@test.com";

const NEW_USER_NAME = "newuser";
const NEW_USER_EMAIL = "newuser@test.com";

const NON_EXISTANT_USER_NAME = "doesnotexist";

const TEST_PASSWORD = "b0bj1Ma!";
const INCORRECT_TEST_PASSWORD = "b0bj1Ma!@";
const ADMIN_PASSWORD = CONFIG_CONTENT.ADMIN_PASSWORD || "b0bj1Ma!";

const CANDIDATE_ROLE_NAME = "Candidate";
const DIRECTOR_ROLE_NAME = "Director";
const ENGINEERING_ROLE_NAME = "Engineering";
const RECRUITING_ROLE_NAME = "Recruiting";
const MANAGER_ROLE_NAME = "Manager";
const MARKETING_ROLE_NAME = "Marketing";
const ADMIN_ROLE_NAME = "Admin";

let content = {
  CONFIG_CONTENT,
  USER_NAME_REGEX,
  PASSWORD_REGEX,
  EMAIL_REGEX,
  ENGINEERING_DIRECTOR_ROLES,
  RECRUITING_DIRECTOR_ROLES,
  RECRUITING_ROLE,
  CANDIDATE_ROLE,
  ADMIN_ROLE,
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
  NEW_USER_NAME,
  NEW_USER_EMAIL,
  INCORRECT_TEST_PASSWORD,
  ADD_USER_ROLE,
  REMOVE_USER_ROLE,
};

// export configuration values to be used elsewhere.
module.exports = content;
