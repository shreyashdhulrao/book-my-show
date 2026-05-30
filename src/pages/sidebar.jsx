import React, { useState } from "react";
import Home from '../assets/icons/gear.svg?react'
import Dashboard from '../assets/icons/dashboard.svg?react'
import Image from '../assets/icons/image.svg?react'
import Calendar from '../assets/icons/calendar.svg?react'
import User from '../assets/icons/user.svg?react'
import LogOut from '../assets/icons/log-out.svg?react'
import ChevronDown from '../assets/icons/caret-down.svg?react'
import UserList from '../assets/icons/user_list.svg?react'
import Gear from '../assets/icons/gear.svg?react'
import Settings from '../assets/icons/settings.svg?react'
import Dot from '../assets/icons/dot.svg?react'
import Menu from '../assets/icons/gear.svg?react'
import X from '../assets/icons/gear.svg?react'

import Pis_icon from '../assets/images/pis_icon.png'

import { NavLink, useNavigate, useLocation } from "react-router";

export default function Sidebar() {
    const [openMenu, setOpenMenu] = useState(null);
    const navigate = useNavigate();
    const location = useLocation()
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem("auth");
        window.location.href = "/login";
    };

    const menuItems = [
        { name: "Dashboard", icon: <Dashboard className=" w-5 h-5 " />, url: "/dashboard" },
        {
            name: "Event",
            icon: <Calendar className=" w-5 h-5" />,
            subItems: [
                {
                    name: "Create New Event",
                    url: "/create-event"
                },
                {
                    name: "Manage Events",
                    url: "/manage-events"
                }
            ]
        },
        { name: "Registered Users", icon: <User className=" w-5 h-5" />, url: "/registered-event-users" },
        {
            name: "School Images",
            icon: <Image className=" w-5 h-5" />,
            subItems: [
                {
                    name: "Upload Image",
                    url: "/school-add-image"
                },
                {
                    name: "Manage Image",
                    url: "/school-manage-image"
                }
            ]
        },
        { name: "Settings", icon: <Settings className=" w-5 h-5" />, url: "/settings" },

        // { name: "Profile", icon: <User className=" w-5 h-5" />, url: "/profile" },
    ];

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="h-full justify-between p-2 w-64 bg-white dark:bg-zinc-900 transition-color duration-300 flex flex-col border-e-2 border-zinc-300 dark:border-zinc-700">
                <div>
                    <NavLink to="/dashboard" className="flex items-center justify-start gap-2 mb-4 ">
                        <img src={Pis_icon} alt="PIS Logo" className="w-16 h-16 rounded-sm " />
                        <div className="tracking-normal uppercase">
                            <p className="text-md text-zinc-700 dark:text-zinc-100 tracking-wider font-bold font-sfprodark  ">Podar</p>
                            <p className="text-xs text-zinc-700 dark:text-zinc-100 font-black  ">International School</p>
                            <p className="text-[10px] text-zinc-400 font-semilight">Solapur</p>

                        </div>
                    </NavLink>
                    <div>
                        <p className="text-xs text-zinc-500 font-bold mb-2">MENU</p>
                        <ul>
                            {menuItems.map((item, index) => (
                                <li
                                    key={index}
                                    onMouseEnter={() => setOpenMenu(index)}
                                    onMouseLeave={() => setOpenMenu(null)}
                                    className="relative"
                                >
                                    <div
                                        onClick={() => {
                                            if (!item.subItems && item.url) {
                                                navigate(item.url);
                                            }
                                        }}
                                        className={`flex items-center font-light justify-between p-1 my-1 rounded-xl cursor-pointer transition text-sm
                                                ${location.pathname === item.url
                                                ? "bg-zinc-200 dark:bg-zinc-700 dark:text-white shadow  "
                                                : "hover:bg-zinc-200 dark:hover:bg-zinc-700 dark:hover:text-zinc-100 hover:text-zinc-800 text-zinc-700 dark:text-zinc-50 "
                                            }`}
                                    >
                                        <div className="flex items-center gap-1">
                                            <div className="p-1 rounded-lg">{item.icon}</div>
                                            <span>{item.name}</span>
                                        </div>

                                        {item.subItems && (
                                            <ChevronDown className="w-4 h-4" />
                                        )}
                                    </div>

                                    {/* Dropdown */}
                                    {item.subItems &&
                                        (openMenu === index ||
                                            item.subItems.some(sub => sub.url === location.pathname)) && (
                                            <ul className="ml-5 space-y-1 text-xs text-zinc-500">
                                                {item.subItems.map((sub, i) => (
                                                    <li key={i}>
                                                        <NavLink
                                                            to={sub.url}
                                                            className={({ isActive }) =>
                                                                `flex w-full p-2 rounded-xl transition ${isActive
                                                                    ? "bg-zinc-300 dark:bg-zinc-700 dark:text-white"
                                                                    : "text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700 dark:hover:text-zinc-100 dark:text-zinc-300"
                                                                }`
                                                            }
                                                        >
                                                            <div className="flex items-center gap-1">
                                                                <Dot className="w-5 h-5 p-1.5 font-light rounded-md" />
                                                                <span>{sub.name}</span>
                                                            </div>
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Logout */}
                <button onClick={handleLogout} className="flex items-center gap-1 p-1 rounded-md hover:bg-red-400 text-red-500 hover:text-white transition cursor-pointer">
                    <LogOut className=" w-6 h-6 rounded-sm p-0.5" />
                    Logout
                </button>
            </div>
        </div>
    );
}


