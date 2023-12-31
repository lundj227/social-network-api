const {Schema, model} = require('mongoose');
const Reactions = require('./Reaction');

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
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [Reactions]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
        return this.reactions.length;
});

function dateFormat(timestamp){
    return timestamp.toLocaleString();
};

const Thought = model('thought', thoughtSchema);

module.exports = Thought;