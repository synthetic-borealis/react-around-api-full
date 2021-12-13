const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  getCurrentUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);
router.get('/:id', getUserById);
router.get('/', getAllUsers);

module.exports = router;
