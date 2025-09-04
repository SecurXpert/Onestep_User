import React from 'react';
import bannerimg from '../assets/banner.jpg';
import { useNavigate } from 'react-router-dom';


const Banner = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden">
        
        {/* Right Side - Text */}
        <div className="w-full md:w-1/2 flex justify-center p-4">
          <img
            src={bannerimg}
            alt="Doctor Hub"
            className="max-w-full h-auto rounded-lg"
          />
        </div>

        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 text-center md:text-left p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Book Your Appointment Now 
          </h1>
          <p className="text-gray-700 text-lg mb-4">
            Your one-stop platform for finding, booking, and managing healthcare services with trusted doctors.
          </p>
          <button onClick ={ () => navigate('/register')} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
