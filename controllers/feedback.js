const User = require("../models/user");
const EngineeringFeedback = require("../models/engineering-feedback");
const UserEngineeringFeedback = require("../models/user-engineering-feedback");
const appLogger = require("../util/app-logger");
const { generateError, generateErrorWithData } = require("../util/error");
const { validationResult } = require("express-validator");

/**
 * function (middleware) to get all the EngineeringFeedback forms for the logged in user.
 * @param {object} req The HTTP request object.
 * @param {object} res The HTTP response object.
 * @param {function} next A function to allow us to move to the next middleware.
 */
exports.showUserFeedbackForms = async (req, res, next) => {
  try {
    const loggedInUser = await User.findByPk(req.userId);
    let returnedData = [];

    const engineeringFeedbackList = await EngineeringFeedback.findAll({
      include: [
        {
          model: UserEngineeringFeedback,
          where: {
            candidateId: req.userId,
          },
          attributes: ["createdAt", "id"],
        },
      ],
    });

    for (engineeringFeedback of engineeringFeedbackList) {
      const { comments } = engineeringFeedback;
      for (feedback of engineeringFeedback.UserEngineeringFeedbacks) {
        const { createdAt, id } = feedback.dataValues;

        returnedData.push({
          id,
          comments,
          feedbackDate: `${createdAt.toDateString()}`,
        });
      }
    }

    res.status(200).json({
      data: returnedData,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

/**
 * function (middleware) to get all the EngineeringFeedback forms for the specified user.
 * @param {object} req The HTTP request object.
 * @param {object} res The HTTP response object.
 * @param {function} next A function to allow us to move to the next middleware.
 */
exports.showUserFeedbackFormsForCandidate = async (req, res, next) => {
  try {
    const { userName } = req.params;
    const candidate = await User.findOne({ where: { username: userName } });
    if (!candidate) {
      generateError("The candidate you are searching for does not exist.", 400);
    }
    let returnedData = [];

    const engineeringFeedbackList = await EngineeringFeedback.findAll({
      include: [
        {
          model: UserEngineeringFeedback,
          where: {
            candidateId: candidate.id,
          },
          attributes: ["createdAt", "id"],
        },
      ],
    });

    for (engineeringFeedback of engineeringFeedbackList) {
      const { id, comments, createdAt } = engineeringFeedback;
      returnedData.push({
        id,
        comments,
        feedbackDate: `${createdAt.toDateString()}`,
      });
    }
    res.status(200).json({
      data: returnedData,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

/**
 * function (middleware) to get an EngineeringFeedback form with the specified identifier (id)
 * @param {object} req The HTTP request object.
 * @param {object} res The HTTP response object.
 * @param {function} next A function to allow us to move to the next middleware.
 */
exports.showFeedbackForm = async (req, res, next) => {
  try {
    const { engineeringFeedbackId } = req.params;
    const engineeringFeedback = await EngineeringFeedback.findByPk(
      engineeringFeedbackId,
      {
        attributes: [
          "documentation",
          "modularization",
          "logging",
          "errorhandling",
          "testing",
          "stylequality",
          "comments",
          "createdAt",
        ],
      }
    );
    const {
      documentation,
      modularization,
      logging,
      errorhandling,
      testing,
      stylequality,
      comments,
      createdAt,
    } = engineeringFeedback;

    res.status(200).json({
      data: {
        documentation,
        modularization,
        logging,
        errorhandling,
        testing,
        stylequality,
        comments,
        feedbackDate: `${createdAt.toDateString()}`,
      },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.createFeedbackForm = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      generateErrorWithData("Invalid input.", 422, errors.array());
    }
    const {
      documentation,
      modularization,
      logging,
      errorhandling,
      testing,
      stylequality,
      comments,
      username,
    } = req.body;
    const candidate = await User.findOne({ where: { username } });
    const engineeringFeedbackForm = await EngineeringFeedback.create({
      documentation,
      modularization,
      logging,
      errorhandling,
      testing,
      stylequality,
      comments,
    });
    const engineeringFeedbackFormInformation =
      await UserEngineeringFeedback.create({
        engineeringManagerId: req.userId, // logged in user at this endpoint is an engineering manager.
        candidateId: candidate.id,
        engineeringFeedbackId: engineeringFeedbackForm.id,
      });
    appLogger.info("engineering form created!");
    res.status(201).json({
      // use a message for now to indicate success.
      message: "user feedback created!",
      // when a front-end is implemented this can be used for redirecting to the feedback form page.
      engineeringFeedbackformId: engineeringFeedbackForm.id,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
