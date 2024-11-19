const User = require('../models/user');
const Event = require('../models/event');

// Convert date string into a self made date object for easier use
const dateParser = (date_string) => {
    const [date, time] = date_string.split(' ');
    const [hour, minute] = time.split(':');
    const minutes = 60 * parseInt(hour) + parseInt(minute);

    return {
        date: date,
        time: minutes
    };
};

// Compare two dates
const compareDates = (a, b) => {
    if (a.date !== b.date) return a.date < b.date ? -1 : 1;
    return a.time - b.time;
};

// Convert custom date object to a string again
const dateToString = (date) => {
    const hour = Math.floor(date.time / 60)
        .toString()
        .padStart(2, '0');
    const minutes = (date.time % 60).toString().padStart(2, '0');
    return `${date.date} ${hour}:${minutes}`;
};

// Combine all events to make calculations much simpler
const findOverlappingEvents = (events) => {
    // Parse time points
    const timePoints = [];
    events.forEach((event) => {
        timePoints.push({ time: dateParser(event.start), type: 'start' });
        timePoints.push({ time: dateParser(event.end), type: 'end' });
    });

    // Sort time points
    timePoints.sort((a, b) => {
        const comparison = compareDates(a.time, b.time);
        if (comparison !== 0) return comparison;
        return a.type === 'start' ? -1 : 1;
    });

    const overlappingIntervals = [];
    let activeEvents = 0;
    let overlapStart = null;

    // Traverse time points
    for (const point of timePoints) {
        if (point.type === 'start') {
            activeEvents++;

            // Start a new overlap
            if (activeEvents === 1) {
                overlapStart = point.time;
            }
        } else {
            // End an overlap
            if (activeEvents === 1 && overlapStart !== null) {
                overlappingIntervals.push({
                    start: overlapStart,
                    end: point.time // Record the end of the overlap
                });
                overlapStart = null; // Reset for future overlaps
            }
            activeEvents--;
        }
    }

    return overlappingIntervals;
};

// Find available meeting times
const findFreeIntervals = (
    overlappingIntervals,
    time_start,
    time_end,
    days
) => {
    // Create ranges for possible days
    dayIntervals = [];
    days.forEach((day) => {
        dayIntervals.push({
            start: dateParser(`${day} ${time_start}`),
            end: dateParser(`${day} ${time_end}`)
        });
    });

    const freeIntervals = [];

    // Iterate over each day interval
    for (const dayInterval of dayIntervals) {
        let currentStart = dayInterval.start;

        // Iterate over overlapping intervals
        for (const busy of overlappingIntervals) {
            // Check if busy interval overlaps with the current day interval
            if (
                compareDates(busy.end, dayInterval.start) <= 0 ||
                compareDates(busy.start, dayInterval.end) >= 0
            ) {
                // Busy interval is outside the current day interval, skip
                continue;
            }

            // There is an overlap
            if (compareDates(busy.start, currentStart) > 0) {
                // Free interval before the busy time
                freeIntervals.push({
                    start: currentStart,
                    end: busy.start
                });
            }

            // Update the current start to after the busy interval
            currentStart =
                compareDates(busy.end, currentStart) > 0
                    ? busy.end
                    : currentStart;
        }

        // Add remaining free time after the last busy interval
        if (compareDates(currentStart, dayInterval.end) < 0) {
            freeIntervals.push({
                start: currentStart,
                end: dayInterval.end
            });
        }
    }

    return freeIntervals;
};

export const findMeetingTimes = async (userIds, days, time_start, time_end) => {
    try {
        // Fetch users and events
        const users = await User.find({ _id: { $in: userIds } }).populate(
            'events'
        );
        const events = users.flatMap((user) => user.events);

        // Combine events that overlap
        const overlappingEvents = findOverlappingEvents(events);
        // Determine free intervals
        const freeIntervals = findFreeIntervals(
            overlappingEvents,
            time_start,
            time_end,
            days
        );

        /* The returned free intervals are in the following format:
        {
            "start": "YYYY-MM-DD HH:MM",
            "end": "YYYY-MM-DD HH:MM",
        
        }
        */

        freeIntervals.forEach((interval) => {
            interval.start = dateToString(interval.start);
            interval.end = dateToString(interval.end);
        });

        return freeIntervals;
    } catch (err) {
        console.error(`Error fetching events: ${err}`);
    }
};
