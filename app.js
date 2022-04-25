const express = require("express");
const cors = require("cors");
const { morganSetup } = require("./config/morgan-setup"); // grab the function morganSetup with destructuring.

const errorMiddleware = require("./middleware/error-handler");
const sequelize = require("./config/database");
const appLogger = require("./util/app-logger"); // logging in different places of our application.
const AppUserRole = require("./models/user-role");
const EngineeringFeedback = require("./models/engineering-feedback");
const UserEngineeringFeedback = require("./models/user-engineering-feedback");
const {
  createUserRoles,
  createEngineeringFeedback,
} = require("./util/bootstrap-data");

const app = express();

/**
 * custom object to prevent cross origin resource sharing errors.
 * note: for the below object for now the origin property allows requests from all clients but this can be tweaked to come from
 * specific ip addresses (such as a specific frontend or backend web application). for simplicity I will allow all clients
 * for now.
 */
var corsOptions = {
  origin: "*",
  methods: "GET, POST, PUT, PATCH, DELETE", // no options for now..
  allowedHeaders: "Content-Type, Authorization",
};

// set up middleware involving custom configuration, logging, etc.
app.use(cors(corsOptions));
app.use(express.json());
morganSetup(app); // http request logging.

// setup routes below.
app.use("/api/auth", require("./routes/auth"));
app.use("/api/feedback", require("./routes/feedback"));

// set up custom middleware function as last piece of middleware to be able to catch errors or skip to this middleware.
app.use(errorMiddleware);

// sequelize
//   // .authenticate()
//   // .then((result) => {
//   //   appLogger.info("connected to the database and starting the backend!");
//   //   app.listen(8080);
//   // })
//   // .sync()
//   .sync({ force: true })
//   .then((result) => {
//     return createUserRoles();
//   })
//   .then((result) => {
//     return createEngineeringFeedback();
//   })
//   .then((result) => {
//     app.listen(8080, () => {
//       appLogger.info("connected to the database and starting the backend!");
//       app.emit("listening");
//     });
//   })
//   .catch((err) => {
//     appLogger.error(err);
//   });

// sequelize
//   .authenticate()
//   .then((result) => {
//     appLogger.info("connected to the database and starting the backend!");
//     app.listen(8080, () => {
//       app.emit("listening");
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//     appLogger.error(err);
//   });

sequelize
  .sync({ force: true })
  .then((result) => {
    return createUserRoles();
  })
  .then((result) => {
    return createEngineeringFeedback();
  })
  .then((result) => {
    app.listen(8080, () => {
      appLogger.info("connected to the database and starting the backend!");
      app.emit("listening");
    });
  })
  .catch((err) => {
    appLogger.error(err);
  });

// if (require.main === module) {
//   console.log("DO I SEE THIS?");
//   sequelize
//     .sync({ force: true })
//     .then((result) => {
//       return createUserRoles();
//     })
//     .then((result) => {
//       return createEngineeringFeedback();
//     })
//     .then((result) => {
//       app.listen(8080, () => {
//         appLogger.info("connected to the database and starting the backend!");
//         app.emit("listening");
//       });
//     })
//     .catch((err) => {
//       appLogger.error(err);
//     });
// } else {
//   // starting with test script
//   console.log("i started with the test script");
//   sequelize
//     .sync({ force: true })
//     .then((result) => {
//       return createUserRoles();
//     })
//     .then((result) => {
//       return createEngineeringFeedback();
//     })
//     .then((result) => {
//       app.listen(8080, () => {
//         appLogger.info("connected to the database and starting the backend!");
//         app.emit("listening");
//       });
//     })
//     .catch((err) => {
//       appLogger.error(err);
//     });
// }

module.exports = app;
