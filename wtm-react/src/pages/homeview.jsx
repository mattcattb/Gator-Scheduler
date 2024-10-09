import JoinedEvents from "../components/HomeView/joinedevents";
import HomepageHeader from "../components/HomeView/homepageheader";
import FriendsDisplay from "../components/HomeView/friendsdisplay";

function HomeView() {
    return (
      <div className='HomeView'>
        <HomepageHeader />
        <JoinedEvents />
        <FriendsDisplay />
      </div>
    );
  }
  
  export default HomeView;