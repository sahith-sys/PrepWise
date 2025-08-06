import React from "react";
import { Star } from "lucide-react";
import { FaStar } from "react-icons/fa";
function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      designation: "Software Engineer at Google",
      review:
        "InterviewPrep Pro helped me crack the Google interview with their company-specific questions and mock interviews. The system design questions were particularly helpful and very similar to what I was asked in the actual interview.",
      rating: 5,
    },
    {
      name: "John Doe",
      image:
        "https://www.cecyteo.edu.mx/Nova/App_themes/Site2015/assets/admin/pages/media/profile/profile_user.jpg",
      designation: "Data Scientist at Facebook",
      review:
        "The analytics feature showed me exactly which topics Facebook focuses on in their interviews. The personalized questions helped me to prioritize my studying and ended up getting offers from both Facebook and Amazon!",
      rating: 5,
    },
    {
      name: "David Rodriguez",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      designation: "Senior Engineer at Amazon",
      review:
        "After 5 years at a startup, I needed to brush up on my algorithms for Amazon interviews. The quizzes and progress tracking helped me identify weak areas and improve quickly. Got the offer with a 40% salary increase!",
      rating: 4,
    },
  ];

  return (
    <div className="mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-center text-lg text-blue-600 font-semibold mb-4">
          Testimonials
        </h1>
        <h1 className="text-center font-bold text-3xl mb-8">
          What our users say about us
        </h1>
        <div className="flex items-center justify-center gap-4 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-lg mb-6 w-full"
            >
              <div className="flex items-center gap-4 mr-4">
                <div className="w-15 h-15 rounded-full overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-md font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">
                    {testimonial.designation}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-700">{testimonial.review}</p>
              </div>
              <div className="mt-4 flex items-center gap-1">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                <div key={i} className="text-yellow-500">
                  <FaStar size={20} strokeWidth={0.5} />
                </div>
              ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
