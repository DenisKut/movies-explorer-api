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
const CRASH_TEST_ERROR = 'Сервер сейчас упадёт';
const LIMIT_REACHED = 'Слишком много запросов подряд!';
const NOT_FOUND = 'Page Not Found!';
const WRONG_EMAIL = 'Некорректно введён Email!';
const WRONG_EMAIL_OR_PASSWORD = 'Неправильные почта или пароль';
const WRONG_IMAGE_LINK = 'Некорректно введена ссылка на изображение!';
const WRONG_TRAILER_LINK = 'Некорректно введена ссылка на трейлер!';
const WRONG_THUMBNAIL_LINK = 'Некорректно введена ссылка на миниатюру фильма!';
const STANDART_SERVER_ERROR = 'На сервере произошла ошибка';

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
  CRASH_TEST_ERROR,
  LIMIT_REACHED,
  NOT_FOUND,
  WRONG_EMAIL,
  WRONG_EMAIL_OR_PASSWORD,
  WRONG_IMAGE_LINK,
  WRONG_TRAILER_LINK,
  WRONG_THUMBNAIL_LINK,
  STANDART_SERVER_ERROR,
};
