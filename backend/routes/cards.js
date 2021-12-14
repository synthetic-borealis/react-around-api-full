const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const { validateUrl } = require('../utils/validation-helpers');

const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards);
router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateUrl),
  }),
}), createCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', unlikeCard);
router.delete('/:cardId', deleteCard);

module.exports = router;
