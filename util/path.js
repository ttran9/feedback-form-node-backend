const path = require("path");

// get the root directory of this application and return it.
module.exports = path.dirname(require.main.filename);
