import React from "react";
import google from "../assets/google.png";
import microsoft from "../assets/microsoft.png";
import amazon from "../assets/amazon.png";
import facebook from "../assets/facebook.png";
import apple from "../assets/apple.png";
import netflix from "../assets/netflix.png";
function CTA() {
  return (
    <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md py-15">
      <div className="container mx-auto py-7 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 items-center">
          <div>
            <h2 className="text-4xl font-bold">
              Ready to ace your next interview?
            </h2>
            <p className="mt-4 text-white/90">
              Join thousands of successful candidates who landed jobs at top tech companies with our platform.
            </p>
            <button className=" mr-4 mt-6 bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition">
              Get Started
            </button>
            <button className="mt-6 bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg hover:bg-blue-800 transition">
              Watch Demo
            </button>
          </div>

          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Most Popular Companies</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Company Item */}
              {[
                { name: "Google", img: google },
                { name: "Microsoft", img: microsoft },
                { name: "Amazon", img: amazon },
                { name: "Facebook", img: facebook },
                { name: "Apple", img: apple },
                { name: "Netflix", img: netflix },
              ].map((company, index) => (
                <div key={index} className="bg-gray-200 p-2 rounded flex items-center gap-2">
                  <div className="w-8 h-8 overflow-hidden">
                    <img src={company.img} alt={company.name} className="w-full h-full object-contain" />
                  </div>
                  <span className="font-medium">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CTA;
