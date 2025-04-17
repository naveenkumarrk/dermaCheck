import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Upload, MessageCircle, AlertTriangle, ChevronRight, Send, X, Image, RefreshCw, User, Bot } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL;

const ChatbotInterface = ({ condition }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatMode, setChatMode] = useState("basic"); // "basic" or "advanced"
  const endOfMessagesRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Add initial welcome message
  useEffect(() => {
    let welcomeMessage = {
      sender: "bot",
      text: "Hello! I'm your dermatology assistant. How can I help you today?",
      additionalInfo: [
        "I can answer questions about skin conditions and provide general skin health advice.",
        "For proper diagnosis, always consult with a qualified healthcare professional."
      ]
    };

    // If condition is provided, add condition-specific welcome message
    if (condition) {
      // Send request to get initial message for the condition
      const formData = new FormData();
      formData.append("message", "hello");
      formData.append("condition", condition);
      
      axios.post(`${API_URL}/chat`, formData)
        .then(response => {
          welcomeMessage = {
            sender: "bot",
            text: response.data.response,
            additionalInfo: response.data.additional_info || []
          };
          setMessages([welcomeMessage]);
        })
        .catch(() => {
          // Fall back to generic welcome message
          setMessages([welcomeMessage]);
        });
    } else {
      setMessages([welcomeMessage]);
    }
  }, [condition]);

  // Scroll to bottom of messages
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    
    // Add user message to chat
    setMessages(prev => [...prev, { sender: "user", text: userMessage }]);
    
    // Show typing indicator
    setLoading(true);
    
    try {
      const formData = new FormData();
      // Choose endpoint and parameter based on chat mode
      const endpoint = chatMode === "basic" ? "/chat" : "/ask-dermatologist";
      
      if (chatMode === "basic") {
        formData.append("message", userMessage);
      } else {
        formData.append("question", userMessage);  // Use "question" for the ask-dermatologist endpoint
      }
      
      if (condition) {
        formData.append("condition", condition);
      }
      
      const response = await axios.post(`${API_URL}${endpoint}`, formData);
      
      // Add bot response to chat
      setMessages(prev => [...prev, {
        sender: "bot",
        text: response.data.response,
        additionalInfo: response.data.additional_info || []
      }]);
    } catch (error) {
      // Handle error
      setMessages(prev => [...prev, {
        sender: "bot",
        text: "I'm sorry, I encountered an error processing your request.",
        additionalInfo: ["Please try again later."]
      }]);
    } finally {
      setLoading(false);
    }
  };

  const toggleChatMode = () => {
    const newMode = chatMode === "basic" ? "advanced" : "basic";
    setChatMode(newMode);
    
    // Add a message about the mode change
    const modeMessage = {
      sender: "bot",
      text: newMode === "advanced" 
        ? "Switching to advanced mode. I'll now provide more personalized responses to your questions." 
        : "Switching to basic mode. I'll provide general information about common skin health topics.",
      additionalInfo: []
    };
    
    setMessages(prev => [...prev, modeMessage]);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <h3 className="font-medium">Dermatology Assistant</h3>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-white bg-opacity-20 rounded-full p-1">
              <button 
                onClick={() => chatMode !== "basic" && toggleChatMode()}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  chatMode === "basic" 
                    ? "bg-white text-teal-700 font-medium" 
                    : "text-white hover:bg-white hover:bg-opacity-10"
                }`}
              >
                Basic
              </button>
              <button 
                onClick={() => chatMode !== "advanced" && toggleChatMode()}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  chatMode === "advanced" 
                    ? "bg-white text-teal-700 font-medium" 
                    : "text-white hover:bg-white hover:bg-opacity-10"
                }`}
              >
                Advanced
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat messages */}
      <div 
        ref={messagesContainerRef}
        className="flex-grow overflow-y-auto p-5 bg-slate-50"
      >
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "bot" && (
                <div className="flex items-start mr-2">
                  <div className="bg-emerald-100 rounded-full p-2 flex-shrink-0">
                    <Bot className="h-4 w-4 text-emerald-600" />
                  </div>
                </div>
              )}
              
              <div className={`max-w-xs md:max-w-md rounded-2xl px-4 py-3 ${
                message.sender === "user" 
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm" 
                  : "bg-white border border-gray-100 text-gray-700 shadow-sm"
              }`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                
                {/* Additional info bullets */}
                {message.additionalInfo && message.additionalInfo.length > 0 && (
                  <div className={`mt-3 pt-3 border-t ${
                    message.sender === "user" ? "border-teal-400 border-opacity-20" : "border-gray-100"
                  }`}>
                    <ul className={`text-xs space-y-2 ${
                      message.sender === "user" ? "text-teal-50" : "text-gray-500"
                    }`}>
                      {message.additionalInfo.map((info, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 mt-1 text-xs">•</span>
                          <span>{info}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {message.sender === "user" && (
                <div className="flex items-start ml-2">
                  <div className="bg-teal-500 rounded-full p-2 flex-shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Loading indicator */}
        {loading && (
          <div className="flex items-center mt-4">
            <div className="flex items-center bg-white rounded-full p-2 mr-2">
              <Bot className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="bg-gray-100 rounded-xl py-2 px-3 text-gray-500 text-sm flex items-center">
              <div className="typing-indicator flex mr-2">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="text-xs">Thinking...</span>
            </div>
          </div>
        )}
        
        {/* Invisible element to scroll to */}
        <div ref={endOfMessagesRef} />
      </div>
      
      {/* Message input */}
      <div className="border-t border-gray-100 bg-white p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <div className="relative flex-grow">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={loading}
              placeholder="Ask me about skin health..."
              className="w-full px-4 py-3 pr-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            {inputValue && (
              <button
                type="button"
                onClick={() => setInputValue("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={loading || !inputValue.trim()}
            className="px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition-all"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        
        <div className="mt-2 text-xs text-gray-400 italic px-1">
          {chatMode === "basic" 
            ? "Basic mode provides general information about common skin health topics." 
            : "Advanced mode uses AI to provide more detailed, personalized responses to your specific questions."}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);

  const handleFileUpload = async (file) => {
    if (!file) return;
  
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
  
    if (!allowedExtensions.includes(fileExtension)) {
      setError("Please upload a JPG, JPEG, or PNG file");
      setImagePreview(null);
      return;
    }
  
    setFileName(file.name);
    setImagePreview(URL.createObjectURL(file)); // Preview
    const formData = new FormData();
    formData.append("file", file);
  
    setLoading(true);
    setError(null);
    setPrediction(null);
  
    try {
      // Step 1: Upload to FastAPI for prediction
      const fastapiRes = await axios.post(`${API_URL}/predict`, formData);
      setPrediction(fastapiRes.data);
  
      // Step 2: Upload to Node API to store image info (auth required)
      const token = localStorage.getItem("token"); // or useContext/Auth hook
      await axios.post(`${import.meta.env.BACKEND_API_URL}/api/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
  
      setShowChatbot(true);
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to process image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    if (file) handleFileUpload(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };
  
  const useSampleImage = async () => {
    setLoading(true);
    setError(null);
    setPrediction(null);
    setImagePreview(null); // Clear existing preview
  
    try {
      const response = await axios.post(`${API_URL}/use-sample`);
      setPrediction(response.data);
  
      // Set sample image preview
      setImagePreview("/sample.jpg"); // Update path to match the frontend's public assets
      
      // Show the chatbot after successful sample prediction
      setShowChatbot(true);
    } catch (err) {
      setError("Failed to load sample image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light mb-2 tracking-tight">
            <span className="text-emerald-600 font-medium">Derma</span>Detect
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Upload your dermoscopic images for advanced AI-powered skin cancer detection and get personalized advice
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left side - Image Upload */}
          <div className="flex flex-col h-full">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-full flex flex-col">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white p-4">
                <div className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <h3 className="font-medium">Upload & Analyze</h3>
                </div>
              </div>
              
              <div className="p-6 flex-grow">
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 transition-all h-64 flex flex-col items-center justify-center
                    ${dragActive ? "border-emerald-500 bg-emerald-50" : "border-gray-200 hover:border-emerald-300"}
                    ${loading ? "opacity-60" : ""}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="bg-emerald-100 p-4 rounded-full mb-4">
                      <Image className="w-10 h-10 text-emerald-600" />
                    </div>
                    <p className="mb-2 text-sm font-medium text-gray-700">
                      <span className="text-emerald-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">JPG, JPEG, or PNG dermoscopic images</p>

                    {fileName && (
                      <div className="mt-3 text-xs bg-emerald-50 text-emerald-700 py-1 px-3 rounded-full">
                        {fileName}
                      </div>
                    )}

                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleInputChange}
                      disabled={loading}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                
                {/* Sample Button */}
                <div className="mt-4">
                  <button
                    onClick={useSampleImage}
                    disabled={loading}
                    className="w-full px-4 py-3 text-sm font-medium text-emerald-600 
                            bg-emerald-50 rounded-lg hover:bg-emerald-100 border border-emerald-100
                            focus:outline-none focus:ring-2 focus:ring-offset-2 
                            focus:ring-emerald-500 disabled:opacity-50 transition-colors"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      {loading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Image className="h-4 w-4" />
                          <span>Use Sample Image</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="mt-6">
                    <p className="text-sm font-medium text-gray-700 mb-2">Image Preview</p>
                    <div className="border border-gray-100 rounded-lg p-2 bg-gray-50 flex justify-center">
                      <img
                        src={imagePreview}
                        alt="Uploaded Preview"
                        className="max-w-full h-auto max-h-64 rounded-lg"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Prediction Result */}
              {prediction && (
                <div className="p-5 border-t border-gray-100">
                  <h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
                    <AlertTriangle className="h-4 w-4 text-emerald-600 mr-2" />
                    Detection Results
                  </h3>
                  <div className="p-4 bg-emerald-50 text-emerald-700 rounded-lg text-sm mb-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Prediction:</span>
                      <span className="text-emerald-800 font-semibold">{prediction.description}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Condition:</span>
                      <span className="font-medium bg-emerald-100 px-2 py-1 rounded text-xs">{prediction.class_name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Confidence:</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-emerald-600 h-2 rounded-full" 
                            style={{ width: `${prediction.confidence * 100}%` }}
                          ></div>
                        </div>
                        <span>{(prediction.confidence * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="px-5 pb-5">
                  <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-start">
                    <X className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right side - Chatbot */}
          <div className="flex flex-col h-full">
            {showChatbot && prediction ? (
              <ChatbotInterface condition={prediction.class_name} />
            ) : (
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-full flex flex-col">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white p-4">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5" />
                    <h3 className="font-medium">Dermatology Assistant</h3>
                  </div>
                </div>
                
                <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
                  <div className="bg-gray-50 p-5 rounded-full mb-4">
                    <MessageCircle className="h-10 w-10 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Chat with our AI Assistant</h3>
                  <p className="text-gray-500 max-w-sm mb-6">
                    Upload an image first to get personalized advice about the detected skin condition
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-500 max-w-md">
                    <p className="flex items-center mb-3">
                      <ChevronRight className="h-4 w-4 mr-2 text-emerald-500" />
                      Ask questions about skin conditions
                    </p>
                    <p className="flex items-center mb-3">
                      <ChevronRight className="h-4 w-4 mr-2 text-emerald-500" />
                      Get treatment recommendations
                    </p>
                    <p className="flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2 text-emerald-500" />
                      Learn about preventative measures
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* CSS for typing indicator */}
      <style jsx>{`
        .typing-indicator span {
          height: 6px;
          width: 6px;
          background: #10b981;
          border-radius: 50%;
          display: block;
          margin: 0 2px;
          opacity: 0.4;
          animation: typing 1s infinite ease-in-out;
        }
        .typing-indicator span:nth-child(1) {
          animation-delay: 0s;
        }
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes typing {
          0% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0.4; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;