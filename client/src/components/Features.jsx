import { useState } from 'react';
import { Upload, MessageCircle, AlertTriangle, Award, Activity, Search } from 'lucide-react';

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(null);
  
  const features = [
    {
      id: 'detection',
      icon: <Upload className="h-6 w-6" />,
      title: "AI-Powered Detection",
      description: "Upload dermoscopic images for instant analysis and classification of skin lesions with medical-grade accuracy."
    },
    {
      id: 'assistant',
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Dermatology Assistant",
      description: "Access our advanced AI chatbot trained on dermatological knowledge to answer questions about skin conditions."
    },
    {
      id: 'early',
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Early Detection",
      description: "Identify potential skin cancers in their early stages, significantly improving treatment outcomes."
    },
    {
      id: 'accuracy',
      icon: <Award className="h-6 w-6" />,
      title: "Clinical Accuracy",
      description: "Our algorithm achieves over 95% accuracy, validated against diagnoses from board-certified dermatologists."
    },
    {
      id: 'tracking',
      icon: <Activity className="h-6 w-6" />,
      title: "Condition Tracking",
      description: "Monitor changes in skin lesions over time with our secure image comparison technology."
    },
    {
      id: 'resources',
      icon: <Search className="h-6 w-6" />,
      title: "Educational Resources",
      description: "Access a comprehensive library of dermatological information vetted by medical professionals."
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium mb-3">Our Features</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Discover how our AI-powered platform can help with early skin cancer detection and dermatological guidance</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300 cursor-pointer border-b-2 border-transparent hover:border-emerald-500"
              onMouseEnter={() => setActiveFeature(feature.id)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className={`inline-flex rounded-lg p-3 mb-4 transition-colors duration-300 ${activeFeature === feature.id ? 'bg-emerald-100' : 'bg-slate-50'}`}>
                <div className={`transition-colors duration-300 ${activeFeature === feature.id ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          {/* <button className="bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition duration-200 shadow-md text-sm font-medium">
            Learn More About Our Technology
          </button> */}
        </div>
      </div>
    </div>
  );
}