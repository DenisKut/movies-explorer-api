const { ERROR_CODE_ACCESS_CLOSED } = require('../utils/constants');

class HaveNotAccessed extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_ACCESS_CLOSED;
  }
}

module.exports = HaveNotAccessed;
