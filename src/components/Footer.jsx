import React, { useState } from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import logo from '../assets/logo.png';
import Chatbot from '../pages/Chatbot';

const Footer = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <footer className="bg-gray-100 text-gray-800">
      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* About + Subscribe + Social */}
        <div>
          <div className="flex items-center mb-4">
            <img
              src={logo}
              alt="One Step Medi Logo"
              className="w-12 h-12 mr-3"
            />
            <h3 className="text-xl font-bold">One Step Medi</h3>
          </div>

          {/* Subscribe */}
          <form onSubmit={(e) => e.preventDefault()} className="mt-4">
            <label htmlFor="newsletter-email" className="sr-only">
              Email Address
            </label>
            <div className="flex flex-col sm:flex-row">
              <input
                id="newsletter-email"
                type="email"
                placeholder="Email Address.."
                className="w-full p-2 border text-gray-800 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="mt-2 sm:mt-0 sm:ml-0 p-2 rounded-md sm:rounded-r-md sm:rounded-l-none bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </form>

          <p className="text-sm text-gray-600 mt-4">We are Certified by</p>
          <div className="flex space-x-2 mt-2">
            <div className="w-12 h-12 bg-gray-300 rounded" />
            <div className="w-12 h-12 bg-gray-300 rounded" />
            <div className="w-12 h-12 bg-gray-300 rounded" />
          </div>

          {/* Social */}
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-2">Follow Us On:</p>
            <div className="flex gap-3">
              {/* YouTube */}
              <a
                href="https://www.youtube.com/@securxpert"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow One Step Medi on YouTube"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-800 hover:bg-red-600 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.121-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/securxpert-technologies-pvt-ltd/%22"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow One Step Medi on LinkedIn"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-800 hover:bg-blue-700 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-700"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.255-2.391-1.875-2.391-1.879 0-2.125 1.392-2.125 2.391v5.604h-3v-11h3v1.563c.5-.938 1.333-1.563 2.375-1.563 2.625 0 3.125 1.828 3.125 4.207v6.793z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1FTGS4JLXi/?mibextid=wwXIfr%22"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow One Step Medi on Facebook"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-800 hover:bg-blue-600 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/securxpert/profilecard/?igsh=eGNnNnloajlyZmI1%22"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow One Step Medi on Instagram"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-800 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/doctors" className="hover:underline">Find a Doctor</a></li>
            {/* <li><a href="/appointment" className="hover:underline">Book Appointment</a></li> */}
            <li><a href="/emergency" className="hover:underline">Emergency Appointment</a></li>
            <li><a href="/blog" className="hover:underline">Blog</a></li>
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            <li><a href="/testimonials" className="hover:underline">Testimonials</a></li>
          </ul>
        </div>

        {/* Category List */}
        <div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="/private" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
            <li>
              <button
                onClick={toggleChatbot}
                className="hover:underline text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                Help?
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-3">Contact Information</h4>
          <p className="text-sm text-gray-600 flex items-center mb-2 break-words">
            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            support@onestepmedi.com
          </p>
          <p className="text-sm text-gray-600 flex items-center mb-2">
            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            5th Floor, Krishna Towers, 100 Feet Rd, Madhapur, Hyderabad, Telangana 500081
          </p>
          <p className="text-sm text-gray-600 flex items-center">
            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.02l-2.2 2.2z"/>
            </svg>
            7993256679
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-4 sm:px-6 lg:px-8 pb-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600 border-t border-gray-300 pt-4">
          © 2025 OneStepMedi. All Rights Reserved |{' '}
          <a href="/private" className="hover:underline">Privacy Policy</a> |{' '}
          <a href="/terms" className="hover:underline">Terms & Conditions</a>
        </div>
      </div>

      {/* Render Chatbot */}
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </footer>
  );
};

export default Footer;
