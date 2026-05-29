import React, { useState } from 'react'
import ImageCard from './components.jsx/imageCard'
import EventData from '../data/event_data'


const Events = () => {
  const [eventData, setEventData] = useState(EventData)
  return (
    <div className="h-133 border border-zinc-300 dark:border-zinc-600 rounded-2xl overflow-hidden w-full">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl h-full overflow-y-scroll w-[100%] p-4 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-5 items-stretch">
          {eventData.map((item, index) => (
            <ImageCard
              id={item.id}
              event={item.name}
              description={item.description}
              date={item.date}
              location={item.location}
              image={item.image}
              status={item.status}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Events
