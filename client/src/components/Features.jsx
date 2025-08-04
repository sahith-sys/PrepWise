import React from "react";
import { MessageCircleQuestionMark, Clock, FileUser } from "lucide-react";
function Features() {
  const features = [
    {
      icon: <MessageCircleQuestionMark />,
      title: "Tailored Questions",
      description: "Get questions tailored to your skills and experience.",
    },
    {
      icon: <Clock />,
      title: "Interactive Quizzes",
      description: "Test your knowledge with timed quizzes that simulate real interview conditions and provide detailed explanations.",
    },
    {
      icon: <FileUser />,
      title: "AI Resume Builder",
      description: "Create a professional resume tailored to your target role, with AI-powered suggestions for improvement.",
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-lg text-blue-600 font-semibold text-center">
        Features
      </h2>
      <h1 className="text-3xl font-bold text-center my-3">
        Everything to Ace Your next Tech Interview
      </h1>
      <p className="text-center text-gray-600 text-xl">
        Our platform provides comprehensive tools to prepare for <br />{" "}
        technical interviews at top tech companies.
      </p>
      <div className="my-10 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
        {features.map((feature) => (
          <div className="feature-item" key={feature.title}>
            <div className="icon">{feature.icon}</div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="mt-2 text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
