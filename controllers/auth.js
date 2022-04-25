const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  CONFIG_CONTENT,
  ADD_USER_ROLE,
  REMOVE_USER_ROLE,
} = require("../util/constants");

const User = require("../models/user");
const Role = require("../models/role");
const appLogger = require("../util/app-logger");
const {
  generateError,
  generateErrorWithData,
  catchError,
} = require("../util/error");
const sequelize = require("../config/database");

/**
 * Endpoint to process the user request for registration.
 * @param {object} req The HTTP request object
 * @param {*} res The HTTP response object
 * @param {*} next An express function allowing us to move to the next middleware
 */
exports.signup = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  let errorsArray = [];
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      for (error of errors.array()) {
        errorsArray.push(error.msg);
      }
    }
    const { email, password, username } = req.body;
    const existingUserName = await User.findOne({
      where: { username: username },
    });
    if (existingUserName) {
      errorsArray.push("Username Exists.");
    }
    const existingEmail = await User.findOne({ where: { email: email } });
    if (existingEmail) {
      errorsArray.push("Email is already in use.");
    }
    if (errorsArray.length > 0) {
      generateErrorWithData("Errors Below!", 422, errorsArray);
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const candidateRole = await Role.findOne({
      where: {
        name: "Candidate",
      },
    });

    const user = await User.create(
      {
        email,
        password: hashedPassword,
        username,
      },
      { transaction: transaction }
    );

    await user.addRoles(candidateRole, {
      transaction: transaction,
    });

    await transaction.commit();
    appLogger.info("User successfully created!");
    res.status(201).json({
      message: "User created!",
      userId: user.id,
    });
  } catch (error) {
    await transaction.rollback();
    catchError(error, next);
  }
};

/**
 * Endpoint to process the user request for login.
 * @param {object} req The HTTP request object
 * @param {object} res The HTTP response object
 * @param {function} next An express function allowing us to move to the next middleware
 */
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;
  let loadedRoles = [];
  try {
    const foundUser = await User.findOne({ where: { email: email } });
    if (!foundUser) {
      generateError("Invalid credentials!", 400);
    }
    loadedUser = foundUser;
    const isEqual = await bcrypt.compare(password, loadedUser.password);
    if (!isEqual) {
      generateError("Invalid credentials!", 400);
    }
    const roles = await loadedUser.getRoles();
    roles.map((role) => {
      loadedRoles.push(role.name);
    });

    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser.id.toString(),
      },
      CONFIG_CONTENT.JWT_PRIVATE_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token,
      user: {
        userName: loadedUser.username,
        userId: loadedUser.id,
        roles: loadedRoles,
      },
    });
  } catch (error) {
    catchError(error, next);
  }
};

/**
 * Endpoint accessible to admin only to add a role to a specified user.
 * @param {object} req The HTTP request object
 * @param {object} res The HTTP response object
 * @param {function} next An express function allowing us to move to the next middleware
 */
exports.addUserRole = async (req, res, next) => {
  modifyUserRole(
    req,
    res,
    next,
    ADD_USER_ROLE,
    "successfully added user role(s)!"
  );
};

/**
 * Endpoint accessible to admin only to remove a role to a specified user.
 * @param {object} req The HTTP request object
 * @param {object} res The HTTP response object
 * @param {function} next An express function allowing us to move to the next middleware
 */
exports.removeUserRole = async (req, res, next) => {
  modifyUserRole(
    req,
    res,
    next,
    REMOVE_USER_ROLE,
    "successfully removed user role(s)!"
  );
};

/**
 * helper function to add or remove user role based on the type (flag) passed in.
 * @param {object} req The HTTP request object
 * @param {object} res The HTTP response object
 * @param {function} next An express function allowing us to move to the next middleware
 * @param {string} operationType A string indicating if this will be an add or delete operation.
 * @param {string} message The success message to be returned in the response.
 */
const modifyUserRole = async (req, res, next, operationType, message) => {
  const { roles, username } = req.body;
  try {
    // grab the user and add the roles.
    const existingUser = await User.findOne({ where: { username } });
    if (!existingUser) {
      generateError("user does not exist", 422);
    }
    for (role of roles) {
      const foundRole = await Role.findOne({ where: { name: role } });
      switch (operationType) {
        case ADD_USER_ROLE:
          await existingUser.addRole(foundRole);
          break;
        case REMOVE_USER_ROLE:
          await existingUser.removeRole(foundRole);
          break;
        default:
          break;
      }
    }

    const newUser = await existingUser.save();
    const newRoles = await newUser.getRoles();
    let retrievedRoles = [];
    for (retrievedRole of newRoles) {
      retrievedRoles.push(retrievedRole.dataValues.name);
    }
    res.status(200).json({
      message,
      userRoles: retrievedRoles,
    });
  } catch (error) {
    catchError(error, next);
  }
};
