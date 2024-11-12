import { User, UserDoc } from '../models/user';

export const findMeetingTimes = async (userIds, days, time_start, time_end) => {
  /*
    time_start has start time as HH::MM and time_end has end time as HH::MM
    days is an array of days the meeting can be on
    userIds is an array of user ids. Users have schedules that can be looked at to make this determination
  */
  
  
  // Fetch users and their schedules
  const users = await User.find({ _id: { $in: userIds } }).select('name schedules');

  // Placeholder for the logic to calculate suitable meeting times
  const suitableTimes = []; // This will contain the times that fit the criteria

  // TODO: Implement algorithm to determine meeting times
  // For example: Iterate through users' schedules and find common available times
  // that fit the meeting parameters (minTime, maxTime, dayRange).

  return suitableTimes;
};