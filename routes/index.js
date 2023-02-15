const router = require('express').Router();
const { authorization } = require('../middlewares/auth');
const auth = require('./auth');
const users = require('./users');
const movies = require('./movies');
const NotFound = require('../errors/NotFound');
const { NOT_FOUND } = require('../utils/constants');

router.use('/', auth);
router.use('/users', authorization, users);
router.use('/movies', authorization, movies);

router.use(authorization);
router.use('*', (req, res, next) => {
  next(new NotFound(NOT_FOUND));
});

module.exports = router;
