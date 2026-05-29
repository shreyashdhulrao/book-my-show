import React, { useState } from "react";
import { Link } from "react-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log(email)
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-1/2 bg-zinc-100 rounded-2xl p-8">
        {!submitted ? (
          <>
            <h2 className="text-4xl font-medium text-gray-700 mb-4 text-center">
                FORGOT PASSWORD
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              Enter your registered email address to continue
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Submit
              </button>
            </form>
            <div className=" text-center mt-2">
                <Link to="/login" className='text-md text-blue-500 text-semibold' >Back</Link>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Check Your Email
            </h2>
            <p className="text-gray-600 text-sm">
              If your email is registered, you can either reset your password or view your current password.
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-blue-500 hover:underline text-sm"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword