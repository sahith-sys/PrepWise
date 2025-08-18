import React, { useState, useEffect } from "react";

function Qna() {
  const [opencard, setOpenCard] = useState(false);
  const [experience, setExperience] = useState("intern");
  const [salary, setSalary] = useState(120000);
  const [selectedTopics, setSelectedTopics] = useState([]);

  const topics = {
    "Data Structures": ["Arrays", "Trees", "Linked Lists", "Graphs", "Stacks", "Queues", "Hash Tables", "Heaps"],
    Algorithms: ["Sorting", "Searching", "Recursion", "Dynamic Programming", "Greedy Algorithms", "Backtracking", "Divide & Conquer", "Graph Algorithms"],
    "System Design": ["Scalability", "Distributed Systems", "Database Design", "Caching", "Load Balancing", "Microservices", "API Design", "Message Queues"],
    "Other Topics": ["OOP", "Databases", "Networking", "OS Concepts", "Concurrency", "Testing", "Security", "Cloud Computing"],
  };

  // Disable background scroll when modal is open
  useEffect(() => {
    if (opencard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [opencard]);

  const handleTopicChange = (label) => {
    setSelectedTopics((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]
    );
  };

  return (
    <div className="min-h-screen border relative">
      {/* Modal */}
      {opencard && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-[#7F7F7F] bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Select the topics you want to practice:
            </h2>

            <div className="text-gray-800">
              {/* Top row: Target Company & Job Role */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2">Target Company</label>
                  <select className="w-full rounded-md border px-3 py-2">
                    <option value="">Select a company</option>
                    <option>Google</option>
                    <option>Amazon</option>
                    <option>Microsoft</option>
                    <option>Meta</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Job Role</label>
                  <select className="w-full rounded-md border px-3 py-2">
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
                    <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
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
                <p className="text-sm font-medium mb-3">Expected Salary Range (USD)</p>
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
                  <span className="text-sm font-medium">${salary.toLocaleString()}</span>
                </div>
              </div>

              {/* Technical topics */}
              <div className="mt-6">
                <p className="text-sm font-medium">Technical Topics to Focus On</p>
                {Object.entries(topics).map(([group, items]) => (
                  <div key={group} className="mt-4">
                    <p className="mb-2 text-sm font-semibold">{group}</p>
                    <div className="grid gap-x-6 gap-y-3 md:grid-cols-3">
                      {items.map((label) => (
                        <label key={label} className="flex items-center gap-2 text-sm">
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

              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">Additional Requirements</label>
                <textarea
                  placeholder="Any specific topics or question types?"
                  className="h-24 w-full resize-y rounded-md border px-3 py-2 text-sm"
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
        </div>
      )}

      {/* Main Page */}
      <div className="flex flex-col items-center justify-center bg-blue-50 py-12 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 text-center mb-6">
          Generate Customised Sessions with your topics
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-xl">
          Select your topics and let us create a personalized learning experience for you.
        </p>
        <div className="flex gap-4 mt-6">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={() => setOpenCard(true)}
          >
            Generate Session
          </button>
          <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
            Delete Sessions
          </button>
        </div>
      </div>
    </div>
  );
}

export default Qna;
