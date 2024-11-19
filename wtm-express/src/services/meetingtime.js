import { User, UserDoc } from '../models/user';
const Event = require('../models/event');

export const findMeetingTimes = async (userIds, days, time_start, time_end) => {
  /*
    time_start has start time as HH::MM and time_end has end time as HH::MM
    days is an array of days the meeting can be on
    userIds is an array of user ids. Users have schedules that can be looked at to make this determination
  */
  
  try {
  // Fetch users and events
  const users = await User.find({ _id: { $in: userIds } }).populate('events');
  const events = users.flatMap(user => user.events);

  



  return suitableTimes;
  } catch (err) {
    console.error(`Error fetching events: ${err}`);
  }
};
