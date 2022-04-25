const winston = require("winston");
const path = require("./path");

/**
 * define an object to hold what levels of events get logged in our application
 * and to the locations depending on the severity of the issue.
 */
const transports = {
  console: new winston.transports.Console({ level: "info" }),
  file: new winston.transports.File({
    filename: `${path}/logs/errors.log`,
    level: "error",
  }),
};

/**
 * An object holding information about where to send logs to.
 */
const appLogger = winston.createLogger({
  transports: [transports.console, transports.file],
});

module.exports = appLogger;
