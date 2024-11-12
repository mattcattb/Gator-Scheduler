const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, require: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    icon: { type: String },
    events: { type: [Schema.Types.ObjectId], ref: 'Event', default: [] },
    meetings: { type: [Schema.Types.ObjectId], ref: 'Meeting', default: [] },
    invited: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
    friends: { type: [Schema.Types.ObjectId], ref: 'User', default: [] }
  });

module.exports = model("User", userSchema);
