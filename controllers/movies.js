const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const HaveNotAccessed = require('../errors/HaveNotAccessed');
const NotFound = require('../errors/NotFound');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res
      .send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res
      .send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequest('Проверьте корректность введённых данных фильма'));
      } else {
        next(error);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(new NotFound('Данного фильма не существует'))
    .then((movie) => {
      if (!movie.owner.equals(userId)) {
        next(new HaveNotAccessed('Попытка удаления чужого фильма'));
      } else {
        Movie.findByIdAndRemove(movieId)
          .then(() => res.send(movie))
          .catch(next);
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Проверьте корректность введённых данных'));
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
