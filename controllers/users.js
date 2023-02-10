const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const NotFound = require('../errors/NotFound');

const { NODE_ENV, JWT_SECRET = 'my-personal-key' } = process.env;

const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(new NotFound('Не верно указан id пользователя'))
    .then((user) => {
      res.status(200).send({ name: user.name, email: user.email });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Проверьте корректность введённых данных'));
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
    .orFail(new NotFound('Указан несуществующий id пользователя'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequest('Проверьте корректность введённых данных'));
      } else {
        next(error);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        ...req.body, password: hash,
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
            next(new BadRequest('Проверьте корректность введённых данных'));
          } else if (error.code === 11000) {
            next(new Conflict('Пользователь с такой почтой уже зарегестрирован'));
          } else {
            next(error);
          }
        });
    });
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
