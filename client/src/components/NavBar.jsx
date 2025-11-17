import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";
import axios from "axios";

function NavBar() {
  const { user } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  async function handleProfileClick() {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const resp = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/getUserId`, {
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
        }
      });
      const userId = resp.data.userId;
      if(resp.data.success){
        window.location.href = `/user/${userId}`;
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
      alert("Failed to fetch user ID. Please try again.");
    }
  }

  return (
    <div className="bg-white shadow-md">
      <nav className="flex flex-row justify-between items-center container mx-auto px-4 py-4">
        {/* Logo */}
        <div className="cursor-pointer text-xl text-blue-600 font-bold">
          <h1>Prep Wise</h1>
        </div>

        <button
          className="md:hidden text-blue-600 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="text-lg font-medium hover:text-blue-600">Home</Link></li>
          <li><Link to="/qna" className="text-lg font-medium hover:text-blue-600">Q&A</Link></li>
          <li><Link to="/dsa" className="text-lg font-medium hover:text-blue-600">DSA</Link></li>
          <li><Link to="/interview-experiences" className="text-lg font-medium hover:text-blue-600">Interview Experiences</Link></li>
          <li><Link to="/mock-interviews" className="text-lg font-medium hover:text-blue-600">Mock Interviews</Link></li>
          <li><Link to="/resume-analysis" className="text-lg font-medium hover:text-blue-600">Resume Analysis</Link></li>
        </ul>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <button className="cursor-pointer" onClick={handleProfileClick}>
              <div className="bg-white rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" strokeWidth={1.5}
                  stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
            </button>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
              <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          <Link to="/" className="block text-lg font-medium hover:underline">Home</Link>
          <Link to="/qna" className="block text-lg font-medium hover:underline">Q&A</Link>
          <Link to="/dsa" className="block text-lg font-medium hover:underline">DSA</Link>
          <Link to="/interview-experiences" className="block text-lg font-medium hover:underline">Interview Experiences</Link>
          <Link to="/mock-interviews" className="block text-lg font-medium hover:underline">Mock Interviews</Link>
          <Link to="/resume-analysis" className="block text-lg font-medium hover:underline">Resume Analysis</Link>

          {user ? (
            <button className="flex items-center space-x-2 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" strokeWidth={1.5}
                stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <span>Profile</span>
            </button>
          ) : (
            <div className="flex flex-col space-y-2">
              <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
              <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NavBar;
