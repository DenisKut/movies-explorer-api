const rateLimit = require('express-rate-limit');

const requestLimiter = rateLimit({
  windowMs: 1000 * 60,
  max: 1000,
  message: 'Слишком много запросов подряд!',
});

const devDataBase = 'mongodb://localhost:27017/bitfilmsdb';

module.exports = {
  requestLimiter,
  devDataBase,
};
