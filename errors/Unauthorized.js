const { ERROR_CODE_UNAUTHORIZED } = require('../utils/constants');

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_UNAUTHORIZED;
  }
}

module.exports = Unauthorized;
