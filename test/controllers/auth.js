process.env.NODE_ENV = "test";
const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const apiPrefix = "/api";
const {
  ADMIN_PASSWORD,
  GURPREET_EMAIL,
  TEST_PASSWORD,
  NEW_USER_NAME,
  NEW_USER_EMAIL,
  INCORRECT_TEST_PASSWORD,
  ADMIN_EMAIL,
  RECRUITING_ROLE_NAME,
  CANDIDATE_ROLE_NAME,
  TESTCANDIDATE_USER_NAME,
  TESTCANDIDATETWO_USER_NAME,
} = require("../../util/constants");
let app;
// const {
//   createUserRoles,
//   createEngineeringFeedback,
// } = require("../../util/bootstrap-data");

chai.use(chaiHttp);

describe("Authentication Endpoints Test Suite", () => {
  const loginEndpoint = `${apiPrefix}/auth/login`;

  before((done) => {
    app = require("../../app");
    app.on("listening", () => {
      done();
    });
  });

  describe("Login Tests", () => {
    it("should succeed for existing user", (done) => {
      const bodyContent = {
        email: GURPREET_EMAIL,
        password: TEST_PASSWORD,
      };
      chai
        .request(app)
        .post(loginEndpoint)
        .send(bodyContent)
        .end((err, res) => {
          const { body } = res;
          expect(body.token).to.not.be.null;
          expect(body.user).to.not.be.null;
          expect(res.status).to.equals(200);
          expect(body.user.userName).to.not.be.null;
          expect(body.user.userName).to.equals("gurpreet");
          done();
        });
    });

    it("should fail for non-existing user", (done) => {
      const bodyContent = {
        email: "nonexistant@test.com",
        password: TEST_PASSWORD,
      };
      chai
        .request(app)
        .post(loginEndpoint)
        .send(bodyContent)
        .end((err, res) => {
          const { body } = res;
          expect(body.message).to.not.be.null;
          expect(body.message).to.equals("Invalid credentials!");
          expect(res.status).to.equals(400);
          done();
        });
    });

    it("should fail for existing user with incorrect password", (done) => {
      const bodyContent = {
        email: GURPREET_EMAIL,
        password: INCORRECT_TEST_PASSWORD,
      };
      chai
        .request(app)
        .post(loginEndpoint)
        .send(bodyContent)
        .end((err, res) => {
          const { body } = res;
          expect(body.message).to.not.be.null;
          expect(body.message).to.equals("Invalid credentials!");
          expect(res.status).to.equals(400);
          done();
        });
    });
  });

  describe("Registration Tests", () => {
    const registrationEndpoint = `${apiPrefix}/auth/signup`;
    it("should successfully register a user", (done) => {
      const bodyContent = {
        email: NEW_USER_EMAIL,
        username: NEW_USER_NAME,
        password: TEST_PASSWORD,
        confirmPassword: TEST_PASSWORD,
      };
      chai
        .request(app)
        .post(registrationEndpoint)
        .send(bodyContent)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.equals(201);
          expect(body.message).to.not.be.null;
          expect(body.userId).to.not.be.null;
          expect(body.message).to.equals("User created!");
          done();
        });
    });
    it("should fail attempting to register an existing user.", (done) => {
      const bodyContent = {
        email: GURPREET_EMAIL,
        username: "gurpreet",
        password: "b0bj1Ma!a",
        confirmPassword: "b0bj1Ma!a",
      };
      chai
        .request(app)
        .post(registrationEndpoint)
        .send(bodyContent)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.equals(422);
          expect(body.message).to.not.be.null;
          expect(body.data).to.not.be.null;
          expect(body.message).to.equals("Errors Below!");
          const returnedErrors = body.data;
          expect(returnedErrors.length).to.equals(2);
          expect(returnedErrors[0]).to.equals("Username Exists.");
          expect(returnedErrors[1]).to.equals("Email is already in use.");
          done();
        });
    });
    it("should fail attempting to register a user without matching passwords.", (done) => {
      const bodyContent = {
        email: "doesnotexist@test.com",
        username: "doesnotexist",
        password: TEST_PASSWORD,
        confirmPassword: INCORRECT_TEST_PASSWORD,
      };
      chai
        .request(app)
        .post(registrationEndpoint)
        .send(bodyContent)
        .end((err, res) => {
          const { body } = res;
          expect(res.status).to.equals(422);
          expect(body.message).to.not.be.null;
          expect(body.message).to.equals("Errors Below!");
          expect(body.data).to.not.be.null;
          const returnedErrors = body.data;
          expect(returnedErrors.length).to.equals(1);
          expect(returnedErrors[0]).to.equals("Passwords must match");
          done();
        });
    });
  });

  describe("Updating User Role Tests", () => {
    let token;
    // perform login once before all the tests. token should last long enough (1 hour).
    before(async () => {
      const bodyContent = {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      };
      const loginRes = await chai
        .request(app)
        .post(loginEndpoint)
        .send(bodyContent);

      const { body } = loginRes;
      expect(body.token).to.not.be.null;
      token = body.token;
    });

    it("adds a user role without error", async () => {
      const addUserRoleEndpoint = `${apiPrefix}/auth/addUserRole`;
      const updateBodyContent = {
        username: TESTCANDIDATE_USER_NAME,
        roles: [RECRUITING_ROLE_NAME],
      };

      const res = await chai
        .request(app)
        .post(addUserRoleEndpoint)
        .set("Authorization", `Bearer ${token}`)
        .send(updateBodyContent);

      const { body } = res;
      expect(res.status).to.equals(200);
      expect(body.message).to.not.be.null;
      expect(body.userRoles).to.not.be.null;
      expect(body.message).to.equals("successfully added user role(s)!");
      // the user had two roles before so it is expected the user should have three roles after adding one role.
      expect(body.userRoles.length).to.equals(3);
    });

    it("removes a user role without error", async () => {
      const removeUserRoleEndpoint = `${apiPrefix}/auth/removeUserRole`;
      const updateBodyContent = {
        username: TESTCANDIDATETWO_USER_NAME,
        roles: [CANDIDATE_ROLE_NAME],
      };

      const res = await chai
        .request(app)
        .post(removeUserRoleEndpoint)
        .set("Authorization", `Bearer ${token}`)
        .send(updateBodyContent);

      const { body } = res;
      expect(res.status).to.equals(200);
      expect(body.message).to.not.be.null;
      expect(body.userRoles).to.not.be.null;
      expect(body.message).to.equals("successfully removed user role(s)!");
      // the user had one role before so it is expected the user should have no roles after removal.
      expect(body.userRoles.length).to.equals(0);
    });
  });
});
