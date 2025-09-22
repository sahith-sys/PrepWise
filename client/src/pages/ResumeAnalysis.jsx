import React, { useEffect } from "react";
import { useState } from "react";
import { Upload, FileText, Download } from "react-feather";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function ResumeAnalysis() {
  const [resume, setResume] = useState(null);
  const [score, setScore] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const lsinsights = localStorage.getItem("resumeAnalysis");
    if (lsinsights) {
      const parsedInsights = JSON.parse(lsinsights);
      setInsights(parsedInsights);
      setScore(parsedInsights.overallScore || 0);
    }
  }, []);
  const handleUpload = async (e) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setLoading(true);
    setError(null);
    setScore(null);
    setInsights(null);
    try {
      const file = e.target.files[0];
      setResume(file);
      if (!file) return;
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);
      const resp = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/atsresume/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = resp.data;
      if (data.success && data.response) {
        setScore(data.response.overallScore || 0);
        setInsights(data.response);
        console.log("Resume analysis result:", data.response);
        localStorage.setItem("resumeAnalysis", JSON.stringify(data.response));
      } else {
        setError(data.message || "Error analyzing resume. Please try again.");
      }
    } catch (err) {
      console.error("Error uploading resume:", err);
      setError("Resume analysis failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <ClipLoader
              color="#4d5dcaff"
              loading={loading}
              size={40}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <p className="text-gray-700 mt-4">Analyzing Resume...</p>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        ATS Resume Analyzer
      </h1>

      {/* Upload Box */}
      <div className="flex flex-col items-center">
        <div className="flex justify-center mb-4">
          <label className="flex flex-col items-center justify-center w-96 h-40 border-2 border-dashed border-gray-400 rounded-2xl cursor-pointer bg-white shadow-sm hover:shadow-lg transition">
            <Upload className="w-10 h-10 text-gray-500 mb-2" />
            <span className="text-gray-600">
              Click to upload or drag & drop
            </span>
            <input type="file" className="hidden" onChange={handleUpload} />
          </label>
        </div>
        <div>
          <p className="text-gray-600">or</p>
        </div>
        <Link to="/create-resume">
          <div>
            <button className="flex items-center m-4 gap-2 px-4 py-2 bg-indigo-600 text-white border border-gray-300 rounded-lg hover:bg-indigo-700">
              <Upload className="w-4 h-4" /> Create Your Own
            </button>
          </div>
        </Link>
      </div>

      {/* Parsed Resume Section */}
      {/*resume && (
        <div className="container mx-auto bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5" /> Parsed Resume
          </h2>
          <p className="text-gray-600 mt-2">File: {resume.name}</p>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="font-medium">Extracted Info</h3>
              <ul className="text-gray-700 text-sm mt-2 space-y-1">
                <li>
                  <strong>Name:</strong> John Doe
                </li>
                <li>
                  <strong>Email:</strong> johndoe@email.com
                </li>
                <li>
                  <strong>Education:</strong> B.Tech CSE
                </li>
                <li>
                  <strong>Skills:</strong> React, Node.js, Python
                </li>
              </ul>
            </div>
          </div>
        </div>
      )*/}

      {/* Insights */}
      {score && (
        <div className="container mx-auto mb-8 bg-white rounded-2xl shadow-md p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ATS Score */}
            <div className="flex flex-col items-center col-span-1 border-b-2 lg:border-b-0 lg:border-r-2 pb-6 lg:pb-0 lg:pr-6">
              <h3 className="font-medium text-center text-base md:text-lg">
                ATS Score
              </h3>
              <div
                className={`w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-full border-[6px] mt-3 ${
                  score < 40
                    ? "border-red-600"
                    : score < 80
                    ? "border-yellow-500"
                    : "border-green-600"
                }`}
              >
                <span
                  className={`text-lg md:text-xl font-bold ${
                    score < 40
                      ? "text-red-600"
                      : score < 80
                      ? "text-yellow-500"
                      : "text-green-600"
                  }`}
                >
                  {score}%
                </span>
              </div>
            </div>

            {/* Insights */}
            <div className="col-span-2 p-2 md:p-6">
              <div>
                <h3 className="font-medium">Strengths</h3>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  {insights.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="font-medium">Weaknesses</h3>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  {insights.weaknesses.map((weakness, index) => (
                    <li key={index}>{weakness}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="font-medium">Missing Key Words</h3>
                {insights.missingKeywords.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {insights.missingKeywords.map((word, index) => (
                      <div
                        key={index}
                        className="text-red-700 border border-red-700 px-2 py-1 rounded"
                      >
                        {word}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700 mt-2">None</p>
                )}
              </div>

              <div className="space-y-4">
                {/* Formatting Issues */}
                <div>
                  <h3 className="font-semibold mb-2">Formatting Issues</h3>
                  <div className="flex flex-wrap gap-2">
                    <div className="px-3 py-1 rounded-lg bg-red-100 border border-red-400 text-red-600 text-sm font-medium">
                      Inconsistent Font
                    </div>
                    <div className="px-3 py-1 rounded-lg bg-red-100 border border-red-400 text-red-600 text-sm font-medium">
                      Improper Margins
                    </div>
                    <div className="px-3 py-1 rounded-lg bg-red-100 border border-red-400 text-red-600 text-sm font-medium">
                      No Bullet Points Used
                    </div>
                    <div className="px-3 py-1 rounded-lg bg-red-100 border border-red-400 text-red-600 text-sm font-medium">
                      Not ATS Friendly
                    </div>
                  </div>
                </div>

                {/* Readability */}
                <div>
                  <h3 className="font-semibold mb-2">Readability</h3>
                  <div className="flex flex-wrap gap-2">
                    <div className="px-3 py-1 rounded-lg bg-green-100 border border-green-400 text-green-600 text-sm font-medium">
                      Clear Section Headers
                    </div>
                    <div className="px-3 py-1 rounded-lg bg-yellow-100 border border-yellow-400 text-yellow-600 text-sm font-medium">
                      Few Grammar Errors
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="font-semibold mb-2">Contact Info</h3>
                  <div className="flex flex-wrap gap-2">
                    <div className="px-3 py-1 rounded-lg bg-green-100 border border-green-400 text-green-600 text-sm font-medium">
                      Email Present
                    </div>
                    <div className="px-3 py-1 rounded-lg bg-green-100 border border-green-400 text-green-600 text-sm font-medium">
                      Phone Present
                    </div>
                    <div className="px-3 py-1 rounded-lg bg-red-100 border border-red-400 text-red-600 text-sm font-medium">
                      LinkedIn Missing
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeAnalysis;
