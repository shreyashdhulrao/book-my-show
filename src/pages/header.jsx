import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import profile_picture from '../assets/images/profile_picture.jpg'
import user_image from '../data/user_data/profile_image.png'

const Header = () => {
    const location = useLocation();
    const userData = {
        "name": "Shreyash Dhulrao",
        "email": "email@gmail.com",
        "password": "pass@123",
        "designation": "principal",
        "photo" : true,
        "photo_id" : ""
    }

    const [userProfile, setuserProfile] = useState(profile_picture)
    const handleProfile = () =>{
        if(userdata?.photo == true ){
            setuserProfile(user_image)
        }
        console.log(userdata.photo)
    }

    const { eventName } = useParams();

    const updateProfile = () =>{
        if(userData.photo === true){
            setuserProfile(photo_id)
        }
    }

    const getPageName = () => {
        const path = location.pathname;

  // ✅ Handle dynamic route first
  if (path.startsWith("/registered-event-users/") && eventName) {
    return decodeURIComponent(eventName).toUpperCase();
  }

        const routes = {
            "/dashboard": "DASHBOARD",
            "/upload-image": "UPLOAD IMAGE",
            "/current-image": "MANAGE IMAGES",
            "/create-event": "CREATE EVENT",
            "/manage-events": "MANAGE EVENT",
            "/registered-users": "REGISTERED USERS",
            "/school-add-image": "ADD IMAGE",
            "/school-manage-image": "MANAGE IMAGES",
            "/registered-event-users": "LIVE EVENTS",
            "/registered-event-users/:eventName": ":eventName",
            "/profile": "PROFILE",
            "/settings": "SETTINGS",

        };

        return routes[path] || "Dashboard";
    };

    return (
        <div>
            <div className="flex  border-b-1 border-zinc-300 dark:border-zinc-600 items-center justify-between px-1 bg-white dark:bg-zinc-900 transition-color duration-300">
                <div className="p-5 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 uppercase">
                        {getPageName()}
                    </h1>
                </div>
                <div className="flex gap-2 items-center p-1">
                    <Link to="/profile" className="p-1" state={{ userData }}><img src={userProfile} alt="" className="w-10 h-10 rounded-full border border-zinc-400" /></Link>
                </div>
            </div>
        </div>
    );
};

export default Header;