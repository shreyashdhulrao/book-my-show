import React, { useState } from 'react'
import signup_background from '../assets/images/signup_background.jpg'
import EyeShow from '../assets/icons/eye_show.svg?react'
import EyeHide from '../assets/icons/eye_hide.svg?react'
import { Link } from 'react-router';

const signUp = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        designation: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const designations = [
        "Administrator",
        "Principal",
        "Vice Principal",
        "Teacher",
        "Event Coordinator",
        "Office Staff",
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError("");

        const payload = {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            designation: formData.designation,
            password: formData.password,
        };

        console.log(payload);
    };

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full grid lg:grid-cols-2 overflow-hidden rounded-3xl shadow-2xl border border-white/20">

                    {/* Left Image */}
                    <div className="hidden lg:block relative">
                        <img
                            src={signup_background}
                            alt="School"
                            className="h-full w-full fixed"
                        />

                        <div className="absolute inset-0" />

                        <div className="absolute bottom-10 left-10 text-white">
                            <h1 className="text-4xl font-bold">
                                School Event Management
                            </h1>

                            <p className="mt-2 text-zinc-200">
                                Create, manage and organize school events.
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white/80 h-[80%] dark:bg-zinc-900/80 backdrop-blur-xl p-6 sm:p-8 md:p-10 flex items-center justify-center">
                        <form
                            onSubmit={handleSubmit}
                            className="w-full max-w-md space-y-5 bg-red-300"
                        >
                            <div>
                                <h2 className="text-3xl font-semibold text-zinc-800 dark:text-white">
                                    Create Account
                                </h2>

                                <p className="text-zinc-500 mt-1">
                                    Register a new staff member
                                </p>
                            </div>

                            {/* Full Name */}
                            <div className='flex gap-2'>
                                <div>
                                <label className="text-sm text-zinc-600 dark:text-zinc-300">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="mt-1 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-sm text-zinc-600 dark:text-zinc-300">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="mt-1 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <div>
                                <label className="text-sm text-zinc-600 dark:text-zinc-300">
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    placeholder="+91 9876543210"
                                    className="mt-1 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Designation */}
                            <div>
                                <label className="text-sm text-zinc-600 dark:text-zinc-300">
                                    Designation
                                </label>

                                <select
                                    className="mt-1 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Designation</option>

                                    {designations.map((item) => (
                                        <option key={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="text-sm text-zinc-600 dark:text-zinc-300">
                                    Password
                                </label>

                                <div className="mt-1 flex rounded-xl border border-zinc-300 dark:border-zinc-700 overflow-hidden">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter Password"
                                        className="w-full bg-white dark:bg-zinc-800 px-4 py-3 outline-none"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="px-4"
                                    >
                                        {showPassword ? (
                                            <EyeHide className="w-5 h-5" />
                                        ) : (
                                            <EyeShow className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="text-sm text-zinc-600 dark:text-zinc-300">
                                    Confirm Password
                                </label>

                                <div className="mt-1 flex rounded-xl border border-zinc-300 dark:border-zinc-700 overflow-hidden">
                                    <input
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Confirm Password"
                                        className="w-full bg-white dark:bg-zinc-800 px-4 py-3 outline-none"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                        className="px-4"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeHide className="w-5 h-5" />
                                        ) : (
                                            <EyeShow className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <p className="text-red-500 text-sm">
                                    {error}
                                </p>
                            )}

                            {/* Button */}
                            <button
                                type="submit"
                                className="
            w-full
            py-3
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            text-white
            font-medium
            transition
          "
                            >
                                Create Account
                            </button>

                            <p className="text-center text-sm text-zinc-500">
                                Already have an account?
                                <Link
                                    to="/login"
                                    className="ml-2 text-blue-600 font-medium"
                                >
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default signUp
