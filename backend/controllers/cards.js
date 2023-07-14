const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-err');
const Card = require('../models/card');
const {
  HTTP_STATUS_CREATE_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_GOOD_REQUEST,
} = require('../utils/constants'); // Статусы и сообщения об ошибке

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(HTTP_STATUS_GOOD_REQUEST.status).send(cards);
    })
    .catch(next);
};

const createCards = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(HTTP_STATUS_CREATE_REQUEST.status).send(card);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(HTTP_STATUS_NOT_FOUND.message);
      } else if (card.owner.toString() !== userId) {
        throw new ForbiddenError('У вас нет прав для удаления карточки');
      } else {
        return Card.findByIdAndRemove(cardId)
          .then(() => {
            res.status(HTTP_STATUS_GOOD_REQUEST.status)
              .send({ message: HTTP_STATUS_GOOD_REQUEST.message });
          });
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(HTTP_STATUS_NOT_FOUND.message);
      } else {
        res.status(200).send(card.likes);
      }
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(HTTP_STATUS_NOT_FOUND.message);
      } else {
        res.status(200).send(card.likes);
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
