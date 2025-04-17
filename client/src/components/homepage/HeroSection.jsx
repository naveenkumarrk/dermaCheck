import React from "react";
import { BarChart, CheckCircle, ListOrdered } from "lucide-react"; // Importing Lucide React icons

const HeroSection = () => {
  return (
    <div className="py-2">
      {/* Main bento grid layout */}
      <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row gap-2 h-98 mb-90 sm:mb-2 md:mb-2 lg:mb-2 ">
        {/* First featured box */}
        <div className="flex-1 bg-white rounded-4xl p-6 flex flex-col">
          <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-indigo-800">
            Detect Skin Cancer <br /> with AI-Powered Analysis
          </h1>
          <p className="text-indigo-600 my-5">
            Upload an image of a skin lesion to receive instant AI-driven predictions
            and take proactive steps toward your health.
          </p>
          <div className="flex items-center">
            <a href="/dashboard">
              <button className="bg-lime-300 text-black font-medium rounded-full px-4 py-2 mr-2 hover:bg-lime-600">
                Try Now
              </button>
            </a>
            <button className="bg-black text-white p-2 rounded-full">
              <ArrowIcon />
            </button>
          </div>
        </div>

        {/* Second featured box */}
        <div className="flex-1 md:col-span-2 md:row-span-2 bg-white rounded-4xl p-6 flex flex-col gap-10">
          <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-indigo-800">About Our Platform</h1>
          <p className="text-indigo-600 mt-4">
            Our AI-powered system helps in the <strong>early detection of skin cancer</strong> by analyzing images of skin lesions. 
            Using deep learning, we provide insights into potential skin conditions, helping individuals seek timely 
            medical advice.
          </p>
        </div>
      </div>

      {/* Second row with 3 equal sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {/* Feature: AI-Powered Detection */}
        <div className="bg-white rounded-4xl h-60 p-6">
          <div className="flex items-center gap-2">
            <BarChart className="text-purple-800 w-6 h-6" />
            <h3 className="text-lg font-semibold text-purple-800">AI-Powered Detection</h3>
          </div>
          <p className="mt-3 text-purple-600">
            Upload an image, and our <strong>AI model</strong> will analyze it to detect <strong>potential skin abnormalities</strong> with 
            high accuracy.
          </p>
        </div>

        {/* Feature: Instant Analysis */}
        <div className="bg-white rounded-4xl h-60 p-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-800 w-6 h-6" />
            <h3 className="text-lg font-semibold text-green-800">Instant Analysis</h3>
          </div>
          <p className="mt-3 text-green-600">
            Get <strong>real-time results</strong> on whether the detected lesion could be benign or malignant, helping 
            you take <strong>quick action</strong>.
          </p>
        </div>

        {/* Feature: Medical Guidance Support */}
        <div className="bg-white rounded-4xl h-60 p-6">
          <div className="flex items-center gap-2">
            <ListOrdered className="text-blue-800 w-6 h-6" />
            <h3 className="text-lg font-semibold text-blue-800">Medical Guidance</h3>
          </div>
          <p className="mt-3 text-blue-600">
            While our AI provides <strong>predictions</strong>, we encourage users to <strong>consult dermatologists</strong> for 
            professional diagnosis and treatment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);
