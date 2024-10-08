import React from 'react'

import JoinedEvents from './joinedevents'
import FriendsDisplay from './friendsdisplay'
import HomepageHeader from './homepageheader'

function HomeView() {
  return (
    <div className='HomeView'>
      <HomepageHeader />
      <JoinedEvents />
      <FriendsDisplay />
    </div>
  )
}
export default HomeView
