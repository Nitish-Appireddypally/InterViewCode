import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";

const Home = () => {
  const navigate = useNavigate();
  const [user] = useState({ name: "Nitish ", email: "nitishyadav18vk@gmail.com" }); // Example user data

  const handleLogout = () => {
    // Handle Firebase logout (you can integrate Firebase logout functionality here)
    navigate("/");
  };

  return (
    <>
      {/* Navbar (reused from your Landing Page) */}
      <Navbar/>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100 flex flex-col items-center justify-center">

      

      {/* Profile and Dashboard Section */}
      <div className="flex flex-col items-center justify-center py-24">
        <div className="bg-gradient-to-b from-gray-800 to-gray-700 p-6 rounded-lg shadow-lg w-80 text-center">
          <h2 className="text-2xl font-semibold mb-4">Welcome, {user.name}!</h2>
          <p className="text-sm mb-6">{user.email}</p>

          <div className="space-y-4">
            {/* Dashboard Buttons */}
            <button
              onClick={() => navigate("/create-room")}
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Create Room
            </button>
            <button
              onClick={() => navigate("/join-room")}
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Join Room
            </button>
            <button
              onClick={() => navigate("/user-profile")}
              className="w-full py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition duration-300"
            >
              User Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 bg-gradient-to-r from-gray-800 to-gray-900 text-center text-sm text-white">
        <p>© 2024 InterviewCode. All rights reserved.</p>
      </footer>
    </div>
    </>
  );
};

export default Home;
