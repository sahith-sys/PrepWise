import React from "react";

function Hero() {
  return (
    <div className="gradient-bg text-white bg-blue-600 px-10 py-20">
      <div className="container mx-auto text-center max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 lg:py-24">
        <h1 className="text-white md:text-6xl text-4xl font-bold">Ace Your next Tech Interview</h1>
        <p className="text-blue-200 text-md mt-4">
          Get Personalized Interview Questions, Practice Quizzes, and company insights to land your Dream Job.
        </p>
        <div className="mt-8">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-sm font-semibold hover:bg-gray-200 transition duration-300 cursor-pointer">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
