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
    // Create user
    createUser(req, res) {
        User.create(req.body)
            .then((userData) => {
                res.json(userData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Update single user info
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            {
                $set: req.body,
            },
            {
                runValidators: true,
                new: true,
            }
        )
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
    // This was the Bonus: delete ALL user data and thoughts, this does not work correctly???
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((userData) => {
                if (!userData) {
                    return res.status(404).json({ message: 'no user found' });
                }
                return Thought.deleteMany({ _id: { $in: userData.thoughts } });
            })
            .then(() => {
                res.json({ message: 'user data deleted' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Add friend
    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
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
    // Remove friend
    removeFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
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

};
module.exports = userController;

