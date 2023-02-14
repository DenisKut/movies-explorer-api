const { ERROR_CODE_CONFLICT } = require('../utils/constants');

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_CONFLICT;
  }
}

module.exports = Conflict;
