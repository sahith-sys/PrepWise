import React from "react";
import { UserPlus2, BriefcaseBusiness, BookOpenCheck } from "lucide-react";
function Steps() {
  const steps = [
    {
      title: "Create Your Profile",
      description:
        "Sign up and create a profile to get personalized interview questions and resources.",
      icon: <UserPlus2 />,
      iconColor: "#3B82F6",
    },
    {
      title: "Select Your Goal",
      description:
        "Choose your target role or dream company to receive tailored preparation content.",
      icon: <BriefcaseBusiness />,
      iconColor: "#10B981",
    },
    {
      title: "Start Practicing",
      description:
        "Get instant access to mock interviews, quizzes, and real-world questions to sharpen your skills.",
      icon: <BookOpenCheck />,
      iconColor: "#F59E0B",
    },
  ];

  return (
    <div className="mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center my-3">How it Works</h2>
        <p className="text-center text-gray-600 text-xl mb-8">
          Follow these simple steps to get started with your interview preparation.
        </p>
        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex my-6 items-center space-x-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div
                className="icon p-3 rounded-md text-3xl text-white mr-4"
                style={{ backgroundColor: step.iconColor }}
              >
                {step.icon}
              </div>
              <div>
                <h3 className="md:text-xl text-lg font-semibold">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Steps;
