import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import myImage from '../assets/logo.png';
import cmplogo from '../assets/cmplogo.png';
import { AuthContext } from '../context/AuthContext';
import Chatbot from '../pages/Chatbot';
import EmergencySiren from '../components/EmergencySiren';



const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    const storedImage = sessionStorage.getItem('profileImage');
    if (storedImage) {
      const img = new Image();
      img.src = storedImage;
      img.onload = () => setProfileImage(storedImage);
      img.onerror = () => {
        console.error('Failed to load profile image from sessionStorage:', storedImage);
        setProfileImage(null);
        sessionStorage.removeItem('profileImage');
      };
    }
  }, []);

  const handleRegisterClick = () => {
    navigate('/login-register');
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
    setIsChatbotOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
    setIsMenuOpen(false);
    setIsChatbotOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsProfileMenuOpen(false);
    setIsChatbotOpen(false);
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      logout();
      navigate('/login-register');
      setIsProfileMenuOpen(false);
      setIsMenuOpen(false);
      setIsChatbotOpen(false);
      setProfileImage(null);
      sessionStorage.removeItem('profileImage');
    }
  };

  const handleImageError = (e) => {
    console.error('Failed to load profile image in Navbar');
    setProfileImage(null);
    sessionStorage.removeItem('profileImage');
    e.target.src = '/assets/fallback-profile.png';
  };

  return (
    <nav className="bg-white shadow fixed top-0 left-0 right-0 z-40">
      <style>
        {`
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
          }
          .animate-blink {
            animation: blink 1s infinite;
          }
        `}
      </style>
      <div className="w-full px-8 md:px-12">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <NavLink to="/">
              <img src={myImage} alt="Logo" className="h-16 w-auto" />
            </NavLink>
          </div>

          <div className="hidden md:flex space-x-6 items-center">
            <NavLink to="/" className="nav-link">
              Home<hr />
            </NavLink>
            <NavLink to="/about" className="nav-link">
              About Us<hr />
            </NavLink>
            <NavLink to="/doctors" className="nav-link">
              Find Doctors<hr />
            </NavLink>
            <NavLink to="/article" className="nav-link">
              Articles<hr />
            </NavLink>
          </div>

          <div className="flex items-center space-x-3 relative">
          
          <NavLink
  to="/emergency"
  className="bg-red-600 text-white pr-2 rounded-lg hover:bg-red-700 transition shadow-md hover:scale-105 flex items-center"
>
  <div className=" translate-y-2">
    <EmergencySiren size={50} /> {/* Only this blinks */}
  </div>
  Emergency
</NavLink>




              <NavLink
                to="/contact"
                className="bg-custom-blue text-white px-4 py-2
                 rounded-lg hover:bg-blue-700 transition shadow-md hover:scale-105"
              >
                Contact Us
              </NavLink>
              <button
                onClick={toggleChatbot}
                className="bg-custom-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md hover:scale-105"
              >
                Help?
              </button>
            
            {!isLoggedIn ? (
              <button
                onClick={handleRegisterClick}
                className="bg-custom-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md hover:scale-105"
              >
                Login/Register
              </button>
            ) : (
              <div className="relative">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-purple-100"
                    onClick={toggleProfileMenu}
                    onError={handleImageError}
                  />
                ) : (
                  <FaUserCircle
                    className="text-3xl text-purple-700 cursor-pointer"
                    onClick={toggleProfileMenu}
                  />
                )}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50">
                    <div className="flex flex-col p-4 space-y-2">
                      <NavLink
                        to="/profilepage"
                        className="text-gray-700 hover:text-purple-700"
                        onClick={toggleProfileMenu}
                      >
                        My Profile
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="text-left text-red-600 hover:text-purple-700"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="md:hidden">
              <FaBars
                className="text-3xl text-purple-700 cursor-pointer"
                onClick={toggleMenu}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-auto w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <NavLink to="/" onClick={toggleMenu}>
              <img src={cmplogo} alt="Company Logo" className="h-10 w-auto" />
            </NavLink>
            <FaTimes
              className="text-2xl text-purple-700 cursor-pointer"
              onClick={toggleMenu}
            />
          </div>
          <div className="flex flex-col p-4 space-y-4">
            <NavLink
              to="/"
              className="text-lg text-gray-700 hover:text-purple-700"
              onClick={toggleMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="text-lg text-gray-700 hover:text-purple-700"
              onClick={toggleMenu}
            >
              About Us
            </NavLink>
            <NavLink
              to="/doctors"
              className="text-lg text-gray-700 hover:text-purple-700"
              onClick={toggleMenu}
            >
              Doctors
            </NavLink>
            <NavLink
              to="/emergency"
              className="text-lg text-gray-700 hover:text-purple-700"
              onClick={toggleMenu}
            >
              Emergency Slot
            </NavLink>
            <NavLink
              to="/article"
              className="text-lg text-gray-700 hover:text-purple-700"
              onClick={toggleMenu}
            >
              Articles
            </NavLink>
            <NavLink
              to="/contact"
              className="text-lg text-gray-700 hover:text-purple-700"
              onClick={toggleMenu}
            >
              Contact Us
            </NavLink>
            <button
              onClick={toggleChatbot}
              className="text-lg text-gray-700 hover:text-purple-700 text-left"
            >
              Help?
            </button>
            {isLoggedIn && (
              <>
                <NavLink
                  to="/profilepage"
                  className="text-lg text-gray-700 hover:text-purple-700"
                  onClick={toggleMenu}
                >
                  My Profile
                </NavLink>
                <NavLink
                  to="/myappointment"
                  className="text-lg text-gray-700 hover:text-purple-700"
                  onClick={toggleMenu}
                >
                  My Appointment
                </NavLink>
                <NavLink
                  to="/user-dash"
                  className="text-lg text-gray-700 hover:text-purple-700"
                  onClick={toggleMenu}
                >
                  My Prescription
                </NavLink>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                    toggleMenu();
                  }}
                  className="text-lg text-left text-red-600 hover:text-purple-700"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
          onClick={toggleMenu}
        ></div>
      )}

      {isProfileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 hidden md:block"
          onClick={toggleProfileMenu}
        ></div>
      )}

      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </nav>
  );
};

export default Navbar;