import React from "react";
import { useState } from "react";
import { Upload, FileText, Download } from "react-feather";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ResumeAnalysis() {
  const [resume, setResume] = useState(null);
  const [score, setScore] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setResume(file);
    // TODO: send to backend for parsing + scoring
    setScore(85); // mock score
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
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
      {resume && (
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
            <div className="flex flex-col items-center justify-center">
              <h3 className="font-medium">ATS Score</h3>
              <div className="w-24 h-24 flex items-center justify-center rounded-full border-4 border-green-500 mt-3">
                <span className="text-xl font-bold text-green-600">
                  {score}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Insights */}
      {score && (
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-6 text-sm">
            <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition">
              <h2 className="text-xl font-semibold mb-4 text-green-600">
                Strengths
              </h2>
              <ul className="list-disc ml-4 text-gray-700 text-sm sm:text-base">
                <li>Clear skills section</li>
                <li>Good tech stack coverage</li>
                <li>Clear skills section</li>
                <li>Good tech stack coverage</li>
                <li>Clear skills section</li>
                <li>Good tech stack coverage</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition">
              <h2 className="font-semibold mb-4 text-xl text-yellow-600">
                ⚠️ Weaknesses
              </h2>
              <ul className="list-disc ml-4 text-gray-700 text-sm sm:text-base">
                <li>Missing keywords for job role</li>
                <li>No measurable achievements</li>
                <li>Missing keywords for job role</li>
                <li>No measurable achievements</li>
                <li>Missing keywords for job role</li>
                <li>No measurable achievements</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition">
              <h2 className="font-semibold mb-4 text-xl text-blue-600">
                💡 Suggestions
              </h2>
              <ul className="list-disc ml-4 text-gray-700 text-sm sm:text-base">
                <li>Add action verbs in experience</li>
                <li>Include certifications</li>
                <li>Add action verbs in experience</li>
                <li>Include certifications</li>
                <li>Add action verbs in experience</li>
                <li>Include certifications</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              <Download className="w-4 h-4" /> Download Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeAnalysis;
