const router = require('express').Router;
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/:userId
router.route('/:userId').get(getUserById).put(updateUser).deleteUser(deleteUser);

// TODO: /api/:userId/friends/:friendId POST to add a new friend and DELETE to remove a friend

// TODO: /api/thoughts GET to get all thoughts, GET to get a single thought by its _id, POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field), PUT to update a thought by its _id, DELETE to remove a thought by its _id

// TODO: /api/thoughts/:thoughtId/reactions POST to create a reaction stored in a single thought's reactions array field, DELETE to pull and remove a reaction by the reaction's reactionId value

module.exports = router;