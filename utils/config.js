const rateLimit = require('express-rate-limit');
const { LIMIT_REACHED } = require('./constants');

const requestLimiter = rateLimit({
  windowMs: 1000 * 60,
  max: 1000,
  message: LIMIT_REACHED,
});

const devDataBase = 'mongodb://localhost:27017/bitfilmsdb';

module.exports = {
  requestLimiter,
  devDataBase,
};
