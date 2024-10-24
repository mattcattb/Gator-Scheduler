const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    icon: { type: String },
    schedule: { type: String },
    friends: { type: [String] },
});

module.exports = model("User", userSchema);
