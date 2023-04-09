const { User, Thought } = require('../models');

const userController = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .select('-__v')
      .then((userData) => {
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Get a user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'no user found' });
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
}


module.exports = userController;
