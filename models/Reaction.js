const {Schema, model, Types} = require('mongoose');

const reaction = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt:{
            type: Date,
            default: Date.now,
            // Use a getter method to format the timestamp on query
        }
    }
);