import React, { useState, useEffect } from "react";
import axios from "axios";

function InterviewExperience() {
  const [openForm, setOpenForm] = useState(false);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [dsaLinks, setDsaLinks] = useState("");
  const [overallExperience, setOverallExperience] = useState("");
  const [applicationMode, setApplicationMode] = useState("Referral");
  const [timeline, setTimeline] = useState("1-2 weeks");
  const [jobExperience, setJobExperience] = useState("");
  const [result, setResult] = useState("Passed");
  const [rounds, setRounds] = useState(3);
  const [experiences, setExperiences] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/experience/create`,
        {
          company,
          role,
          difficulty,
          overallExperience,
          dsaLinks,
          applicationMode,
          timeline,
          jobExperience,
          result,
          rounds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.data.success) {
        alert("Experience submitted successfully!");
        setOpenForm(false);
        getExperiences();
      } else {
        alert("Failed to submit experience: " + resp.data.message);
      }
    } catch (error) {
      console.error("Error submitting experience:", error);
      alert(error.response.data.message || "Failed to submit experience!");
    }
  };
  async function getExperiences() {
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/experience/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.data.success) {
        setExperiences(resp.data.data);
      } else {
        alert("Failed to fetch experiences: " + resp.data.message);
      }
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  }

  useEffect(() => {
    getExperiences();
  }, []);

  return (
    <div className="p-6 relative">
      {/* Header */}
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">
          Ace your interview with Interview Experiences
        </h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setOpenForm(true)}
        >
          Share Your Experience
        </button>
      </div>

      {/* Modal Form */}
      {openForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setOpenForm(false)}
          ></div>

          {/* Form Box */}
          <div className="relative z-60 bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90%] overflow-y-auto">
            <h2 className="text-lg font-bold mb-2">Share Your Experience</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full p-2 border rounded-lg mb-4"
              />
              <label htmlFor="role">Role</label>
              <input
                type="text"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 border rounded-lg mb-4"
              />
              <label htmlFor="difficulty">Difficulty</label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full p-2 border rounded-lg mb-4"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              <label htmlFor="experience">Your Experience</label>
              <select
                id="experience"
                value={jobExperience}
                onChange={(e) => setJobExperience(e.target.value)}
                className="w-full p-2 border rounded-lg mb-4"
              >
                <option value="0-1 years">0-1 years</option>
                <option value="1-2 years">1-2 years</option>
                <option value="2-3 years">2-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>

              <label htmlFor="rounds">No. of Rounds</label>
              <input
                type="number"
                id="rounds"
                value={rounds}
                onChange={(e) => setRounds(Number(e.target.value))}
                className="w-full p-2 border rounded-lg mb-4"
              />

              <label htmlFor="result">Result</label>
              <select
                id="result"
                value={result}
                onChange={(e) => setResult(e.target.value)}
                className="w-full p-2 border rounded-lg mb-4"
              >
                <option value="Passed">Passed</option>
                <option value="Failed">Failed</option>
                <option value="Pending">Pending</option>
              </select>

              <label htmlFor="timeline">Timeline</label>
              <select
                id="timeline"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full p-2 border rounded-lg mb-4"
              >
                <option value="1-2 weeks">1-2 weeks</option>
                <option value="2-4 weeks">2-4 weeks</option>
                <option value="1-2 months">1-2 months</option>
                <option value="2-3 months">2-3 months</option>
                <option value="3+ months">3+ months</option>
              </select>

              <label htmlFor="applicationMode">Application mode</label>
              <select
                id="applicationMode"
                value={applicationMode}
                onChange={(e) => setApplicationMode(e.target.value)}
                className="w-full p-2 border rounded-lg mb-4"
              >
                <option value="Referral">Referral</option>
                <option value="Online">Online</option>
                <option value="Walk-in">Walk-in</option>
                <option value="Campus">Campus</option>
                <option value="Off-campus">Off-campus</option>
              </select>

              <label htmlFor="dsa">DSA Questions/Leetcode Links</label>
              <textarea
                rows="2"
                id="dsa"
                value={dsaLinks}
                onChange={(e) => setDsaLinks(e.target.value)}
                className="w-full p-2 border rounded-lg mb-4"
                placeholder="Enter DSA questions or Leetcode links..."
              />

              <label htmlFor="details">Overall Experience/Tips</label>
              <textarea
                rows="4"
                value={overallExperience}
                onChange={(e) => setOverallExperience(e.target.value)}
                placeholder="Describe your interview experience..."
                className="w-full p-2 border rounded-lg"
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-300"
                  onClick={() => setOpenForm(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {/* Left Side - Filters */}
        <div className="md:col-span-1 space-y-4">
          <input
            type="text"
            id="search"
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
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="p-4 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">
                  {exp.company} - {exp.role}
                </h2>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    exp.difficulty === "Easy"
                      ? "bg-green-100 text-green-700"
                      : exp.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {exp.difficulty}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{exp.body}</p>
              <button className="mt-2 text-blue-600 hover:underline">
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InterviewExperience;
