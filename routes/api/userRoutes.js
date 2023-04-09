const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// GET and POST api routes for /users
router.route('/').get(getUsers).post(createUser);
// GET, PUT and DELETE api route for /users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
// POST and DELETE api routes for /users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);


module.exports = router;