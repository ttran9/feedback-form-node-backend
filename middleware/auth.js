const jwt = require("jsonwebtoken");
const {
  CONFIG_CONTENT,
  ENGINEERING_DIRECTOR_ROLES,
  RECRUITING_ROLE,
  CANDIDATE_ROLE,
  ADMIN_ROLE,
} = require("../util/constants");
const {
  generateError,
  generateErrorAndCatch,
  catchError,
} = require("../util/error");
const User = require("../models/user");
const EngineeringFeedback = require("../models/engineering-feedback");
const UserEngineeringFeedback = require("../models/user-engineering-feedback");

/**
 * Helper function to verify if the user has all the required roles to view the endpoint.
 * @param {object} requiredRoles The roles required to view the endpoint.
 * @param {array} userRoles The roles of the authenticated user.
 * @returns True if the user has the required permissions, false if not.
 */
const checkRoles = (requiredRoles, userRoles) => {
  const requiredRolesCount = Object.keys(requiredRoles).length;
  let foundRoles = 0;

  for (let i = 0; i < userRoles.length; i++) {
    if (requiredRoles[userRoles[i]]) {
      delete requiredRoles[userRoles[i]];
      foundRoles++;
    }
  }

  return foundRoles === requiredRolesCount;
};

/**
 * Helper function to check if the logged in user has the required roles to view the secured endpoint.
 * @param {object} req The HTTP request object.
 * @param {function} next A function to allow us to move to the next middleware.
 * @param {object} requiredRoles An array of objects of the required roles required for authorization.
 */
const authorizeUser = async (req, next, requiredRoles) => {
  try {
    /**
     * user is authenticated so just grab it from our backend.
     * the logged in user does get a list of roles but because it is
     * easy to modify the contents from the frontend.
     */
    /**
     * since this middleware will be used right after the isAuthenticated hardware
     * the userId will be grabbed from the userId.
     * note: an alternative approach would be to refactor the isAuthenticated logic into a
     * private helper function and just call that in both this middleware function and the
     * isAuthenticated middle function.
     */
    const loggedInUser = await User.findOne({ where: { id: req.userId } });

    const loggedInUserRoles = await loggedInUser.getRoles();
    let loggedInUserRoleNames = [];
    loggedInUserRoles.map((roleName) => {
      loggedInUserRoleNames.push(roleName.name);
    });
    let isAuthorized = false;
    let requiredRolesCopy = JSON.parse(JSON.stringify(requiredRoles)); // deep copy testing.

    requiredRolesCopy.map((requiredRolesSet) => {
      if (checkRoles(requiredRolesSet, loggedInUserRoleNames)) {
        isAuthorized = true;
        return;
      }
    });
    return isAuthorized;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

/**
 * function (middleware) used by secured endpoints to verify if the user has the proper permissions to access the endpoint
 * @param {object} req The HTTP request object.
 * @param {object} res The HTTP response object.
 * @param {function} next A function to allow us to move to the next middleware.
 */
const isCandidate = async (req, res, next) => {
  let requiredRoles = [CANDIDATE_ROLE];
  const isAuthorized = await authorizeUser(req, next, requiredRoles);
  if (isAuthorized) {
    next();
  } else {
    generateErrorAndCatch("Not authorized to view this page!", 403, next);
  }
};

/**
 * function (middleware) used by secured endpoints to verify if the user has the proper permissions to access the endpoint
 * @param {object} req The HTTP request object.
 * @param {object} res The HTTP response object.
 * @param {function} next A function to allow us to move to the next middleware.
 */
const isEngineeringManagerOrRecruiter = async (req, res, next) => {
  const requiredRoles = [ENGINEERING_DIRECTOR_ROLES, RECRUITING_ROLE];
  const isAuthorized = await authorizeUser(req, next, requiredRoles);
  if (isAuthorized) {
    next();
  } else {
    generateErrorAndCatch("Not authorized to view this page!", 403, next);
  }
};

/**
 * function (middleware) used by secured endpoints to verify if the user has the proper permissions to access the endpoint
 * @param {object} req The HTTP request object.
 * @param {object} res The HTTP response object.
 * @param {function} next A function to allow us to move to the next middleware.
 */
const isEngineeringManager = async (req, res, next) => {
  const requiredRoles = [ENGINEERING_DIRECTOR_ROLES];
  const isAuthorized = await authorizeUser(req, next, requiredRoles);
  if (isAuthorized) {
    next();
  } else {
    generateErrorAndCatch("Not authorized to view this page!", 403, next);
  }
};

/**
 * function (middleware) to verify if the logged in user is the owner of the EngineeringFeedback form being viewed.
 * @param {object} req The HTTP request object.
 * @param {object} res The HTTP response object.
 * @param {function} next A function to allow us to move to the next middleware.
 */
const isEngineeringManagerOrRecruiterOrOwner = async (req, res, next) => {
  const requiredRoles = [ENGINEERING_DIRECTOR_ROLES, RECRUITING_ROLE];
  const isAuthorized = await authorizeUser(req, next, requiredRoles);
  if (isAuthorized) {
    next();
  } else {
    const { engineeringFeedbackId } = req.params;
    await verifyEngineeringFeedbackOwner(req, next, engineeringFeedbackId);
  }
};

/**
 * function (middleware) used by secured endpoints to verify if the user is an admin.
 * @param {object} req The HTTP request object.
 * @param {object} res The HTTP response object.
 * @param {function} next A function to allow us to move to the next middleware.
 */
const isAdmin = async (req, res, next) => {
  const requiredRoles = [ADMIN_ROLE];
  const isAuthorized = await authorizeUser(req, next, requiredRoles);
  if (isAuthorized) {
    next();
  } else {
    generateErrorAndCatch("Not authorized to view this page!", 403, next);
  }
};

/**
 * helper function to verify if the logged in user is the owner of the EngineeringFeedback form being viewed.
 * @param {object} req The HTTP request object.
 * @param {function} next A function to allow us to move to the next middleware.
 * @param {object} engineeringFeedbackId The id of the EngineeringFeedback form to look up.
 */
const verifyEngineeringFeedbackOwner = async (
  req,
  next,
  engineeringFeedbackId
) => {
  try {
    const userIdAsInt = +req.userId;
    const returnedEngineeringFeedbackForm = await EngineeringFeedback.findByPk(
      engineeringFeedbackId
    );
    if (!returnedEngineeringFeedbackForm) {
      generateError("make sure you enter a valid ID", 400);
    }
    // now verify the user of it.
    const returnedUserEngineeringFeedback =
      await UserEngineeringFeedback.findOne({
        where: {
          engineeringFeedbackId,
        },
      });
    if (!returnedUserEngineeringFeedback) {
      // this shouldn't happen but print a different error so we know where we are in this function.
      generateError("unable to find the engineering feedback form", 400);
    }
    if (returnedUserEngineeringFeedback.candidateId !== userIdAsInt) {
      generateError("you are not authorized to view this form!!", 403);
    }
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

/**
 * function (middleware) used by secured endpoints to verify if the user has a valid token.
 * @param {object} req The HTTP request object.
 * @param {object} res The HTTP response object.
 * @param {function} next A function to allow us to move to the next middleware.
 */
const isAuthenticated = (req, res, next) => {
  authenticate(req, res, next);
};

const authenticate = async (req, res, next) => {
  const authHeader = req.get("Authorization");

  try {
    if (!authHeader) {
      generateError("Not authenticated.", 401);
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    decodedToken = jwt.verify(token, CONFIG_CONTENT.JWT_PRIVATE_KEY);
    if (!decodedToken) {
      // token isn't able to be verified.
      generateError("Not authenticated.", 401);
    }
    // store the userId to be able to use in endpoints.
    req.userId = decodedToken.userId;
    const userId = +decodedToken.userId;
    const user = await User.findByPk(userId);
    if (!user) {
      // ensure user exists.
      generateError("Issue with retrieving user", 500);
    }
    next();
  } catch (error) {
    catchError(error, next);
  }
};

module.exports = {
  isAuthenticated,
  isEngineeringManagerOrRecruiter,
  isEngineeringManager,
  isCandidate,
  isEngineeringManagerOrRecruiterOrOwner,
  isAdmin,
};
