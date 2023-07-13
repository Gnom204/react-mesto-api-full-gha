const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const cookieParser = require('cookie-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middlewares/error');
const { notFound } = require('./utils/constants');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { allowedCors } = require('./middlewares/corsProtect');
// const corsProtect = require('./middlewares/corsProtect');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors({
  credentials: true,
  origin: allowedCors,
}));
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(() => {
  throw new NotFoundError(notFound.message);
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер работает на порту ${PORT}`);
});
