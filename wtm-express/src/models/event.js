const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
    title: {
        type: String, 
        require: true
    },
    description: {
        type: String
    },
    start: {
        type: String,
        require: true
    },
    end: {
        type: String,
        require: true
    }
});

module.exports = model('Event', eventSchema);
