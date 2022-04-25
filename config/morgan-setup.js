const morgan = require("morgan");

/**
 * Adds specified custom morgan middleware to our express server.
 * @param {object} app The application object, an express server.
 */
const morganSetup = (app) => {
  app.use(morgan("dev"));
};

// note: I could use a short-hand notation below but I am just making this a bit more verbose for simplicity.
module.exports = { morganSetup: morganSetup };
