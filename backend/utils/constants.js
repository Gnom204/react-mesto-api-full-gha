const regexForImageUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const HTTP_STATUS_BAD_REQUEST = {
  status: 400,
  message: 'переданы невалидные данные',
};

const HTTP_STATUS_NOT_FOUND = {
  status: 404,
  message: 'Объект не найден',
};

const HTTP_STATUS_SERVER_ERROR = {
  status: 500,
  message: 'Произошла ошибка',
};

const HTTP_STATUS_UNAUTHORIZED = {
  status: 401,
  message: 'Не авторизован',
};

const HTTP_STATUS_GOOD_REQUEST = {
  status: 200,
  message: 'Успешный запрос',
};

const HTTP_STATUS_CREATE_REQUEST = {
  status: 201,
  message: 'Объект создан',
};

module.exports = {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_SERVER_ERROR,
  HTTP_STATUS_GOOD_REQUEST,
  HTTP_STATUS_CREATE_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_UNAUTHORIZED,
  regexForImageUrl,
};
