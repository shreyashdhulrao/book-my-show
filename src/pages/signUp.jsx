import React, { useState } from 'react'
import login_page from '../assets/images/login_page.jpg'
import EyeShow from '../assets/icons/eye_show.svg?react'
import EyeHide from '../assets/icons/eye_hide.svg?react'
import { Link } from 'react-router';

const signUp = () => {
    const [passShow, setpassShow] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const handleSubmit = (e) =>{
      e.preventDefault()
      console.log(name, email, pass)
    }

    return (
        <div>
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-full bg-white overflow-hidden grid grid-cols-1 md:grid-cols-2">

                    {/* Left Side - Image */}
                    <div className="hidden md:block">
                        <img
                            src={login_page}
                            alt="login"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Right Side - Form */}
                    <div className="flex items-center justify-center p-8">
                        <form className="w-full max-w-sm space-y-5" onSubmit={handleSubmit}>
                            <h2 className="text-4xl font-medium text-gray-700 mb-4 text-center">
                                SIGN UP
                            </h2>

                            <div>
                                <p className="text-sm text-gray-600 mb-1 ml-1">Full Name</p>
                                <input
                                    type="text"
                                    placeholder="Enter Full Name"
                                    name='name'
                                    value={name}
                                    onChange={(e)=> setName(e.currentTarget.value)}
                                    className="w-full border border-gray-300 rounded-lg p-2 outline-none ps-3 placeholder:text-zinc-400"/>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-1 ml-1">Email Address</p>
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    name='email'
                                    value={email}
                                    onChange={(e)=> setEmail(e.currentTarget.value)}
                                    className="w-full border border-gray-300 rounded-lg p-2 outline-none ps-3 placeholder:text-zinc-400"/>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 mb-1 ml-1">Password</p>
                                <div className="flex border border-gray-300 rounded-lg">
                                    <input
                                        type={passShow ? "text" : "password"}
                                        placeholder="Enter Password"
                                        name='password'
                                        value={pass}
                                        onChange={(e)=> setPass(e.currentTarget.value)}
                                        className="w-full rounded-l-lg p-2 outline-none ps-3 placeholder:text-zinc-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setpassShow(!passShow)}
                                        className=" px-3 rounded-r-lg"
                                    >
                                        {passShow ? 
                                        <EyeHide className="text-zinc-800 w-5 h-5" />:    
                                        <EyeShow className="text-zinc-800 w-5 h-5" />
                                    }
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Sign Up
                            </button>

                            <div className='w-full flex items-center justify-center flex-col gap-3'>
                                <div className='flex gap-2 text-end w-full text-medium'>
                                    <p className=" text-center text-gray-500">Already have an Account? </p>
                                    <Link to="/login" className='text-md text-blue-500 text-semibold'> Login</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default signUp
