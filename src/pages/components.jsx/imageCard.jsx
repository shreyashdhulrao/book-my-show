import React, { useState } from "react";
import event_page from '../../assets/images/Event_page.jpg';
import Editpen from '../../assets/icons/edit_pen.svg?react'
import Trash from '../../assets/icons/trash.svg?react'
import { getImageUrl } from "../../lib/appwrite";
import { Link } from "react-router-dom";


export default function ImageCard({ id, event, description, date, location, image, status }) {
  const [loading, setLoading] = useState(true);
  console.log(image)
  return (
    <div className="w-74 h-74 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative group">
      {/* Background Image */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-zinc-800">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-zinc-400 border-t-transparent"></div>
        </div>
      )}

      <img
        src={getImageUrl(image)}
        alt={event}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
      />

      {/* Overlay (for readability) */}
      <div className="absolute  inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-b " />

      {/* Content on Image */}
      <div className="absolute bottom-1 pt-5 p-3.5 items-center flex flex-col justify-center text-white space-y-1 h-fill bg-black/20 backdrop-blur-xl scale-95 rounded-2xl ">
        <h2 className="text-lg font-semibold line-clamp-2 w-50 truncate text-center ">
          {event}
        </h2>
        <div className={`uppercase ${status === "live"
          ? "text-green-300 animate-pulse font-semibold"
          : status === "upcoming"
            ? "text-blue-400 font-semibold"
            : "text-zinc-300"
          }`}>
          {status}
        </div>

        <p className="text-sm text-gray-200 line-clamp-2">
          {description}
        </p>

        <div className="text-xs text-gray-300">
          {location} • {date}
        </div>

        <div className="flex items-end p-0 gap-3">
          <Link to={`/edit-event/${id}`} className="flex text-xs items-center justify-center gap-2 my-3 text-blue-500 bg-white w-32 hover:bg-blue-500 hover:text-white transition transition-color duration-300 py-2 px-3 rounded-lg ">
            <Editpen className=" w-4 h-4 " />
            Edit Details
          </Link>
          <Link to="" className="flex text-xs items-center justify-center gap-2 my-3 text-red-500 bg-white w-32 hover:bg-red-500 hover:text-white transition transition-color duration-300 py-2 px-3 rounded-lg ">
            <Trash className=" w-4 h-4 " />
            Delete Event
          </Link>
        </div>
      </div>
    </div>
  );
}