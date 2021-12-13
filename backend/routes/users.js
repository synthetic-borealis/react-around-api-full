const router = require('express').Router();

const {
  getAllUsers,
  getUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
