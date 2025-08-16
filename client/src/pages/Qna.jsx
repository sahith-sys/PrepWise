import React, { useState } from "react";

function Qna() {
  const [opencard, setOpenCard] = useState(false);

  return (
    <div className="min-h-screen border relative">
      {opencard && (
        <div className="absolute z-10 w-full h-full border bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4">
              Select the topics you want to practice:
            </h2>
            {/*topic selection UI here */}
            <button
              onClick={() => setOpenCard(false)}
              className="mt-4 text-sm text-blue-500 underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="">
        <div className="flex flex-col items-center justify-center bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-blue-600 text-center my-8">
            Generate Customised Sessions with your topics
          </h1>
          <p className="text-lg text-gray-600 text-center">
            Select your topics and let us create a personalized learning
            experience for you.
          </p>
          <div className="flex flex-row items-center justify-center mt-8 space-x-4">
            <button
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
              onClick={() => setOpenCard(true)}
            >
              Generate Session
            </button>
            <button className="mt-4 bg-red-600 text-white py-2 px-4 rounded">
              Delete Sessions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Qna;
