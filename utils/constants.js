const ERROR_CODE_BAD_REQUEST = 400;
const ERROR_CODE_UNAUTHORIZED = 401;
const ERROR_CODE_ACCESS_CLOSED = 403;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_CONFLICT = 409;
const ERROR_CODE_STANDART_SERVER_ERROR = 500;

const AUTHORIZATION_FAILED = 'Аутентификация не пройдена';
const WRONG_USER_ID = 'Не верно указан id пользователя';
const WRONG_DATA = 'Проверьте корректность введённых данных';
const EMAIL_UPDATE_DUBLICATE = 'Почта пользователя дублируется';
const REGISTER_DUBLICATE = 'Пользователь с такой почтой уже зарегестрирован';
const WRONG_MOVIE_DATA = 'Проверьте корректность введённых данных фильма';
const WRONG_MOVIE_SELECT = 'Данного фильма не существует';
const ACCESS_CLOSED = 'Попытка удаления чужого фильма';

module.exports = {
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_UNAUTHORIZED,
  ERROR_CODE_ACCESS_CLOSED,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_CONFLICT,
  ERROR_CODE_STANDART_SERVER_ERROR,
  AUTHORIZATION_FAILED,
  WRONG_USER_ID,
  WRONG_DATA,
  EMAIL_UPDATE_DUBLICATE,
  REGISTER_DUBLICATE,
  WRONG_MOVIE_DATA,
  WRONG_MOVIE_SELECT,
  ACCESS_CLOSED,
};
