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
    <footer className="relative bg-[rgb(3,4,94)] text-white pt-8 2xs:pt-10 xs:pt-12 pb-6">
      {/* Wavy Top Border */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-8 2xs:h-9 xs:h-10 sm:h-12"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113.64,28.06,1200,56.86V0Z"
            className="fill-current text-white-200"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 2xs:grid-cols-1 xs:grid-cols-1 2sm:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 md800:grid-cols-3 md900:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-4 gap-6 2xs:gap-6 xs:gap-6 2sm:gap-8 sm:gap-8 md:gap-8 md800:gap-8 md900:gap-8 lg:gap-8 xl:gap-8 2xl:gap-8 3xl:gap-8 relative z-10">
        {/* About Section with Logo */}
        <div className="mb-6 2xs:mb-6 xs:mb-6 2sm:mb-8 sm:mb-8">
          <div className="flex items-center mb-3 2xs:mb-3 xs:mb-4 2sm:mb-4 sm:mb-4">
            <img
              src={logo}
              alt="One Step Medi Logo"
              className="w-10 2xs:w-10 xs:w-12 2sm:w-12 sm:w-12 md:w-14 md800:w-14 md900:w-14 lg:w-14 xl:w-14 2xl:w-14 3xl:w-14 h-10 2xs:h-10 xs:h-12 2sm:h-12 sm:h-12 md:h-14 md800:h-14 md900:h-14 lg:h-14 xl:h-14 2xl:h-14 3xl:h-14 mr-2 2xs:mr-2 xs:mr-3 2sm:mr-3 sm:mr-3 rounded-full border-2 border-blue-300"
            />
            <h3 className="text-lg 2xs:text-lg xs:text-xl 2sm:text-xl sm:text-xl md:text-2xl md800:text-2xl md900:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl 3xl:text-2xl font-bold text-blue-100">
              One Step Medi
            </h3>
          </div>
          <p className="text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-sm md900:text-sm lg:text-sm xl:text-sm 2xl:text-sm 3xl:text-sm text-white mb-3 2xs:mb-3 xs:mb-4 2sm:mb-4 sm:mb-4">
            Your trusted partner in healthcare excellence
          </p>
          <div className="mt-3 2xs:mt-3 xs:mt-4 2sm:mt-4 sm:mt-4 flex flex-col 2xs:flex-col xs:flex-col 2sm:flex-row sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Email Address..."
              className="w-full p-2 2xs:p-2 xs:p-2.5 2sm:p-2.5 sm:p-2.5 bg-blue-800 bg-opacity-50 border border-blue-400 rounded-md 2sm:rounded-l-md sm:rounded-l-md text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 2xs:p-2 xs:p-2.5 2sm:p-2.5 sm:p-2.5 rounded-md 2sm:rounded-r-md sm:rounded-r-md transition-colors duration-300 text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm">
              Subscribe
            </button>
          </div>
          <p className="text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-sm md900:text-sm lg:text-sm xl:text-sm 2xl:text-sm 3xl:text-sm text-white mt-3 2xs:mt-3 xs:mt-4 2sm:mt-4 sm:mt-4">
            Certified by
          </p>
          <div className="flex space-x-2 2xs:space-x-2 xs:space-x-3 2sm:space-x-3 sm:space-x-3 mt-2 2xs:mt-2 xs:mt-3 2sm:mt-3 sm:mt-3">
            <div className="w-10 2xs:w-10 xs:w-10 2sm:w-10 sm:w-10 md:w-12 md800:w-12 md900:w-12 lg:w-12 xl:w-12 2xl:w-12 3xl:w-12 h-10 2xs:h-10 xs:h-10 2sm:h-10 sm:h-10 md:h-12 md800:h-12 md900:h-12 lg:h-12 xl:h-12 2xl:h-12 3xl:h-12 bg-blue-600 rounded-md flex items-center justify-center">
              <svg className="w-5 2xs:w-5 xs:w-5 2sm:w-5 sm:w-5 md:w-6 md800:w-6 md900:w-6 lg:w-6 xl:w-6 2xl:w-6 3xl:w-6 h-5 2xs:h-5 xs:h-5 2sm:h-5 sm:h-5 md:h-6 md800:h-6 md900:h-6 lg:h-6 xl:h-6 2xl:h-6 3xl:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.22-1.79L9 14v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <div className="w-10 2xs:w-10 xs:w-10 2sm:w-10 sm:w-10 md:w-12 md800:w-12 md900:w-12 lg:w-12 xl:w-12 2xl:w-12 3xl:w-12 h-10 2xs:h-10 xs:h-10 2sm:h-10 sm:h-10 md:h-12 md800:h-12 md900:h-12 lg:h-12 xl:h-12 2xl:h-12 3xl:h-12 bg-blue-600 rounded-md flex items-center justify-center">
              <svg className="w-5 2xs:w-5 xs:w-5 2sm:w-5 sm:w-5 md:w-6 md800:w-6 md900:w-6 lg:w-6 xl:w-6 2xl:w-6 3xl:w-6 h-5 2xs:h-5 xs:h-5 2sm:h-5 sm:h-5 md:h-6 md800:h-6 md900:h-6 lg:h-6 xl:h-6 2xl:h-6 3xl:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.22-1.79L9 14v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <div className="w-10 2xs:w-10 xs:w-10 2sm:w-10 sm:w-10 md:w-12 md800:w-12 md900:w-12 lg:w-12 xl:w-12 2xl:w-12 3xl:w-12 h-10 2xs:h-10 xs:h-10 2sm:h-10 sm:h-10 md:h-12 md800:h-12 md900:h-12 lg:h-12 xl:h-12 2xl:h-12 3xl:h-12 bg-blue-600 rounded-md flex items-center justify-center">
              <svg className="w-5 2xs:w-5 xs:w-5 2sm:w-5 sm:w-5 md:w-6 md800:w-6 md900:w-6 lg:w-6 xl:w-6 2xl:w-6 3xl:w-6 h-5 2xs:h-5 xs:h-5 2sm:h-5 sm:h-5 md:h-6 md800:h-6 md900:h-6 lg:h-6 xl:h-6 2xl:h-6 3xl:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.22-1.79L9 14v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
          </div>
          <div className="mt-4 2xs:mt-4 xs:mt-5 2sm:mt-6 sm:mt-6">
            <p className="text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-sm md900:text-sm lg:text-sm xl:text-sm 2xl:text-sm 3xl:text-sm text-white mb-2 2xs:mb-2 xs:mb-3 2sm:mb-3 sm:mb-3">
              Follow Us On:
            </p>
            <div className="flex gap-2 2xs:gap-2 xs:gap-3 2sm:gap-3 sm:gap-3">
              <a
                href="https://www.youtube.com/@securxpert"
                aria-label="Follow One Step Medi on YouTube"
                className="flex items-center justify-center w-8 2xs:w-8 xs:w-9 2sm:w-9 sm:w-9 md:w-10 md800:w-10 md900:w-10 lg:w-10 xl:w-10 2xl:w-10 3xl:w-10 h-8 2xs:h-8 xs:h-9 2sm:h-9 sm:h-9 md:h-10 md800:h-10 md900:h-10 lg:h-10 xl:h-10 2xl:h-10 3xl:h-10 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <svg className="w-4 2xs:w-4 xs:w-5 2sm:w-5 sm:w-5 md:w-5 md800:w-5 md900:w-5 lg:w-5 xl:w-5 2xl:w-5 3xl:w-5 h-4 2xs:h-4 xs:h-5 2sm:h-5 sm:h-5 md:h-5 md800:h-5 md900:h-5 lg:h-5 xl:h-5 2xl:h-5 3xl:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.121-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/posts/securxpert-technologies-pvt-ltd_empowering-friendships-inspiring-teams-activity-7358016799541497857-5Uf7?utm_source=share&utm_medium=member_android&rcm=ACoAAEuBpKcBteXPc6mMDwOFq5XpEMSlylV8AZc"
                aria-label="Follow One Step Medi on LinkedIn"
                className="flex items-center justify-center w-8 2xs:w-8 xs:w-9 2sm:w-9 sm:w-9 md:w-10 md800:w-10 md900:w-10 lg:w-10 xl:w-10 2xl:w-10 3xl:w-10 h-8 2xs:h-8 xs:h-9 2sm:h-9 sm:h-9 md:h-10 md800:h-10 md900:h-10 lg:h-10 xl:h-10 2xl:h-10 3xl:h-10 rounded-full bg-blue-700 hover:bg-blue-800 text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-700"
              >
                <svg className="w-4 2xs:w-4 xs:w-5 2sm:w-5 sm:w-5 md:w-5 md800:w-5 md900:w-5 lg:w-5 xl:w-5 2xl:w-5 3xl:w-5 h-4 2xs:h-4 xs:h-5 2sm:h-5 sm:h-5 md:h-5 md800:h-5 md900:h-5 lg:h-5 xl:h-5 2xl:h-5 3xl:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.255-2.391-1.875-2.391-1.879 0-2.125 1.392-2.125 2.391v5.604h-3v-11h3v1.563c.5-.938 1.333-1.563 2.375-1.563 2.625 0 3.125 1.828 3.125 4.207v6.793z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/people/SecurXpert/61573444473317/?mibextid=wwXIfr&rdid=7dUcZFpX8wg64ZBX&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FTGS4JLXi%2F%3Fmibextid%3DwwXIfr"
                aria-label="Follow One Step Medi on Facebook"
                className="flex items-center justify-center w-8 2xs:w-8 xs:w-9 2sm:w-9 sm:w-9 md:w-10 md800:w-10 md900:w-10 lg:w-10 xl:w-10 2xl:w-10 3xl:w-10 h-8 2xs:h-8 xs:h-9 2sm:h-9 sm:h-9 md:h-10 md800:h-10 md900:h-10 lg:h-10 xl:h-10 2xl:h-10 3xl:h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <FaFacebookF className="w-4 2xs:w-4 xs:w-5 2sm:w-5 sm:w-5 md:w-5 md800:w-5 md900:w-5 lg:w-5 xl:w-5 2xl:w-5 3xl:w-5 h-4 2xs:h-4 xs:h-5 2sm:h-5 sm:h-5 md:h-5 md800:h-5 md900:h-5 lg:h-5 xl:h-5 2xl:h-5 3xl:h-5" />
              </a>
              <a
                href="https://www.instagram.com/securxpert/?igsh=MWJtM28zYjNveTQ2cw%3D%3D#"
                aria-label="Follow One Step Medi on Instagram"
                className="flex items-center justify-center w-8 2xs:w-8 xs:w-9 2sm:w-9 sm:w-9 md:w-10 md800:w-10 md900:w-10 lg:w-10 xl:w-10 2xl:w-10 3xl:w-10 h-8 2xs:h-8 xs:h-9 2sm:h-9 sm:h-9 md:h-10 md800:h-10 md900:h-10 lg:h-10 xl:h-10 2xl:h-10 3xl:h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <FaInstagram className="w-4 2xs:w-4 xs:w-5 2sm:w-5 sm:w-5 md:w-5 md800:w-5 md900:w-5 lg:w-5 xl:w-5 2xl:w-5 3xl:w-5 h-4 2xs:h-4 xs:h-5 2sm:h-5 sm:h-5 md:h-5 md800:h-5 md900:h-5 lg:h-5 xl:h-5 2xl:h-5 3xl:h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-6 2xs:mb-6 xs:mb-6 2sm:mb-8 sm:mb-8">
          <h4 className="text-base 2xs:text-base xs:text-lg 2sm:text-lg sm:text-lg md:text-lg md800:text-lg md900:text-lg lg:text-lg xl:text-lg 2xl:text-lg 3xl:text-lg font-semibold text-blue-100 mb-3 2xs:mb-3 xs:mb-4 2sm:mb-4 sm:mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 2xs:space-y-2 xs:space-y-3 2sm:space-y-3 sm:space-y-3 text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-sm md900:text-sm lg:text-sm xl:text-sm 2xl:text-sm 3xl:text-sm text-white">
            <li><a href="/" className="hover:text-blue-400 transition-colors duration-200">Home</a></li>
            <li><a href="/about" className="hover:text-blue-400 transition-colors duration-200">About Us</a></li>
            <li><a href="/doctors" className="hover:text-blue-400 transition-colors duration-200">Find a Doctor</a></li>
            <li><a href="/appointment" className="hover:text-blue-400 transition-colors duration-200">Book Appointment</a></li>
            <li><a href="/emergency" className="hover:text-blue-400 transition-colors duration-200">Emergency Appointment</a></li>
            <li><a href="/blog" className="hover:text-blue-400 transition-colors duration-200">Blog</a></li>
            <li><a href="/contact" className="hover:text-blue-400 transition-colors duration-200">Contact Us</a></li>
            <li><a href="/testimonials" className="hover:text-blue-400 transition-colors duration-200">Testimonials</a></li>
          </ul>
        </div>

        {/* Category List */}
        <div className="mb-6 2xs:mb-6 xs:mb-6 2sm:mb-8 sm:mb-8">
          <h4 className="text-base 2xs:text-base xs:text-lg 2sm:text-lg sm:text-lg md:text-lg md800:text-lg md900:text-lg lg:text-lg xl:text-lg 2xl:text-lg 3xl:text-lg font-semibold text-blue-100 mb-3 2xs:mb-3 xs:mb-4 2sm:mb-4 sm:mb-4">
            Policies & Support
          </h4>
          <ul className="space-y-2 2xs:space-y-2 xs:space-y-3 2sm:space-y-3 sm:space-y-3 text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-sm md900:text-sm lg:text-sm xl:text-sm 2xl:text-sm 3xl:text-sm text-white">
            <li><a href="/private" className="hover:text-blue-400 transition-colors duration-200">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-blue-400 transition-colors duration-200">Terms & Conditions</a></li>
            <li>
              <button onClick={toggleChatbot} className="hover:text-blue-400 transition-colors duration-200 text-white">
                Need Help?
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-base 2xs:text-base xs:text-lg 2sm:text-lg sm:text-lg md:text-lg md800:text-lg md900:text-lg lg:text-lg xl:text-lg 2xl:text-lg 3xl:text-lg font-semibold text-blue-100 mb-3 2xs:mb-3 xs:mb-4 2sm:mb-4 sm:mb-4">
            Contact Information
          </h4>
          <p className="text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-sm md900:text-sm lg:text-sm xl:text-sm 2xl:text-sm 3xl:text-sm text-white flex items-center mb-2 2xs:mb-2 xs:mb-3 2sm:mb-3 sm:mb-3">
            <svg className="w-4 2xs:w-4 xs:w-5 2sm:w-5 sm:w-5 md:w-5 md800:w-5 md900:w-5 lg:w-5 xl:w-5 2xl:w-5 3xl:w-5 h-4 2xs:h-4 xs:h-5 2sm:h-5 sm:h-5 md:h-5 md800:h-5 md900:h-5 lg:h-5 xl:h-5 2xl:h-5 3xl:h-5 mr-2 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            support@onestepmedi.com
          </p>
          <p className="text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-sm md900:text-sm lg:text-sm xl:text-sm 2xl:text-sm 3xl:text-sm text-white flex items-center mb-2 2xs:mb-2 xs:mb-3 2sm:mb-3 sm:mb-3">
            <svg className="w-4 2xs:w-4 xs:w-5 2sm:w-5 sm:w-5 md:w-5 md800:w-5 md900:w-5 lg:w-5 xl:w-5 2xl:w-5 3xl:w-5 h-4 2xs:h-4 xs:h-5 2sm:h-5 sm:h-5 md:h-5 md800:h-5 md900:h-5 lg:h-5 xl:h-5 2xl:h-5 3xl:h-5 mr-2 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            5th Floor, Krishna Towers, 100 Feet Rd, Madhapur, Hyderabad, Telangana 500081
          </p>
          <p className="text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-sm md900:text-sm lg:text-sm xl:text-sm 2xl:text-sm 3xl:text-sm text-white flex items-center">
            <svg className="w-4 2xs:w-4 xs:w-5 2sm:w-5 sm:w-5 md:w-5 md800:w-5 md900:w-5 lg:w-5 xl:w-5 2xl:w-5 3xl:w-5 h-4 2xs:h-4 xs:h-5 2sm:h-5 sm:h-5 md:h-5 md800:h-5 md900:h-5 lg:h-5 xl:h-5 2xl:h-5 3xl:h-5 mr-2 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.02l-2.2 2.2z"/>
            </svg>
            7993256679
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-6 2xs:mt-6 xs:mt-8 2sm:mt-8 sm:mt-8 md:mt-10 md800:mt-10 md900:mt-10 lg:mt-10 xl:mt-10 2xl:mt-10 3xl:mt-10 text-center text-xs 2xs:text-xs xs:text-sm 2sm:text-sm sm:text-sm md:text-sm md800:text-sm md900:text-sm lg:text-sm xl:text-sm 2xl:text-sm 3xl:text-sm text-white border-t border-blue-700 pt-3 2xs:pt-3 xs:pt-4 2sm:pt-4 sm:pt-4">
        © 2025 OneStepMedi. All Rights Reserved | <a href="/private" className="hover:text-blue-400 transition-colors duration-200">Privacy Policy</a> | <a href="/terms" className="hover:text-blue-400 transition-colors duration-200">Terms & Conditions</a>
      </div>

      {/* Render Chatbot */}
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </footer>
  );
};

export default Footer;