// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');
const { regexForImageUrl } = require('./constants');

const signUpValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regexForImageUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const sigInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});
const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regexForImageUrl),
  }),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(regexForImageUrl),
  }),
});

const getUserIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  signUpValidation,
  sigInValidation,
  updateProfileValidation,
  updateAvatarValidation,
  createCardValidation,
  getUserIdValidation,
  cardIdValidation,
};
