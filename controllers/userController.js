const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
          const users = await User.find();
          res.json(users);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    // Get a single user
    async getUserById(req, res) {
        try{
            const user = await User.findOne({
                _id: req.params.userId
            }).select('-__v');
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        } catch (error){
            res.status(500).json(err);
        }
    },
    // Create a new user
    async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if(!updatedUser){
                return res.status(404).json({ message: 'No application with this id!' });
            };
            res.json(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },
    async deleteUser(req, res) {
        try {
          const user = await User.findOneAndDelete({ _id: req.params.userId });
    
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }
    
          await Thought.deleteMany({ _id: { $in: user.thoughts } });
          res.json({ message: 'User and associated thoughts deleted!' })
        } catch (err) {
          res.status(500).json(err);
        };
      },
      // Add a new friend
      async addNewFriend(req, res) {
        try {
          const newFriend = await User.findOneAndUpdate(
            {_id: req.params.friendId},
            {$addToSet: {friends: req.body}},
            {runValidators: true, new: true}
          );

          if(!newFriend){
            return res.status(404).json({ message: 'No User with this id!' });
          };

          res.json(newFriend);
        } catch (error) {
          res.status(500).json(error);
        }
      },
      // Delete a friend
      async deleteFriend(req, res) {
        try {
          const badFriend = await User.findOneAndRemove(
            {_id: req.params.friendId},
            {$pull: {friends: {userId: req.params.friendId}}},
            { runValidators: true, new: true }
          );

          if(!badFriend){
            return res.status(404).json({message: 'no friend found with that ID'});
          };

          res.json(badFriend);
        } catch (error) {
          res.status(500).json(error);
        }
      }
}