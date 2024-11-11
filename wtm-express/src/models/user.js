const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    icon: { type: String },
    meetings: [{ type: String }],
    invited: [{ type: String }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    schedule: { type: String },
});

module.exports = model("User", userSchema);
