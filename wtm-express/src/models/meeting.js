const { Schema, model } = require('mongoose');

const meetingSchema = new Schema({
    meetingName: { type: String, required: true },
    meetingDescription: { type: String },
    selectedDays: { type: [String], required: true },
    organizers: [{
        type: Schema.Types.ObjectId,  // Use ObjectId to store user IDs
        ref: 'User',  // Reference the 'User' model
        required: true
    }],
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],

    timeRange: { 
        startTime: { type: Date, required: true},
        endTime: { type: Date, required: true},
    },
    /* creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }, */
    invitedUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
});

module.exports = model("Meeting", meetingSchema);
