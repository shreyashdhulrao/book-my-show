import React, { useEffect, useRef, useState } from "react";
import CaretRight from '../assets/icons/caret_right.svg?react'
import Calendar from '../assets/icons/calendar.svg?react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from '../assets/icons/search.svg?react'
import event_data from '../data/event_data'
import { getEvents, formatDate } from "../lib/appwrite";


export default function UserTable() {
    const navigate = useNavigate()
    const [selectedDate, setselectedDate] = useState("")
    const [filteredevent_data, setFilteredevent_data] = useState(selectedDate
        ? event_data.filter((item) => item.date === selectedDate)
        : event_data)

    useEffect(() => {
        const result = event_data.filter(
            (item) => item.status === "live" || item.status === "upcoming"
        );

        setFilteredevent_data(result);
    }, []);

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
        <div className="h-133 border border-zinc-300 rounded-2xl overflow-hidden w-full">
            <div className="bg-white rounded-2xl h-full overflow-y-scroll w-[100%] ">

                <div className="overflow-x-auto p-4">
                    <table className="w-full border-collapse p-5">
                        <thead className="border-b mt-0 border-zinc-400">
                            <tr className=" text-left text-md text-zinc-900 font-semibold">
                                <th className="p-3 pt-0">Sr No</th>
                                <th className="p-3 pt-0">Event Name</th>
                                <th className="p-3 pt-0">Date</th>
                                <th className="p-3 pt-0 text-center">Time</th>
                                <th className="p-3 pt-0 text-center">Status</th>

                            </tr>
                        </thead>

                        <tbody>
                            {filteredevent_data.length === 0 ? (
                                <tr >
                                    <td colSpan="4" className="text-center p-4 text-gray-500">
                                        No Event is Live
                                    </td>
                                </tr>
                            ) : (
                                eventData.map((item, index) => (
                                    <tr key={item.id}
                                        onClick={() => navigate(`/registered-event-users/${encodeURIComponent(item.event)}`)}
                                        className="cursor-pointer border-b border-zinc-400 hover:bg-gray-50 hover:text-zinc-900 transition font-semilight text-zinc-500 text-sm"
                                    >
                                        <td className="p-3 ps-6">{index + 1}</td>
                                        <td className="p-3 ">{item.name}</td>
                                        <td className="p-3 text-zinc-600">{formatDate(item.date)}</td>
                                        <td className="p-3 text-zinc-600 text-center">{item.time}</td>
                                        <td className={`p-3  text-center font-medium ${item.status === "Live"
                                                ? "text-green-600 animate-pulse"
                                                : item.status === "Upcoming"
                                                    ? "text-blue-600"
                                                    : "text-zinc-500"
                                            }`}>{item.status}</td>

                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}