// Thought Routes Configuration
const router = require('express').Router();
const thoughtController = require('../../controllers/thoughtController');


// Thought Routes
router.get('/', thoughtController.getAllThoughts);
router.get('/:thoughtId', thoughtController.getThoughtById);
router.post('/', thoughtController.createThought);
router.put('/:thoughtId', thoughtController.updateThoughtById);
router.delete('/:thoughtId', thoughtController.deleteThoughtById);

// Reaction Routes integrated with thoughtController
router.post('/:thoughtId/reactions', thoughtController.createReaction);
router.delete('/:thoughtId/reactions/:reactionId', thoughtController.removeReaction);

 

module.exports = router;