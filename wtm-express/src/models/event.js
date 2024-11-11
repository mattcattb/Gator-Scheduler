const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
    title: { type: String, required: true },
    description: {type: String, required: true},
    start: {type: String, required: true},
    end: {type: String, required: true}
});

module.exports = model("Event", eventSchema);
