import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import home1 from '../assets/home3.png';
import Chatbot from '../pages/Chatbot';

const Headers = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleAppointmentClick = () => {
    navigate(isLoggedIn ? '/doctors' : '/login-register');
  };

  const handleEmergencyClick = () => {
    navigate(isLoggedIn ? '/emergency' : '/login-register');
  };

  const toggleChatbot = () => {
    setIsChatbotOpen((prev) => !prev);
  };

  // 🔹 Auto-trigger chatbot every 45 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsChatbotOpen(true); // Open chatbot automatically
    }, 45000); // 45 sec = 45000 ms

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div className="w-full min-h-[45vh] mx-auto bg-b3d8e4-gradient flex flex-col lg:flex-row items-center justify-between ">
      {/* Left Content */}
      <div className="w-full lg:w-3/4 mb-6 lg:mb-0 text-center lg:text-left lg:pl-12 xl:pl-28 2xl:pl-24 3xl:pl-36 lg:pr-8">
        <h1 className="text-4xl font-bold text-custom-blue mb-2">
          Welcome to OneStep Medi
        </h1>
        <h1 className="text-3xl font-bold text-custom-blue mb-4">
          Your all-in-one healthcare services
        </h1>
        <p className="text-custom-blue font-bold text-sm mb-4">
          We bring medical care to your fingertips, including online and in-clinic doctor appointments, diagnostics, and more..!
        </p>
        <p className="text-custom-blue font-bold text-sm mb-6">
          Find Your Trusted Doctor In Just One Step – Only At OneStep Medi.
        </p>
        <div className="flex justify-center lg:pl-20 gap-4">
          <button
            onClick={handleAppointmentClick}
            className="px-4 py-2 bg-custom-blue text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300"
          >
            Video Consultation →
          </button>
          <button
            onClick={handleEmergencyClick}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-xl border-2 border-red-700 hover:bg-red-600 hover:scale-105 transition-all duration-300 animate-pulse flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16v-4m0-4V6"
              />
            </svg>
            Emergency
          </button>
          <button
            onClick={toggleChatbot}
            className="px-4 py-2 bg-custom-blue text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300"
          >
            Help? →
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full lg:w-[50%] flex justify-center mt-4 lg:mt-0">
        <img
          src={home1}
          alt="Healthcare"
          className="w-full max-w-lg h-auto max-h-[50vh]"
        />
      </div>

      {/* Render Chatbot */}
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </div>
  );
};

export default Headers;