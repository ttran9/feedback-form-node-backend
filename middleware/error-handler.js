const appLogger = require("../util/app-logger");

/**
 * Custom middleware function to send detailed error information back to the user.
 * @param {object} error An object holding information about the error.
 * @param {object} req The incoming HTTP request object
 * @param {object} res The HTTP response object
 * @param {function} next An express function allowing us to move to the next middleware
 */
module.exports = (error, req, res, next) => {
  appLogger.error(error);
  const status = error.statusCode || 500;
  const { message } = error;
  const data = error.data;
  res.status(status).json({
    message,
    data,
  });
};
