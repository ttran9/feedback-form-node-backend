const CONFIG_CONTENT = require("../util/constants");

/**
 * Object holding authentication related credentials.
 * note: would be more concise to destructure but to be a bit more
 * verbose and clear I will avoid using object destructuring.
 */
const authConfig = {
  JWT_PRIVATE_KEY: CONFIG_CONTENT.JWT_PRIVATE_KEY,
};

module.exports = authConfig;
