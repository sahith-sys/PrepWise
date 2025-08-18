import React from "react";

function InterviewExperience() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        {/* Left Side - Filters */}
        <div className="md:col-span-1 space-y-4">
          <input
            type="text"
            placeholder="Search by company or role..."
            className="w-full p-2 border rounded-lg"
          />

          <div>
            <h3 className="font-semibold mb-2">Filter by Company</h3>
            <div className="space-y-1">
              <label className="flex items-center space-x-2">
                <input type="checkbox" /> <span>Google</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" /> <span>Microsoft</span>
              </label>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Filter by Difficulty</h3>
            <div className="space-y-1">
              <label className="flex items-center space-x-2">
                <input type="radio" name="difficulty" /> <span>Easy</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="difficulty" /> <span>Medium</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="difficulty" /> <span>Hard</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Side - Cards */}
        <div className="md:col-span-3 space-y-4">
          <div className="p-4 border rounded-lg shadow hover:shadow-md transition">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">Google - SDE Intern</h2>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                Medium
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              The interview consisted of 3 rounds, mainly focusing on DSA,
              system design...
            </p>
            <button className="mt-2 text-blue-600 hover:underline">
              Read More
            </button>
          </div>

          <div className="p-4 border rounded-lg shadow hover:shadow-md transition">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">Microsoft - Data Analyst</h2>
              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                Hard
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              The interview focused on SQL queries, case studies, and data
              interpretation...
            </p>
            <button className="mt-2 text-blue-600 hover:underline">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewExperience;
