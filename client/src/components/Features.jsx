import React from "react";
import { MessageCircleQuestionMark, Clock, FileUser, SearchCheck, BrainCircuit, Laptop2} from "lucide-react";
function Features() {
  const features = [
    {
      icon: <MessageCircleQuestionMark />,
      iconColor: "#3B82F6",
      title: "Tailored Questions",
      description:
        "Get tailored questions based on the topics and company you're interviewing with, including actual questions reported by candidates.",
    },
    {
      icon: <Clock />,
      iconColor: "#22C55E",
      title: "Interactive Quizzes",
      description:
        "Test your knowledge with timed quizzes that simulate real interview conditions and provide detailed explanations.",
    },
    {
      icon: <FileUser />,
      iconColor: "#A855F7",
      title: "AI Resume Builder",
      description:
        "Create a professional resume tailored to your target role, with AI-powered suggestions for improvement.",
    },
    {
      icon: <SearchCheck />,
      iconColor: "#F97316",
      title: "Company Insights",
      description:
        "Access curated insights about the company’s interview process, values, and most frequently asked questions to prepare smarter.",
    },
    {
      icon: <BrainCircuit />,
      iconColor: "#EF4444",
      title: "Behavioral Prep",
      description:
        "Practice answering behavioral questions with AI feedback that helps you improve structure, clarity, and confidence.",
    },
    {
      icon: <Laptop2 />,
      iconColor: "#0EA5E9",
      title: "Mock Interviews",
      description:
        "Schedule mock interviews with peers or AI to simulate real-world interviews and get instant performance feedback.",
    },
  ];

  return (
    <div className="mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-lg text-blue-600 font-semibold text-center">
          Features
        </h2>
        <h1 className="md:text-3xl text-2xl font-bold text-center my-3">
          Everything to Ace Your next Tech Interview
        </h1>
        <p className="text-center text-gray-600 md:text-xl text-md mb-8">
          Our platform provides comprehensive tools to prepare for
          technical interviews at top tech companies.
        </p>
        <div className="my-10 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              className="feature-item bg-white p-7 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              key={feature.title}
            >
              <div
                className="icon p-3 rounded-md text-3xl text-white mb-4"
                style={{ backgroundColor: `${feature.iconColor}` }}
              >
                {feature.icon}
              </div>
              <h3 className="md:text-xl text-lg mt-5 font-semibold">{feature.title}</h3>
              <p className="mt-2 text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;
