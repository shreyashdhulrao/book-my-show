import React from "react";
import CaretRight from '../../assets/icons/caret_right.svg?react'
import { Link } from "react-router-dom";

export default function Card({ title, value, icon, date, link }) {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 w-80 h-40 hover:shadow-sm transition border border-zinc-300 dark:border-zinc-600 flex justify-between ">
            {/* Top Section */}
            <div className="">
                <div className="flex items-center justify-between mb-4">
                    <div className="text-blue-500">
                        {icon}
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-zinc-400 dark:text-zinc-200 mb-2">
                    {title}
                </h3>

                {/* Value */}
                <p className="text-5xl font-bold text-gray-800 dark:text-white">
                    {value}
                </p>
            </div>

            <div className="flex items-end p-0">
                <Link to={link} state={{ date }} className="flex text-xs font-semibold gap-1 items-center justify-around my-3 text-blue-500 bg-zinc-200 dark:bg-zinc-700 w-32 hover:bg-blue-500 hover:text-white transition transition-color duration-300 py-2 px-3 rounded-lg ">
                    Check Status
                    <CaretRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
    );
}


// 🔥 Example Usage
// import { Users } from "lucide-react";

