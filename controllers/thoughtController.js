// Thought Controller
const { User, Thought } = require('../models');

const thoughtController = {

  // Get all thoughts
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  // Get a thought by ID
  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },
  
  // Create a new thought
  createThought: async (req, res) => {
    try {
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
      }

      try {
        // Check if the user with the provided userId exists
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'Wrong match: User not found' });
        }
  
        // Create a new thought with the userId
        const newThought = await Thought.create({
          ...req.body, 
          userId, 
        });
  
        res.json(newThought);
      } catch (error) {
        if (error.name === 'CastError') {
          return res.status(400).json({ message: 'Invalid username or ID' });
        }
        throw error; 
      }
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  // Update a thought by ID
  updateThoughtById: async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  // Delete a thought by ID
  deleteThoughtById: async (req, res) => {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!deletedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(deletedThought);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  // Create a reaction for a thought
  createReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      // Assuming reaction data is sent in req.body
      thought.reactions.push(req.body);
      await thought.save();
      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },
  
  // Remove a reaction from a thought
  removeReaction: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const reactionId = req.params.reactionId;

      // Find the thought by thoughtId
      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      // Remove the reaction by reactionId
      thought.reactions = thought.reactions.filter((reaction) => reaction.reactionId.toString() !== reactionId);

      // Save the updated thought
      await thought.save();

      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

};

module.exports = thoughtController;