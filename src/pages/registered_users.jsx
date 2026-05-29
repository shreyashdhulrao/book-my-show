import React, { useEffect, useRef, useState } from "react";
import CaretRight from '../assets/icons/caret_right.svg?react'
import Calendar from '../assets/icons/calendar.svg?react'
import { useLocation, useParams } from "react-router-dom";
import Search from '../assets/icons/search.svg?react'
import data from '../data/user_data'


export default function UserTable() {

    const { eventName } = useParams();
    const decodedEvent = decodeURIComponent(eventName || "");
    const location = useLocation();
    const dateRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState(location.state?.date || "");
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(selectedDate
        ? data.filter((item) => item.date === selectedDate)
        : data)

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };
    const searchData = (e) => {
        e.preventDefault();

        const value = search.toLowerCase()


        const result = data.filter((item) => {
            const matchText =
                item.name.toLowerCase().includes(value) ||
                item.members.toString().includes(value);

            const matchDate = selectedDate
                ? item.date === formatDate(selectedDate)
                : true;

            return matchText && matchDate;
        });

        setFilteredData(result);
    };
    // useEffect(() => {
    //     if (selectedDate) {
    //         const result = data.filter((item) => item.date === selectedDate);
    //         setFilteredData(result);
    //     } else {
    //         setFilteredData(data);
    //     }
    // }, [selectedDate]);

    // useEffect(() => {
    //     let result = data;

    //     if (selectedDate) {
    //         result = result.filter((item) => item.date === selectedDate);
    //     }

    //     if (search) {
    //         const value = search.toLowerCase();
    //         result = result.filter(
    //             (item) =>
    //                 item.name.toLowerCase().includes(value) ||
    //                 item.members.toString().includes(value)
    //         );
    //     }

    //     setFilteredData(result);
    // }, [selectedDate, search]);

    useEffect(() => {
        let result = data;

        // ✅ 1. Event filter (MAIN)
        if (decodedEvent) {
            result = result.filter(
                (item) => item.event === decodedEvent
            );
        }

        // ✅ 2. Date filter
        if (selectedDate) {
            const formatted = formatDate(selectedDate);

            result = result.filter(
                (item) => item.date === formatted
            );
            console.log(formatted, result)
        }
        console.log(result)


        // ✅ 3. Search filter
        if (search) {
            const value = search.toLowerCase();
            result = result.filter(
                (item) =>
                    item.name.toLowerCase().includes(value) ||
                    item.members.toString().includes(value) || 
                    item.date.toLowerCase().includes(value) // ✅ ADD THIS
            );
        }
        console.log("FINAL RESULT:", result);
        setFilteredData(result);
    }, [decodedEvent, selectedDate, search]);
    return (
        <div className="h-133 border border-zinc-300 rounded-2xl overflow-hidden w-full">
            <div className="bg-white rounded-2xl h-full overflow-y-scroll w-[100%] ">
                <div className="flex items-center fixed w-[76.8%] bg-white/50 p-4 backdrop-blur-md rounded-tl-2xl">
                    <div className="w-full max-w-sm">
                        <form onSubmit={searchData} className="flex gap-2 items-center">

                            <div className="flex border items-center border-zinc-400 rounded-lg overflow-hidden w-full ">
                                {/* Text Search */}
                                <Search className="mx-2 w-6 h-6 text-zinc-700 " />
                                <input
                                    type="text"
                                    value={search ? search : selectedDate}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setSelectedDate(""); // clear date when typing
                                    }}
                                    placeholder="Search..."
                                    className="w-full p-2 focus:outline-none text-sm"
                                />
                                <input
                                    type="date"
                                    ref={dateRef}
                                    value={selectedDate}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSelectedDate(value);

                                        const formatted = formatDate(value);

                                        setSearch(formatted); // 👈 show date in textbox
                                    }}
                                    className="hidden"
                                />

                                {/* Button to open calendar */}
                                <button
                                    type="button"
                                    onClick={() => dateRef.current.showPicker()}
                                    className=" px-3 py-2 hover:bg-blue-500 text-zinc-800 hover:text-white transition cursor-pointer"
                                >
                                    <Calendar className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Search Button */}
                            {/* <button type="submit">
                                <CaretRight className="w-9 h-9 bg-white border border-zinc-400 hover:bg-blue-500 hover:text-white transition duration-300 cursor-pointer p-2 rounded-lg" />
                            </button> */}

                        </form>
                    </div>

                </div>


                <div className="overflow-x-auto pt-17 p-4">
                    <table className="w-full border-collapse p-5">
                        <thead className="border-b border-t border-zinc-400">
                            <tr className=" text-left text-md text-zinc-900 font-semibold">
                                <th className="p-3">Sr No</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Reg Date</th>
                                <th className="p-3 text-center">Members</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredData.length === 0 ? (
                                <tr >
                                    <td colSpan="4" className="text-center p-4 text-gray-500">
                                        User not found
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((item, index) => (
                                    <tr key={item.id}
                                        className="border-b border-zinc-400 hover:bg-gray-50 hover:text-zinc-900 transition font-semilight text-zinc-500 text-sm"
                                    >
                                        <td className="p-3 ps-6">{index + 1}</td>
                                        <td className="p-3 ">{item.name}</td>
                                        <td className="p-3 text-zinc-600">{item.date}</td>
                                        <td className="p-3 text-zinc-600 text-center">{item.members}</td>
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