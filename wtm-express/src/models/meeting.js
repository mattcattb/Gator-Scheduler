const { Schema, model } = require('mongoose');

const meetingSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true},
    organizers: { type:String, required: true},
    members: [{ type: String, required: true }],
    range: {
        days: [{type: String, required: true}],
        start_time: { type: String, required: true },
        end_time: { type: String, required: true }
    }
},  { timestamps: true });

module.exports = model("Meeting", meetingSchema);
