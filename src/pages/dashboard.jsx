import React, { useEffect, useState } from 'react'
import Card from './components.jsx/card';
import Users from '../assets/icons/user.svg?react'
import EventLive from '../assets/icons/Event_live.svg?react'
import EventUpcoming from '../assets/icons/event_upcoming.svg?react'
import event_data from '../data/event_data'
import data from '../data/user_data'
import ImageCard from './components.jsx/imageCard';


const Dashboard = () => {

  const liveEvents = event_data.filter(e => e.status === "live").length;
  const upcomingEvents = event_data.filter(e => e.status === "upcoming").length;

  return (
    <div>
      <div className='grid grid-cols-3 gap-4 '>
        <Card
          title="Live Events"
          value={liveEvents}
          icon={<EventLive className="w-8 h-8 text-zinc-600 dark:text-zinc-400" />}
          date="29-12-2002"
          link="/manage-events"
        />
        <Card
          title="Upcoming Events"
          value={upcomingEvents}
          icon={<EventUpcoming className="w-8 h-8 text-zinc-600  dark:text-zinc-400" />}
          date=""
          link="/manage-events"
        />
        {/* <ImageCard /> */}
      </div>
    </div>
  );
};

export default Dashboard
