import React, { useState } from "react";
import Home from '../assets/icons/gear.svg?react'
import Dashboard from '../assets/icons/dashboard.svg?react'
import Image from '../assets/icons/image.svg?react'
import Calendar from '../assets/icons/calendar.svg?react'
import User from '../assets/icons/user.svg?react'
import LogOut from '../assets/icons/sign-out.svg?react'
import ChevronDown from '../assets/icons/caret-down.svg?react'
import UserList from '../assets/icons/user_list.svg?react'
import Gear from '../assets/icons/gear.svg?react'
import Pis_icon from '../assets/images/pis_icon.png'
import { NavLink, useNavigate, useLocation } from "react-router";

export default function Sidebar() {
    const [openMenu, setOpenMenu] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogout = () => {
        localStorage.removeItem("auth");
        window.location.href = "/login";
    };

    const menuItems = [
        { name: "Dashboard", icon: <Dashboard className=" w-4 h-4 " />, url: "/dashboard" },
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
        { name: "Registered Users", icon: <UserList className=" w-5 h-5" />, url: "/registered-event-users" },
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
        { name: "Settings", icon: <Gear className=" w-5 h-5" />, url: "/settings" },

        // { name: "Profile", icon: <User className=" w-5 h-5" />, url: "/profile" },
    ];

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="h-screen  justify-between p-2 w-64 bg-white dark:bg-zinc-900 transition-color duration-300 shadow-lg flex flex-col border-zinc-300 dark:border-zinc-600 border-e-1">
                <div>
                    <NavLink to="/dashboard" className="flex items-center justify-center gap-2 mb-4">
                        <img src={Pis_icon} alt="PIS Logo" className="w-14 h-14 " />
                        <p className="text-sm text-zinc-500 dark:text-zinc-100 font-semibold">PODAR INTERNATIONAL SCHOOL, SOLAPUR</p>
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
                                        className={`flex items-center justify-between p-2 my-1 rounded-lg cursor-pointer transition text-sm
                                            ${location.pathname === item.url
                                                ? "bg-blue-500 text-white "
                                                : "hover:bg-zinc-200 dark:hover:bg-zinc-700 dark:hover:text-zinc-100 hover:text-zinc-800 text-zinc-700 dark:text-zinc-200"
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 px-2">
                                            {item.icon}
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
                                                                `flex w-full p-2 rounded transition ${isActive
                                                                    ? "bg-blue-400 text-white"
                                                                    : "text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
                                                                }`
                                                            }
                                                        >
                                                            {sub.name}
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
                <button onClick={handleLogout} className="flex items-center gap-2 p-2 rounded-lg hover:bg-red-500 text-red-500 hover:text-white transition cursor-pointer">
                    <LogOut className=" w-5 h-5" />
                    Logout
                </button>
            </div>
        </div>
    );
}