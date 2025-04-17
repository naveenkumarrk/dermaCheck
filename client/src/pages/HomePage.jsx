import React from 'react';
import { Link } from 'react-router-dom';
import Features from '../components/Features';

const HomePage = () => {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white mt-[-4em]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
                Advanced Skin Analysis Technology
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Early Detection, <br/>
                <span className="text-emerald-500">Better Protection</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
                SkinCheck uses advanced AI to accurately detect and classify potential skin cancers from dermoscopic images, providing you with professional-level insights.
              </p>
            </div>
            
            <div className="md:w-1/2 relative">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <div className="aspect-w-4 aspect-h-3">
                  <img 
                    src="/doc_image.avif" 
                    alt="SkinCheck AI Analysis" 
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">98.5% Accuracy</p>
                    <p className="text-xs text-gray-500">In clinical testing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badge Section */}
      {/* <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Trusted By Leading Institutions</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex justify-center items-center">
                <div className="h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300">
                  <img src={`/api/placeholder/120/48`} alt={`Partner ${item}`} className="h-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Features Component */}
      <Features />

      {/* How It Works */}
      <section className="py-16 bg-gray-50 mb-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How SkinCheck Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A simple three-step process to get professional-level skin analysis from the comfort of your home
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Upload Dermoscopic Image",
                description: "Take or upload a high-quality image of the concerning skin area",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: "AI Analysis",
                description: "Our advanced AI analyzes the image and compares it with our extensive database",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: "Get Expert Insights",
                description: "Receive detailed analysis and consult our AI dermatologist for more information",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                )
              }
            ].map((step, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <div className="text-indigo-700">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 bg-gradient-to-r from-emerald-600 to-teal-500">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <svg className="absolute left-0 transform -translate-y-1/4" width="800" height="800" fill="none" viewBox="0 0 800 800">
            <circle cx="400" cy="400" r="400" fill="white" fillOpacity="0.1" />
            <circle cx="400" cy="400" r="300" stroke="white" strokeWidth="2" strokeOpacity="0.2" />
            <circle cx="400" cy="400" r="200" stroke="white" strokeWidth="2" strokeOpacity="0.3" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to protect your skin?</h2>
            <p className="text-lg text-indigo-100 mb-8">
              Join thousands who trust SkinCheck for early detection and expert skincare advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 text-base font-medium rounded-lg bg-white text-red-700 hover:bg-indigo-50 transition duration-300 ease-in-out shadow-md">
                Start Your Analysis
              </button>
              <button className="px-8 py-3 text-base font-medium rounded-lg border border-indigo-300 text-white hover:bg-gray-800 transition duration-300 ease-in-out">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;