import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function CompanyQuestions() {
  const { company } = useParams();
  const [questions, setQuestions] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [progress, setProgress] = useState({});

  useEffect(() => {
    getQuestions();
  }, [company]);

  useEffect(() => {
    getProgress();
  }, []);

  async function getProgress() {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/dsa/get/progress`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setProgress(
          res.data.progress.reduce((acc, id) => {
            acc[id] = true;
            return acc;
          }, {})
        );
      } else if(res.data.message === "Unauthorized"){
        setProgress([]);
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
    }
  }

  async function getQuestions() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/dsa/get/questions/${company}`
      );
      setQuestions(res.data);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  }

  const toggleProgress = async (id) => {
    const updated = { ...progress, [id]: !progress[id] };
    setProgress(updated);
    const token = localStorage.getItem("token");
    if(!token){
      alert("Login to save your progress!");
      return;
    }
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/dsa/update/progress`,
        { progress: updated },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if(resp.data.success){
        console.log("Progress updated on server");
      } else {
        console.error("Failed to update progress on server");
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const filteredQuestions =
    difficultyFilter === "All"
      ? questions
      : questions.filter((q) => q.difficulty === difficultyFilter);

  // Overall progress
  const solvedCount = questions.filter((q) => progress[q._id]).length;
  const totalCount = questions.length;
  const percentage = totalCount ? Math.round((solvedCount / totalCount) * 100) : 0;

  // Difficulty-wise progress
  const difficulties = ["Easy", "Medium", "Hard"];
  const progressByDifficulty = difficulties.map((diff) => {
    const total = questions.filter((q) => q.difficulty === diff).length;
    const solved = questions.filter((q) => q.difficulty === diff && progress[q._id]).length;
    const percent = total ? Math.round((solved / total) * 100) : 0;
    return { diff, solved, total, percent };
  });

  const difficultyColors = {
    Easy: "bg-green-100 text-green-700 border-green-300",
    Medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
    Hard: "bg-red-100 text-red-700 border-red-300",
  };

  const barColors = {
    Easy: "bg-green-500",
    Medium: "bg-yellow-500",
    Hard: "bg-red-500",
  };

  return (
    <div className="p-6 container mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold capitalize">{company} DSA Sheet</h1>
        <p className="text-gray-600">Practice company-specific problems and track your progress.</p>
      </header>

      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">Overall Progress: {solvedCount}/{totalCount}</span>
          <span>{percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Difficulty-wise Progress */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {progressByDifficulty.map(({ diff, solved, total, percent }) => (
          <div key={diff} className="p-4 border rounded-xl bg-white shadow-sm">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold">{diff} ({solved}/{total})</span>
              <span>{percent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`${barColors[diff]} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6">
        {["All", "Easy", "Medium", "Hard"].map((level) => (
          <button
            key={level}
            onClick={() => setDifficultyFilter(level)}
            className={`px-4 py-2 rounded-lg border ${
              difficultyFilter === level
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Questions Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Done</th>
              <th className="p-3">Problem</th>
              <th className="p-3">Difficulty</th>
              <th className="p-3">Tags</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.map((q) => (
              <tr key={q._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={progress[q._id] || false}
                    onChange={() => toggleProgress(q._id)}
                  />
                </td>
                <td className="p-3">
                  <a
                    href={q.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {q.question}
                  </a>
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full border text-sm font-semibold ${
                      difficultyColors[q.difficulty] || "bg-gray-100"
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </td>
                <td className="p-3 flex gap-2 flex-wrap">
                  {q.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-gray-200 rounded-lg text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompanyQuestions;
