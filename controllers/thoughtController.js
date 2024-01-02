const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    //get a single thought
    async getThought(req, res) {
        try {
            const thought = await Thought.findOne(
                {_id: req.params.thoughtId}
            );
            if(!thought){
                return res.status(404).json({ message: 'No thought with that ID' });
            };
            res.json(thought);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    // create a new thought
    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                {_id: req.body.userId},
                {$addToSet: {thoughts: newThought._id}},
                {new: true}
            );
            
            if (!user) {
                return res.status(404).json({
                    message: 'Thought created, but found no user with that ID',
                });
            };

            res.json('Created new Thought! 🎉');
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },
    // update thought
    async updateThought(req, res) {
        try{
            const updatedThought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {runValidators: true, new: true}
            );

            if(!updatedThought){
                return res.status(404).json({ message: 'No thought with this id!' });
            };

            res.json(updatedThought);
        } catch (error){
            console.log(error);
            res.status(500).json(error);
        }
    },
    // delete thought by _id
    async deleteThought(req, res) {
        try{
            const deletedThought = await Thought.findOneAndRemove(
                {_id: req.params.thoughtId},
            );

            if(!deletedThought){
                return res.status(404).json({ message: 'No thought with this id!' });
            };

            const user = await User.findOneAndUpdate(
                {thoughts: req.params.thoughtId},
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            if(!user){
                return res.status(404).json({
                    message: 'Thought deleted but no user with this id!',
                  });
            };

            res.json({ message: 'Thought successfully deleted!' });
        } catch (error){
            console.log(error);
            res.status(500).json(error);
        }
    },
    // create a new reaction stored in a thought
    async newReaction(req, res){
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

        if (!thought) {
            return res
            .status(404)
            .json({ message: 'No thought found with that ID :(' });
        }

        res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // delete a reaction from a thought
    async deleteReaction(req, res) {
        try{
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $pull: {reactions: {reactionId: req.params.reactionId}}},
                {runValidators: true, new: true}
            );
            if (!thought) {
                return res
                  .status(404)
                  .json({ message: 'No thought found with that ID :(' });
              }
        
              res.json(thought);
        } catch (error) {
            res.status(500).json(err);
        }
    }
}