
import { useEffect } from 'react'   
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewMonthGrid, createViewWeek, createViewMonthAgenda } from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
 
import '@schedule-x/theme-default/dist/index.css'


import AddEventModal from "../components/Schedule/addeventmodal";


const example_events = [
  {
    id: '1',
    title: 'Event 1',
    start: '2024-10-16 09:00', // Start time
    end: '2024-10-16 10:00',   // End time
  },
  {
    id: '2',
    title: 'Event 2',
    start: '2024-10-17 13:00', // Start time
    end: '2024-10-17 14:30',   // End time
  },
  {
    id: '3',
    title: 'Event 3',
    start: '2024-10-18 11:00', // Start time
    end: '2024-10-18 12:00',   // End time
  },
  {
    id: '4',
    title: 'Event 4',
    start: '2024-10-19 15:30', // Start time
    end: '2024-10-19 17:00',   // End time
  },
  {
    id: '5',
    title: 'Event 5',
    start: '2024-10-20 08:00', // Start time
    end: '2024-10-20 09:30',   // End time
  }
];

/* TODO:
  
  Add Event Button that opens up an AddEvent Modal
  When event is clicked, open a Edit Event Modal 

*/

// first, pass in a bunch of events to the calendar

 
function Schedule() {
  // first, load all of the users events (in this case from static backend)
  const plugins = [createEventsServicePlugin()]
  
  const callbacks = {    
    onEventClick(calendarEvent) {
      // what happens when an event is clicked!
      console.log('onEventClick', calendarEvent)
    },
    onDayClick(day) {
      // what happens when a day is clicked!
      console.log('onDayClick', day)
    }
  };


  const config = {
    views: [createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: example_events,
    callbacks: callbacks  
  }

  const calendar = useCalendarApp(config, plugins)
 
  useEffect(() => {
    // get all events
    calendar.eventsService.getAll()
  }, [calendar.eventsService])

  return (
    <>
      <ScheduleXCalendar calendarApp={calendar} />
      <AddEventModal calendar={calendar}/>
    </>
  );
}

export default Schedule;