import JoinedEvents from "../components/HomeView/joinedevents";
import HomepageHeader from "../components/HomeView/homepageheader";
import FriendsDisplay from "../components/HomeView/friendsdisplay";
import ScheduleDisplay from "../components/HomeView/scheduledisplay";

function HomeView() {
    return (
      <div className='HomeView'>
        <HomepageHeader />
        <JoinedEvents events={[]}/>
        <ScheduleDisplay />
        <FriendsDisplay />
      </div>
    );
  }
  
  export default HomeView;