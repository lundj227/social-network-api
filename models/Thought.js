const {Schema, model} = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 150
        },
        createdAt:{
            type: Date,
            default: Date.now
            // Use a getter method to format the timestamp on query
        },
        username: {
            type: String,
            required: true
        },
        reactions: {
            // Array of nested documents created with the reactionSchema
        }
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;