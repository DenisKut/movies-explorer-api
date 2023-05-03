const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const NotFound = require('../errors/NotFound');
const {
  WRONG_USER_ID,
  WRONG_DATA,
  EMAIL_UPDATE_DUBLICATE,
  REGISTER_DUBLICATE,

} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET = 'my-personal-key' } = process.env;

const getUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(new NotFound(WRONG_USER_ID))
    .then((user) => {
      // Вот тут надо добавить id
      res.status(200).send({ id: user.id, name: user.name, email: user.email });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest(WRONG_DATA));
      } else {
        next(error);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findOneAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(new NotFound(WRONG_USER_ID))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequest(WRONG_DATA));
      } else if (error.code === 11000) {
        next(new Conflict(EMAIL_UPDATE_DUBLICATE));
      } else {
        next(error);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      })
        .then((user) => {
          res.send({
            userData: {
              name: user.name,
              email: user.email,
            },
          });
        })
        .catch((error) => {
          if (error.name === 'ValidationError') {
            next(new BadRequest(WRONG_DATA));
          } else if (error.code === 11000) {
            next(new Conflict(REGISTER_DUBLICATE));
          } else {
            next(error);
          }
        });
    })
    .catch((error) => next(error));
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials({ email, password })
    .then((user) => {
      const jwtToken = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'my-personal-key',
        { expiresIn: '7d' },
      );

      res.send({ token: jwtToken });
    })
    .catch(next);
};

module.exports = {
  getUser,
  updateUser,
  createUser,
  login,
};
