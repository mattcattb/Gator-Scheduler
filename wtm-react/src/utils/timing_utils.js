// Function to generate time slots
function generateTimeSlots(start, end, interval) {
    const slots = [];
    for (let hour = start; hour < end; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const time = new Date();
        time.setHours(hour);
        time.setMinutes(minute);
        slots.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    }
    return slots;
  }
  
  export default generateTimeSlots;