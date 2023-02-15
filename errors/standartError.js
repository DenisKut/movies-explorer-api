const {
  ERROR_CODE_STANDART_SERVER_ERROR,
  STANDART_SERVER_ERROR,
} = require('../utils/constants');

module.exports.errorHandler = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === ERROR_CODE_STANDART_SERVER_ERROR ? STANDART_SERVER_ERROR : message,
  });
  next();
};
