import React from "react";
import axios from "axios";
import { useState } from "react";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/login`,{
        email,
        password
      });
      if(resp.status === 200) {
        console.log("Login successful", resp.data);
        localStorage.setItem("token",resp.data.token);
        localStorage.setItem("user", JSON.stringify(resp.data.user));
        window.location.href = "/";
      }
      else{
        console.error("Login failed",resp.data.message);
        alert("Login failed: " + resp.data.message);
      }
    } catch (error) {
      console.error("Login failed",error);
      alert(error.response?.data?.message || "Something went wrong. Try again!");
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen bg-gray-100 min-w-full">
      <form
        className="flex flex-col p-6 bg-white rounded shadow-md min-w-[400px]"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-lg font-semibold">Login</h2>
        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e)=> {setPassword(e.target.value)}}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-4 p-2 bg-blue-600 text-white rounded cursor-pointer"
        >
          Login
        </button>
        <div>
          <p className="mt-4 text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Signup
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
