const { Schema, model } = require('mongoose');

const meetingSchema = new Schema({
    meetingName: { type: String, required: true },
    meetingDescription: { type: String },
    meetingDays: { type: [String], required: true },

    timeRange: { 
        startTime: { type: String, required: true},
        endTime: { type: String, required: true},
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
