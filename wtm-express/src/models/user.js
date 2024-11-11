const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    icon: {
        type: String
    },
    events: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }
    ],
    invited: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User' 
        }
    ]
});

module.exports = model("User", userSchema);
