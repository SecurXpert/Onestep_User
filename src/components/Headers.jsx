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

  const toggleChatbot = () => setIsChatbotOpen((prev) => !prev);

  // Auto-trigger chatbot every 45 seconds (kept as-is)
  useEffect(() => {
    const interval = setInterval(() => setIsChatbotOpen(true), 45000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-b3d8e4-gradient">
      {/* Content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-8 sm:py-10 lg:py-12">
        {/* Grid: stack on mobile, 2 columns on lg+ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left: Copy + CTA */}
          <div className="lg:col-span-7 2xl:col-span-7 text-center lg:text-left">
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold tracking-tight text-custom-blue">
                Welcome to OneStep Medi
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-custom-blue">
                Your all-in-one healthcare services
              </h2>
              <p className="text-custom-blue font-semibold text-xs sm:text-sm md:text-base">
                We bring medical care to your fingertips, including online and in-clinic doctor appointments,
                diagnostics, and more..!
              </p>
              <p className="text-custom-blue font-semibold text-xs sm:text-sm md:text-base">
                Find Your Trusted Doctor In Just One Step – Only At OneStep Medi.
              </p>
            </div>

            {/* CTA buttons: wrap on small screens */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={handleAppointmentClick}
                className="w-full xs:w-auto px-4 py-2.5 sm:px-5 sm:py-3 bg-custom-blue text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                aria-label="Video Consultation"
              >
                Video Consultation →
              </button>
              <button
                onClick={handleEmergencyClick}
                className="w-full xs:w-auto px-4 py-2.5 sm:px-5 sm:py-3 bg-custom-blue text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                aria-label="Emergency Appointment"
              >
                Emergency Appointment →
              </button>
              <button
                onClick={toggleChatbot}
                className="w-full xs:w-auto px-4 py-2.5 sm:px-5 sm:py-3 bg-custom-blue text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                aria-label="Open help chatbot"
              >
                Help? →
              </button>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="lg:col-span-5 2xl:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
              <img
                src={home1}
                alt="Healthcare"
                className="w-full h-auto object-contain rounded-lg"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot overlay (unchanged behavior) */}
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </div>
  );
};

export default Headers;
