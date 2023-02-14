const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');
const { AUTHORIZATION_FAILED } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET = 'my-personal-key' } = process.env;

module.exports.authorization = (req, res, next) => {
  const { authorization } = req.headers;
  let payload;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Unauthorized(AUTHORIZATION_FAILED);
    } else {
      const token = authorization.replace('Bearer ', '');
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'my-personal-key');
    }
  } catch (error) {
    throw new Unauthorized(AUTHORIZATION_FAILED);
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
