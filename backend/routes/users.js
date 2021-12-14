const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const { validateUrl } = require('../utils/validation-helpers');

const {
  getAllUsers,
  getUserById,
  getCurrentUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserProfile);
router.patch('/me/avatar', celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl),
  }),
}), updateUserAvatar);
router.get('/:id', getUserById);
router.get('/', getAllUsers);

module.exports = router;
