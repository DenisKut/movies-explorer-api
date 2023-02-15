const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const HaveNotAccessed = require('../errors/HaveNotAccessed');
const NotFound = require('../errors/NotFound');
const {
  WRONG_MOVIE_DATA,
  WRONG_MOVIE_SELECT,
  ACCESS_CLOSED,
  WRONG_DATA,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({ owner: userId })
    .then((movies) => res
      .send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res
      .send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequest(WRONG_MOVIE_DATA));
      } else {
        next(error);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  Movie.findById(req.params.movieId)
    .orFail(new NotFound(WRONG_MOVIE_SELECT))
    .then((movie) => {
      if (!movie.owner.equals(userId)) {
        next(new HaveNotAccessed(ACCESS_CLOSED));
      } else {
        movie.remove()
          .then(() => res.send(movie))
          .catch(next);
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest(WRONG_DATA));
      } else {
        next(error);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
