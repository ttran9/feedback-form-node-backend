const catchError = (error, next) => {
  if (!error.statusCode) {
    error.statusCode = 500;
  }
  // error handler middleware will display detailed message for us (as the developer).
  next(error);
};

const generateError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

const generateErrorAndCatch = (message, statusCode, next) => {
  try {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
  } catch (error) {
    catchError(error, next);
  }
};

const generateErrorWithData = (message, statusCode, data) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.data = data;
  throw error;
};

module.exports = {
  catchError,
  generateError,
  generateErrorAndCatch,
  generateErrorWithData,
};
