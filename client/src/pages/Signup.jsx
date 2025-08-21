import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/signup`,
        {
          name,
          email,
          password,
        }
      );
      if (resp.data.success) {
        console.log("Signup successful", resp.data);
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("user", JSON.stringify(resp.data.user));
        navigate("/");
      } else {
        alert("SignUp failed:" + resp.data.message);
      }
    } catch (error) {
      console.error("SignUp Failed", error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen bg-gray-100 min-w-full">
      <form
        className="flex flex-col p-6 bg-white rounded shadow-md min-w-[400px]"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-lg font-semibold">Signup</h2>
        <div className="mb-4">
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`mt-4 p-2 text-white rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
          }`}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        <div>
          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
