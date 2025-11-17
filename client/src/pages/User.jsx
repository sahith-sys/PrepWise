import axios from "axios";
import React, { useEffect, useState } from "react";
import defaultMale from "../assets/Default-male.png";
import defaultFemale from "../assets/Default-female.png";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";

const sessionData = [
  { name: "Software Engineer", value: 0 },
  { name: "Backend", value: 0 },
  { name: "Frontend", value: 0 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"];

export default function UserDashboard() {
  const [quizData, setQuizData] = useState([
    { name: "Q1", score: 0 },
    { name: "Q2", score: 0 },
    { name: "Q3", score: 0 },
    { name: "Q4", score: 0 },
    { name: "Q5", score: 0 },
  ]);

  const [user, setUser] = useState(null);
  const [quizCount, setQuizCount] = useState(0);
  const [quizPercentChange, setQuizPercentChange] = useState(0);
  const [userAvgScore, setUserAvgScore] = useState(0);
  const [quizScores, setQuizScores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [topRoles, setTopRoles] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    dob: user?.dob || "",
    location: user?.location || "",
    college: user?.college || "",
    degree: user?.degree || "",
    graduationYear: user?.graduationYear || "",

    linkedIn: user?.linkedIn || "",
    github: user?.github || "",
    leetcode: user?.leetcode || "",
    codeforces: user?.codeforces || "",
    codechef: user?.codechef || "",
    portfolio: user?.portfolio || "",

    preferredRole: user?.preferredRole || "",
    skillLevel: user?.skillLevel || "",
    learningMode: user?.learningMode || "Self-study",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        phone: user.phone || "",
        gender: user.gender || "",
        dob: user.dob || "",
        location: user.location || "",
        college: user.college || "",
        degree: user.degree || "",
        graduationYear: user.graduationYear || "",
        linkedIn: user.linkedIn || "",
        github: user.github || "",
        leetcode: user.leetcode || "",
        codeforces: user.codeforces || "",
        codechef: user.codechef || "",
        portfolio: user.portfolio || "",
        preferredRole: user.preferredRole || "",
        skillLevel: user.skillLevel || "",
        learningMode: user.learningMode || "Self-study",
      });
    }
  }, [user]);

  const companyCount = {};
  user?.dsaProgress.forEach((item) => {
    companyCount[item.company] = (companyCount[item.company] || 0) + 1;
  });

  const topCompanies = Object.entries(companyCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([company, count]) => ({
      subject: company,
      value: count,
    }));

  const tagCount = {};
  user?.dsaProgress.forEach((item) => {
    item.tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  const topTags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag, count]) => ({
      subject: tag,
      value: count,
    }));

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      await getUserId();
      await getQuizNumber();
      setIsLoading(false);
    }
    fetchData();
  }, []);

  async function getQuizNumber() {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const resp = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/userDashboard/quizNumber`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.data.success) {
        setQuizCount(resp.data.quizCount);
        setQuizPercentChange(resp.data.change);
        setUserAvgScore(resp.data.userAvgScore);
        setQuizScores(resp.data.quizScores);
        setTopRoles(resp.data.topRoles);
        const updatedQuizData = quizData.map((item, index) => ({
          ...item,
          score: resp.data.quizScores[index] || 0,
        }));
        setQuizData(updatedQuizData);
      }
    } catch (error) {
      console.error("Error fetching quiz number:", error);
      alert("Failed to fetch quiz number. Please try again.");
    }
  }

  async function getUserId() {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const resp = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/userDashboard/userDetails`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.data.success) {
        setUser(resp.data.user);
        console.log("User data:", resp.data.user);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      alert("Failed to fetch user details. Please try again.");
    }
  }

  const handleEdit = () => {
    setIsEditOpen(true);
    console.log(isEditOpen);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    try {
      const resp = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/userDashboard/updateUserDetails`,
        { formData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!resp.data.success) {
        alert(resp.data.message || "Failed to update profile");
      }

      setIsEditOpen(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("There was an error updating your profile.");
    } finally {
      setIsLoading(false);
    }
  };

  /*{
    if (isLoading) {
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>;
    }
  }*/
  {
    /* GLOBAL LOADING OVERLAY */
  }
  {
    isLoading && (
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-[9999]">
        <div className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6 flex gap-3">
      {/* LEFT SECTION - USER PROFILE */}
      <div className="w-1/3 h-fit bg-white rounded-xl p-5 shadow-md">
        <img
          src={user?.gender === "Female" ? defaultFemale : defaultMale}
          alt="user"
          className="w-32 h-32 rounded-full mx-auto object-cover object-top shadow-md p-2"
        />

        <h2 className="text-xl font-semibold text-center mt-4">{user?.name}</h2>
        <p className="text-gray-500 text-center">{user?.jobRole}</p>

        <div className="mt-6 flex justify-between">
          {/* LEFT CARD - ENHANCED PROFILE DETAILS (Paste inside your left card) */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-700">User Details</h3>

            <div className="text-gray-600 space-y-1">
              <p>Email: {user?.email || "—"}</p>
              <p>Phone: {user?.phone || "—"}</p>
              <p>Gender: {user?.gender || "—"}</p>
              <p>
                DOB: {user?.dob ? new Date(user.dob).toLocaleDateString() : "—"}
              </p>
              <p>Location: {user?.location || "—"}</p>
              <p>College: {user?.college || "—"}</p>
              <p>Degree: {user?.degree || "—"}</p>
              <p>Graduation: {user?.graduationYear || "—"}</p>
              <p>
                Member Since:{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "—"}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2 text-gray-700">
                Other Accounts
              </h3>

              <div className="text-gray-600 space-y-1">
                {/* LinkedIn */}
                <p>
                  LinkedIn:{" "}
                  <a
                    href={user?.linkedIn || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-medium ${
                      user?.linkedIn
                        ? "text-blue-600 hover:underline"
                        : "text-gray-500"
                    }`}
                  >
                    {user?.linkedIn ? "View Profile" : "Not Added"}
                  </a>
                </p>

                {/* GitHub */}
                <p>
                  GitHub:{" "}
                  <a
                    href={user?.github || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-medium ${
                      user?.github
                        ? "text-gray-800 hover:underline"
                        : "text-gray-500"
                    }`}
                  >
                    {user?.github ? "Visit Repository" : "Not Added"}
                  </a>
                </p>

                {/* Coding Profiles */}
                <p>
                  LeetCode:{" "}
                  <a
                    href={user?.leetcode || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-medium ${
                      user?.leetcode
                        ? "text-yellow-600 hover:underline"
                        : "text-gray-500"
                    }`}
                  >
                    {user?.leetcode ? "View Profile" : "Not Added"}
                  </a>
                </p>

                <p>
                  Codeforces:{" "}
                  <a
                    href={user?.codeforces || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-medium ${
                      user?.codeforces
                        ? "text-red-600 hover:underline"
                        : "text-gray-500"
                    }`}
                  >
                    {user?.codeforces ? "View Profile" : "Not Added"}
                  </a>
                </p>

                <p>
                  CodeChef:{" "}
                  <a
                    href={user?.codechef || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-medium ${
                      user?.codechef
                        ? "text-purple-600 hover:underline"
                        : "text-gray-500"
                    }`}
                  >
                    {user?.codechef ? "View Profile" : "Not Added"}
                  </a>
                </p>

                {/* Portfolio */}
                <p>
                  Portfolio:{" "}
                  <a
                    href={user?.portfolio || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-medium ${
                      user?.portfolio
                        ? "text-green-600 hover:underline"
                        : "text-gray-500"
                    }`}
                  >
                    {user?.portfolio ? "Open Portfolio" : "Not Added"}
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2 text-gray-700">Preferences</h3>
              <div className="text-gray-600 space-y-1">
                <p>
                  Preferred Role:{" "}
                  <span className="font-medium">
                    {user?.preferredRole || "Not set"}
                  </span>
                </p>
                <p>
                  Skill Level:{" "}
                  <span className="font-medium">
                    {user?.skillLevel || "Not set"}
                  </span>
                </p>
                <p>
                  Learning Mode:{" "}
                  <span className="font-medium">
                    {user?.learningMode || "Self-study"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div onClick={handleEdit} className="cursor-pointer hover:opacity-70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION - DASHBOARD ANALYTICS */}
      <div className="w-2/3 flex flex-col gap-3">
        {/* TOP CARDS */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold">Total Quizzes Attended</h3>
            <p className="text-4xl font-bold mt-2">{quizCount}</p>
            <p className="text-green-600 text-sm mt-1">
              ▲ {quizPercentChange}% more than average
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold">Avg Score</h3>
            <p className="text-4xl font-bold mt-2">{userAvgScore}</p>
            {userAvgScore >= 7 ? (
              <p className="text-green-600 text-sm mt-1">▲ On Track</p>
            ) : (
              <p className="text-red-600 text-sm mt-1">▼ Need Improvement</p>
            )}
          </div>
        </div>

        {/* BAR CHART + PIE CHART SECTION */}
        <div className="bg-white p-6 rounded-xl shadow-md flex justify-center gap-20">
          {/* LEFT SIDE — BAR CHART */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">
              Scores of Last 5 Quizzes
            </h3>

            <BarChart width={450} height={250} data={quizData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="score">
                {quizData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                      ][index % 5]
                    }
                    stroke={
                      [
                        "rgb(255, 99, 132)",
                        "rgb(255, 159, 64)",
                        "rgb(75, 192, 192)",
                        "rgb(54, 162, 235)",
                        "rgb(153, 102, 255)",
                      ][index % 5]
                    }
                    strokeWidth={1}
                  />
                ))}
              </Bar>
            </BarChart>
          </div>

          {/* RIGHT SIDE — PIE CHART */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Top Targeted Roles</h3>
            <PieChart width={300} height={250}>
              <Pie
                data={topRoles.length > 0 ? topRoles : sessionData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {topRoles.length > 0
                  ? topRoles.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))
                  : sessionData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
        {/* RADAR CHART SECTION */}
        <div className="bg-white p-6 rounded-xl shadow-md flex justify-center gap-20">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              DSA Skill Radar Overview
            </h3>

            <RadarChart
              cx={200}
              cy={150}
              outerRadius={110}
              width={400}
              height={300}
              data={topTags}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar
                name="Topic Analysis"
                dataKey="value"
                stroke="rgb(54, 162, 235)"
                fill="rgba(54, 162, 235, 0.3)"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Top Companies Questions Practiced
            </h3>

            <RadarChart
              cx={200}
              cy={150}
              outerRadius={110}
              width={400}
              height={300}
              data={topCompanies}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar
                name="No. of Questions"
                dataKey="value"
                stroke="rgb(54, 162, 235)"
                fill="rgba(54, 162, 235, 0.3)"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </div>
        </div>
      </div>

      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* BACKDROP (clickable) */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsEditOpen(false)}
          ></div>

          {/* MODAL CARD */}
          <div className="relative z-50 bg-white w-[600px] max-h-[90vh] overflow-y-auto rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

            {/* FORM */}
            <div className="grid grid-cols-2 gap-4">
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border p-2 rounded"
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="border p-2 rounded"
              />
              <input
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                placeholder="Gender"
                className="border p-2 rounded"
              />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="border p-2 rounded"
              />
              <input
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="College"
                className="border p-2 rounded"
              />
              <input
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                placeholder="Degree"
                className="border p-2 rounded"
              />
              <input
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                placeholder="Graduation Year"
                className="border p-2 rounded"
              />

              <input
                name="linkedIn"
                value={formData.linkedIn}
                onChange={handleChange}
                placeholder="LinkedIn URL"
                className="border p-2 rounded col-span-2"
              />
              <input
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="GitHub URL"
                className="border p-2 rounded col-span-2"
              />
              <input
                name="leetcode"
                value={formData.leetcode}
                onChange={handleChange}
                placeholder="LeetCode URL"
                className="border p-2 rounded col-span-2"
              />
              <input
                name="codeforces"
                value={formData.codeforces}
                onChange={handleChange}
                placeholder="Codeforces URL"
                className="border p-2 rounded col-span-2"
              />
              <input
                name="codechef"
                value={formData.codechef}
                onChange={handleChange}
                placeholder="CodeChef URL"
                className="border p-2 rounded col-span-2"
              />
              <input
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="Portfolio Website"
                className="border p-2 rounded col-span-2"
              />

              <input
                name="preferredRole"
                value={formData.preferredRole}
                onChange={handleChange}
                placeholder="Preferred Role"
                className="border p-2 rounded col-span-2"
              />
              <input
                name="skillLevel"
                value={formData.skillLevel}
                onChange={handleChange}
                placeholder="Skill Level"
                className="border p-2 rounded col-span-2"
              />
              <input
                name="learningMode"
                value={formData.learningMode}
                onChange={handleChange}
                placeholder="Learning Mode"
                className="border p-2 rounded col-span-2"
              />
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
