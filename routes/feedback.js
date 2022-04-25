const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const feedbackController = require("../controllers/feedback");
const {
  isAuthenticated,
  isEngineeringManagerOrRecruiter,
  isEngineeringManager,
  isCandidate,
  isEngineeringManagerOrRecruiterOrOwner,
} = require("../middleware/auth");

/**
 * this is the intended route for a logged in candidate
 */
router.get(
  "/showUserFeedbackForms",
  isAuthenticated,
  isCandidate,
  feedbackController.showUserFeedbackForms
);

/**
 * this is intended for a recruiter or engineering manager to pass in
 * the username and look up all the feedback forms available for a user.
 */
router.get(
  "/showUserFeedbackForms/:userName",
  isAuthenticated,
  isEngineeringManagerOrRecruiter,
  feedbackController.showUserFeedbackFormsForCandidate
);

/**
 * intended for a recruiter, engineering manager, or a candidate to view.
 */
router.get(
  "/showUserFeedbackForm/:engineeringFeedbackId",
  isAuthenticated,
  isEngineeringManagerOrRecruiterOrOwner,
  feedbackController.showFeedbackForm
);

router.post(
  "/create",
  isAuthenticated,
  isEngineeringManager,
  [
    body("documentation").trim().isLength({ min: 5 }),
    body("modularization").trim().isLength({ min: 5 }),
    body("logging").trim().isLength({ min: 5 }),
    body("errorhandling").trim().isLength({ min: 5 }),
    body("testing").trim().isLength({ min: 5 }),
    body("stylequality").trim().isLength({ min: 5 }),
    body("comments").trim().isLength({ min: 5 }),
  ],
  feedbackController.createFeedbackForm
);

module.exports = router;
