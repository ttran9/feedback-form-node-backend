const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authController = require("../controllers/auth");
const {
  PASSWORD_REGEX,
  USER_NAME_REGEX,
  EMAIL_REGEX,
} = require("../util/constants");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const { generateError } = require("../util/error");

const PASSWORD_ERROR_MESSAGE =
  'Password must be 8-20 characters. The password must have a lowercase letter, an uppercase letter, a number, and a special character from the set of "!@#$%^&*()_+"';
const EMAIL_ERROR_MESSAGE = "Email must be a valid email address";
const USERNAME_ERROR_MESSAGE =
  "Username must be between 5-16 characters and only have lower case letters.";

/**
 * endpoint to register a user.
 */
router.post(
  "/signup",
  [
    body("email").matches(EMAIL_REGEX).withMessage(EMAIL_ERROR_MESSAGE),
    body("password")
      .matches(PASSWORD_REGEX)
      .withMessage(PASSWORD_ERROR_MESSAGE),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        generateError("Passwords must match");
      }
      return true;
    }),
    body("username")
      .matches(USER_NAME_REGEX)
      .withMessage(USERNAME_ERROR_MESSAGE),
  ],
  authController.signup
);

router.post("/login", authController.login);

/**
 * endpoint to add user role(s).
 */
router.post(
  "/addUserRole",
  isAuthenticated,
  isAdmin,
  authController.addUserRole
);

/**
 * endpoint to remove user role(s).
 * TODO: at a later time I will explore refactoring this to not accept a POST request
 */
router.post(
  "/removeUserRole",
  isAuthenticated,
  isAdmin,
  authController.removeUserRole
);

module.exports = router;
