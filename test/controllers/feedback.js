process.env.NODE_ENV = "test";
const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const apiPrefix = "/api";
const User = require("../../models/user");
const Feedback = require("../../models/engineering-feedback");
const {
  GURPREET_EMAIL,
  TEST_PASSWORD,
  CANDIDATEONE_EMAIL,
  CANDIDATEONE_USER_NAME,
  CANDIDATETWO_USER_NAME,
  CONNICK_EMAIL,
  JACKIE_EMAIL,
  MATHILDE_EMAIL,
  NON_EXISTANT_USER_NAME,
  CANDIDATETWO_EMAIL,
  AMBER_EMAIL,
} = require("../../util/constants");

// const app = require("../../app");
let app;

chai.use(chaiHttp);

describe("Feedback Endpoints Test Suite", () => {
  before((done) => {
    app = require("../../app");
    app.on("listening", () => {
      done();
    });
  });
  const loginHelper = async (email, password) => {
    // the login endpoint was tested for so I will not be making assertions and testing it in this suite.
    return await chai.request(app).post(`${apiPrefix}/auth/login`).send({
      email,
      password,
    });
  };

  describe("Get engineering feedback forms for a candidate", () => {
    const showFormsEndpoint = `${apiPrefix}/feedback/showUserFeedbackForms`;
    const requestFeedbackForms = async (email, password) => {
      const res = await loginHelper(email, password);
      const {
        body: { token },
      } = res;

      return await chai
        .request(app)
        .get(showFormsEndpoint)
        .set("Authorization", `Bearer ${token}`);
    };
    it("should return forms for a candidate", async () => {
      // login as a candidate.
      const response = await requestFeedbackForms(
        CANDIDATEONE_EMAIL,
        TEST_PASSWORD
      );

      const { body } = response;
      const { data } = body;
      expect(response.status).to.equals(200);
      expect(data).to.not.be.null;
      expect(data).length.to.be.greaterThan(0);
    });

    it("should not return forms when user is not a candidate.", async () => {
      // login as an engineer.
      const response = await requestFeedbackForms(CONNICK_EMAIL, TEST_PASSWORD);

      const { body } = response;
      const { message } = body;
      expect(response.status).to.equals(403);
      expect(message).to.not.be.null;
      expect(message).to.be.equals("Not authorized to view this page!");
    });
  });

  describe("Get engineeringfeedback forms for a specified user", () => {
    const getUserFeedbackForms = async (email, password, username) => {
      // perform login to grab the token.
      const res = await loginHelper(email, password);
      const {
        body: { token },
      } = res;

      return await chai
        .request(app)
        .get(`${apiPrefix}/feedback/showUserFeedbackForms/${username}`)
        .set("Authorization", `Bearer ${token}`);
    };
    it("will return feedback form(s) for a specified candidate as an engineering manager", async () => {
      const response = await getUserFeedbackForms(
        GURPREET_EMAIL,
        TEST_PASSWORD,
        CANDIDATEONE_USER_NAME
      );

      const { body } = response;
      const { data } = body;
      expect(response.status).to.equals(200);
      // the user candidateone has one feedback form.
      expect(data).length.to.be.greaterThan(0);
    });

    it("will return feedback form(s) for a specified candidate as a recruiter", async () => {
      const response = await getUserFeedbackForms(
        JACKIE_EMAIL,
        TEST_PASSWORD,
        CANDIDATEONE_USER_NAME
      );

      const { body } = response;
      const { data } = body;
      expect(response.status).to.equals(200);
      // the user candidateone has one feedback form.
      expect(data).length.to.be.greaterThan(0);
    });

    it("will return feedback form(s) for a specified candidate as a recruiting manager", async () => {
      const response = await getUserFeedbackForms(
        MATHILDE_EMAIL,
        TEST_PASSWORD,
        CANDIDATEONE_USER_NAME
      );

      const { body } = response;
      const { data } = body;
      expect(response.status).to.equals(200);
      // the user candidateone has one feedback form.
      expect(data).length.to.be.greaterThan(0);
    });

    it("will not return feedback form(s) for a non existing candidate as a recruiter", async () => {
      const response = await getUserFeedbackForms(
        JACKIE_EMAIL,
        TEST_PASSWORD,
        NON_EXISTANT_USER_NAME
      );

      const { body } = response;
      const { message } = body;
      expect(response.status).to.equals(400);
      expect(message).to.not.be.null;
      expect(message).to.be.equals(
        "The candidate you are searching for does not exist."
      );
    });

    it("will not return feedback form(s) for a specified candidate as another candidate", async () => {
      const response = await getUserFeedbackForms(
        CANDIDATEONE_EMAIL,
        TEST_PASSWORD,
        CANDIDATETWO_USER_NAME
      );

      const { body } = response;
      const { message } = body;
      expect(response.status).to.equals(403);
      expect(message).to.not.be.null;
      expect(message).to.be.equals("Not authorized to view this page!");
    });
  });

  describe("Get engineering feedback form", async () => {
    let feedbackForms;
    let feedbackFormOneId;
    let feedbackFormTwoId;
    before(async () => {
      feedbackForms = await Feedback.findAll({
        attributes: ["id"],
      });
      feedbackFormOneId = feedbackForms[0].dataValues.id;
      feedbackFormTwoId = feedbackForms[1].dataValues.id;
    });
    const getUserFeedback = async (email, password, feedbackFormId) => {
      // perform login to grab the token.
      const res = await loginHelper(email, password);
      const {
        body: { token },
      } = res;

      return await chai
        .request(app)
        .get(`${apiPrefix}/feedback/showUserFeedbackForm/${feedbackFormId}`)
        .set("Authorization", `Bearer ${token}`);
    };
    it("will return the feedback form for a candidate", async () => {
      const response = await getUserFeedback(
        CANDIDATEONE_EMAIL,
        TEST_PASSWORD,
        feedbackFormOneId
      );

      const { body } = response;
      const { data } = body;
      expect(response.status).to.equals(200);
      expect(data).to.not.be.null;
      expect(data.documentation).to.not.be.null;
      expect(data.modularization).to.not.be.null;
      expect(data.logging).to.not.be.null;
      expect(data.errorhandling).to.not.be.null;
      expect(data.testing).to.not.be.null;
      expect(data.stylequality).to.not.be.null;
      expect(data.comments).to.not.be.null;
      expect(data.feedbackDate).to.not.be.null;
    });

    it("will return the feedback form for an engineering manager", async () => {
      const response = await getUserFeedback(
        GURPREET_EMAIL,
        TEST_PASSWORD,
        feedbackFormTwoId
      );

      const { body } = response;
      const { data } = body;
      expect(response.status).to.equals(200);
      expect(data).to.not.be.null;
      expect(data.documentation).to.not.be.null;
      expect(data.modularization).to.not.be.null;
      expect(data.logging).to.not.be.null;
      expect(data.errorhandling).to.not.be.null;
      expect(data.testing).to.not.be.null;
      expect(data.stylequality).to.not.be.null;
      expect(data.comments).to.not.be.null;
      expect(data.feedbackDate).to.not.be.null;
    });

    it("will return the feedback form for a recruiting manager", async () => {
      const response = await getUserFeedback(
        MATHILDE_EMAIL,
        TEST_PASSWORD,
        feedbackFormTwoId
      );

      const { body } = response;
      const { data } = body;
      expect(response.status).to.equals(200);
      expect(data).to.not.be.null;
      expect(data.documentation).to.not.be.null;
      expect(data.modularization).to.not.be.null;
      expect(data.logging).to.not.be.null;
      expect(data.errorhandling).to.not.be.null;
      expect(data.testing).to.not.be.null;
      expect(data.stylequality).to.not.be.null;
      expect(data.comments).to.not.be.null;
      expect(data.feedbackDate).to.not.be.null;
    });

    it("will return the feedback form for a recruiter", async () => {
      const response = await getUserFeedback(
        JACKIE_EMAIL,
        TEST_PASSWORD,
        feedbackFormOneId
      );

      const { body } = response;
      const { data } = body;
      expect(response.status).to.equals(200);
      expect(data).to.not.be.null;
      expect(data.documentation).to.not.be.null;
      expect(data.modularization).to.not.be.null;
      expect(data.logging).to.not.be.null;
      expect(data.errorhandling).to.not.be.null;
      expect(data.testing).to.not.be.null;
      expect(data.stylequality).to.not.be.null;
      expect(data.comments).to.not.be.null;
      expect(data.feedbackDate).to.not.be.null;
    });

    it("will not return the feedback form for a candidate that is not the owner", async () => {
      const response = await getUserFeedback(
        CANDIDATETWO_EMAIL,
        TEST_PASSWORD,
        feedbackFormOneId
      );

      const { body } = response;
      const { message } = body;
      expect(response.status).to.equals(403);
      expect(message).to.not.be.null;
      expect(message).to.be.equals(
        "you are not authorized to view this form!!"
      );
    });
  });

  describe("Create engineering feedback form", () => {
    // object simulating content that a user would input into the front-end or through their http client (cURL, postman, etc).
    const feedbackContent = {
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
      username: CANDIDATEONE_USER_NAME,
    };
    const createEngineeringFeedbackForm = async (
      email,
      password,
      formContent
    ) => {
      // perform login to grab the token.
      const res = await loginHelper(email, password);
      const {
        body: { token },
      } = res;

      return await chai
        .request(app)
        .post(`${apiPrefix}/feedback/create`)
        .set("Authorization", `Bearer ${token}`)
        .send(formContent);
    };
    it("will succeed in creating engineering feedback as an engineering manager", async () => {
      const response = await createEngineeringFeedbackForm(
        GURPREET_EMAIL,
        TEST_PASSWORD,
        feedbackContent
      );

      const { body } = response;
      const { message, engineeringFeedbackformId } = body;
      expect(response.status).to.equals(201);
      expect(message).to.not.be.null;
      expect(engineeringFeedbackformId).to.not.be.null;
      expect(message).to.equals("user feedback created!");
    });

    it("will not succeed in creating engineering feedback as a recruiting manager", async () => {
      const response = await createEngineeringFeedbackForm(
        MATHILDE_EMAIL,
        TEST_PASSWORD,
        feedbackContent
      );

      const { body } = response;
      const { message } = body;
      expect(response.status).to.equals(403);
      expect(message).to.not.be.null;
      expect(message).to.equals("Not authorized to view this page!");
    });

    it("will not succeed in creating engineering feedback as a recruiter", async () => {
      const response = await createEngineeringFeedbackForm(
        JACKIE_EMAIL,
        TEST_PASSWORD,
        feedbackContent
      );

      const { body } = response;
      const { message } = body;
      expect(response.status).to.equals(403);
      expect(message).to.not.be.null;
      expect(message).to.equals("Not authorized to view this page!");
    });

    it("will not succeed in creating engineering feedback as a marketing manager", async () => {
      const response = await createEngineeringFeedbackForm(
        AMBER_EMAIL,
        TEST_PASSWORD,
        feedbackContent
      );

      const { body } = response;
      const { message } = body;
      expect(response.status).to.equals(403);
      expect(message).to.not.be.null;
      expect(message).to.equals("Not authorized to view this page!");
    });
  });
});
