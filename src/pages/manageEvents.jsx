import React, { useEffect, useState } from "react";
import ImageCard from "./components.jsx/imageCard";
import { getEvents, formatDate } from "../lib/appwrite";



const Events = () => {
  const [eventData, setEventData] = useState([]);

  // FETCH DATA FROM APPWRITE
  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      setEventData(res.documents);
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="h-133 border border-zinc-300 dark:border-zinc-600 rounded-2xl overflow-hidden w-full">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl h-full overflow-y-scroll w-full p-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-5 items-stretch">

          {eventData.map((item, key) => (
            <ImageCard
              key={key}
              id={item.$id}
              event={item.name}
              description={item.description}
              date={formatDate(item.date)}
              location={item.location}
              image={item.image_id}
              status={item.status}
            />
          ))}

        </div>
      </div>
    </div>
  );
};

export default Events;