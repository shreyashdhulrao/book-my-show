import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import profile_image from '../data/user_data/profile_Image.png'

const profile = ({ profile }) => {
  const location = useLocation();
  const userData = location.state?.userData || {};
  const [showPass, setShowPass] = useState(false);

  return (

    <div className="h-133 border border-zinc-300 rounded-2xl overflow-hidden w-full">
      <div className="bg-white rounded-2xl h-full overflow-y-scroll w-[100%] scrollbar-none p-4">
        <div className='flex justify-between'>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-zinc-400">Name</p>
              <p className="font-medium">{userData?.name}</p>
            </div>

            <div>
              <p className="text-sm text-zinc-400">Designation</p>
              <p className="font-medium capitalize">{userData?.designation}</p>
            </div>

            <div>
              <p className="text-sm text-zinc-400">Email</p>
              <p className="font-medium">{userData?.email}</p>
            </div>

            <div >
              <p className="text-sm text-zinc-400">Password</p>
              <div className='flex gap-3 items-center'>
                <p className="font-medium">
                {showPass ? userData?.password : "*****"}
              </p>
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="text-blue-500 text-sm"
              >
                {showPass ? "Hide" : "Show"}
              </button>
              </div>
            </div>
          </div>
          <div className='w-60 h-60'>
            <img src={profile_image} alt="" className='w-full h-full' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default profile
