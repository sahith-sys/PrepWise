import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { Navigate, useNavigate } from "react-router-dom";

function Qna() {
  const [opencard, setOpenCard] = useState(false);
  const [experience, setExperience] = useState("intern");
  const [salary, setSalary] = useState(120000);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [targetCompany, setTargetCompany] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [additionalReq, setAdditionalReq] = useState("");

  const [showSessionCard, setShowSessionCard] = useState(false);
  const [sessionName, setSessionName] = useState("");
  const [sessionDescription, setSessionDescription] = useState("");
  const [allSessions, setAllSessions] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const pastelColors = [
    "bg-pink-100 border-pink-200",
    "bg-blue-100 border-blue-200",
    "bg-green-100 border-green-200",
    "bg-yellow-100 border-yellow-200",
    "bg-purple-100 border-purple-200",
    "bg-red-100 border-red-200",
  ];

  const topics = {
    "Data Structures": [
      "Arrays",
      "Trees",
      "Linked Lists",
      "Graphs",
      "Stacks",
      "Queues",
      "Hash Tables",
      "Heaps",
    ],
    Algorithms: [
      "Sorting",
      "Searching",
      "Recursion",
      "Dynamic Programming",
      "Greedy Algorithms",
      "Backtracking",
      "Divide & Conquer",
      "Graph Algorithms",
    ],
    "System Design": [
      "Scalability",
      "Distributed Systems",
      "Database Design",
      "Caching",
      "Load Balancing",
      "Microservices",
      "API Design",
      "Message Queues",
    ],
    "Other Topics": [
      "OOP",
      "Databases",
      "Networking",
      "OS Concepts",
      "Concurrency",
      "Testing",
      "Security",
      "Cloud Computing",
    ],
  };

  const payload = {
    sessionName,
    sessionDescription,
    experience,
    salary,
    selectedTopics,
    targetCompany,
    targetRole,
    additionalReq,
  };

  useEffect(() => {
    if (opencard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [opencard]);

  useEffect(() => {
    getAllSessions();
  }, []);

  const handleTopicChange = (label) => {
    setSelectedTopics((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]
    );
  };

  function handleSubmit(e) {
    e.preventDefault();
    setOpenCard(false);
    setShowSessionCard(true);
  }

  async function handleSessionSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/qna/create`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.data.success) {
        alert("Session created successfully!");
        getAllSessions();
        setSessionName("");
        setSessionDescription("");
        setSelectedTopics([]);
        setTargetCompany("");
        setTargetRole("");
        setAdditionalReq("");
        setSalary(120000);
        setExperience("intern");
      }
    } catch (error) {
      console.error("Error while creating session", error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to create session"
      );
    } finally {
      setLoading(false);
      setSessionName("");
      setSessionDescription("");
    }
  }
  async function getAllSessions() {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/qna/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.data.success) {
        setAllSessions(resp.data.data);
        setLoading(false);
        setShowSessionCard(false);
      } else {
        alert("Failed to fetch sessions" + resp.data.message);
      }
    } catch (error) {
      console.error("Error while fetching sessions", error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch sessions"
      );
    }
  }
  function handleSessionClick(id){
    navigate(`/session/${id}`);
  }

  /*function handleDeleteSession(index) {
    setAllSessions((prev) => prev.filter((_, i) => i !== index));
  }*/

  return (
    <div className="min-h-screen border relative">
      {opencard && (
        <form
          onSubmit={handleSubmit}
          className="fixed inset-0 z-10 flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setOpenCard(false)}
          ></div>

          <div className="relative z-50 bg-white p-6 rounded-lg shadow-lg w-full max-w-xl max-h-[90%] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Select the topics you want to practice:
            </h2>

            <div className="text-gray-800">
              {/* Target Company & Job Role */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Target Company
                  </label>
                  <select
                    required
                    className="w-full rounded-md border px-3 py-2"
                    onChange={(e) => setTargetCompany(e.target.value)}
                  >
                    <option value="">Select a company</option>
                    <option>Google</option>
                    <option>Amazon</option>
                    <option>Microsoft</option>
                    <option>Meta</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Job Role
                  </label>
                  <select
                    className="w-full rounded-md border px-3 py-2"
                    onChange={(e) => setTargetRole(e.target.value)}
                  >
                    <option value="">Select a role</option>
                    <option>Software Engineer</option>
                    <option>Backend Engineer</option>
                    <option>Frontend Engineer</option>
                    <option>Data Scientist</option>
                  </select>
                </div>
              </div>

              {/* Experience */}
              <div className="mt-6">
                <p className="text-sm font-medium mb-3">Experience Level</p>
                <div className="flex flex-wrap gap-6 text-sm">
                  {[
                    { id: "intern", label: "Intern" },
                    { id: "newgrad", label: "New Grad" },
                    { id: "mid", label: "Mid-Level (2–5 yrs)" },
                    { id: "senior", label: "Senior (5+ yrs)" },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="experience"
                        value={opt.id}
                        checked={experience === opt.id}
                        onChange={(e) => setExperience(e.target.value)}
                        className="h-4 w-4"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary */}
              <div className="mt-6">
                <p className="text-sm font-medium mb-3">
                  Expected Salary Range (USD)
                </p>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={0}
                    max={120000}
                    step={1000}
                    value={salary}
                    onChange={(e) => setSalary(parseInt(e.target.value, 10))}
                    className="w-full"
                  />
                  <span className="text-sm font-medium">
                    ${salary.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Topics */}
              <div className="mt-6">
                <p className="text-sm font-medium">
                  Technical Topics to Focus On
                </p>
                {Object.entries(topics).map(([group, items]) => (
                  <div key={group} className="mt-4">
                    <p className="mb-2 text-sm font-semibold">{group}</p>
                    <div className="grid gap-x-6 gap-y-3 md:grid-cols-3">
                      {items.map((label) => (
                        <label
                          key={label}
                          className="flex items-center gap-2 text-sm"
                        >
                          <input
                            type="checkbox"
                            className="h-4 w-4"
                            checked={selectedTopics.includes(label)}
                            onChange={() => handleTopicChange(label)}
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Requirements */}
              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">
                  Additional Requirements
                </label>
                <textarea
                  placeholder="Any specific topics or question types?"
                  className="h-24 w-full resize-y rounded-md border px-3 py-2 text-sm"
                  value={additionalReq}
                  onChange={(e) => setAdditionalReq(e.target.value)}
                />
              </div>

              <div className="mt-6">
                <button className="w-full rounded-md bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700">
                  <span className="mr-2">✏️</span>Generate Questions
                </button>
              </div>

              <button
                onClick={() => setOpenCard(false)}
                className="mt-4 text-sm text-blue-500 underline block mx-auto"
              >
                Close
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Modal for session details */}
      {showSessionCard && (
        <form
          className="fixed inset-0 z-10 flex items-center justify-center"
          onSubmit={handleSessionSubmit}
        >
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setShowSessionCard(false)}
          ></div>
          <div className="relative z-50 bg-white p-6 rounded-lg shadow-lg w-full max-w-xl max-h-[90%] overflow-y-auto">
            <label htmlFor="session-name">Session Name:</label>
            <input
              type="text"
              id="session-name"
              value={sessionName}
              placeholder="Google | Software Engineer"
              onChange={(e) => setSessionName(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <label htmlFor="session-description">
              Session Description (2 to 3 sentences):
            </label>
            <textarea
              id="session-description"
              placeholder="Getting ready for startup tech rounds"
              rows={2}
              value={sessionDescription}
              onChange={(e) => setSessionDescription(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
            ></textarea>
            <div className="flex flex-col text-center">
              <button
                className="w-full rounded-md bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader
                    color="#ffffff"
                    loading={loading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  "Create Session"
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowSessionCard(false)}
                className="mt-4 text-blue-600 py-2 px-4 rounded hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Main Page */}
      <div className="flex flex-col items-center justify-center bg-blue-50 py-12 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 text-center mb-6">
          Generate Customised Sessions with your topics
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-xl">
          Select your topics and let us create a personalized learning
          experience for you.
        </p>
        <div className="flex gap-4 mt-6">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={() => setOpenCard(true)}
          >
            Generate Session
          </button>
          <button
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
            onClick={() => setAllSessions([])}
          >
            Delete All Sessions
          </button>
        </div>
      </div>

      {/* Sessions List */}
      <div className="container mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allSessions.map((session, index) => (
          <div
            key={index}
            onClick={() => handleSessionClick(session._id)}
            className="relative border rounded-2xl bg-white shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition cursor-pointer"
          >
            {/* Delete Button */}
            <button
              onClick={() => handleDeleteSession(index)}
              className="absolute top-3 right-3 text-pink-500 hover:text-red-600"
            >
              🗑
            </button>

            {/* Header */}
            <div
              className={`p-4 rounded-lg flex items-center gap-3 ${
                pastelColors[index % pastelColors.length]
              }`}
            >
              <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center font-bold text-gray-700">
                {session.sessionName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{session.sessionName}</h3>
                <p className="text-sm text-gray-600">
                  {session.sessionDescription}
                </p>
              </div>
            </div>

            {/* Skills / Topics */}
            {session.selectedTopics.length > 0 && (
              <p className="mt-3 text-sm text-gray-500">
                {session.selectedTopics.join(", ")}
              </p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1 rounded-full border text-xs text-gray-700">
                Experience: {session.experience}
              </span>
              <span className="px-3 py-1 rounded-full border text-xs text-gray-700">
                Salary: ${session.salary.toLocaleString()}
              </span>
              <span className="px-3 py-1 rounded-full border text-xs text-gray-700">
                {session.targetCompany}
              </span>
              <span className="px-3 py-1 rounded-full border text-xs text-gray-700">
                {session.targetRole}
              </span>
            </div>

            {/* Footer */}
            {session.additionalReq && (
              <p className="mt-4 text-xs text-gray-500 italic">
                {session.additionalReq}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Qna;
