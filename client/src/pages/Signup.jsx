import React from 'react'



function Signup() {

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Form submitted");
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
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-600 text-white rounded cursor-pointer"
        >
          Signup
        </button>
        <div>
          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Signup