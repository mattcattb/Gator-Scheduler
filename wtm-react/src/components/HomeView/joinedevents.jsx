

export const sampleEvents = [
    {
      id: '1',
      name: 'Team Meeting',
      date: '2024-10-12',
      description: 'Monthly team sync to discuss project updates.',
      participants: ['Alice', 'Bob', 'Charlie'],
    },
    {
      id: '2',
      name: 'Project Kickoff',
      date: '2024-10-15',
      description: 'Kickoff meeting for the new project.',
      participants: ['Alice', 'Dave'],
    },
    {
      id: '3',
      name: 'Client Presentation',
      date: '2024-10-20',
      description: 'Presentation for the client regarding project status.',
      participants: ['Charlie', 'Eve'],
    },
  ];

function JoinedEvents() {
    // show list of joined events that when pressed go to that specific event



    return (
      <></>
    )
}

function EventDetails({event}) {
    /* 
        Show the details of an event
        event is an object with the following structure:
        {
            name: string,
            description: string,
            date: string,
            time: string,
            location: string,
            friends: [string],
            possibilities: [string],
            id: string
        }
    */

    if (!event) {
        return <div>No events shown.</div>
    }

    // show details of a event
    return (
      <></>
    )
}

export default JoinedEvents