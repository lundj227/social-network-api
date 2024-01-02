const router = require('express').Router;
const {
    getThoughts,
    getThought,
    createThought,
    updateThought,
    deleteThought,
    newReaction,
    deleteReaction
} = require('../../controllers/thoughtController')

// TODO: /api/thoughts GET to get all thoughts, GET to get a single thought by its _id, POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field), PUT to update a thought by its _id, DELETE to remove a thought by its _id
router.route('/thoughts').get(getThoughts);
router.route('/thoughts/:thoughtId').get(getThought).post(updateThought).delete(deleteThought);
router.route('/:userId').post(createThought);

// TODO: /api/thoughts/:thoughtId/reactions POST to create a reaction stored in a single thought's reactions array field, DELETE to pull and remove a reaction by the reaction's reactionId value

router.Route('/thoughts/:thoughtId/reactions').post(newReaction).delete(deleteReaction);