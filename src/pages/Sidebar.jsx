import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaStethoscope, FaFileMedical, FaStar, FaGift, FaHeart, FaBook, FaQuestionCircle, FaInfoCircle, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const sidebarItems = [
    { name: 'Profile', icon: FaUser, path: '/profilepage' },
    // { name: 'My Orders', icon: FaShoppingCart, path: '/myorder' },
    { name: 'My Consultations', icon: FaStethoscope, path: '/myconsultations' },
    // { name: 'Health Records', icon: FaFileMedical, path: '/health-record' },
    { name: 'Rate Your Recent Consultation', icon: FaStar, path: '/rate' },
    { name: 'My Rewards', icon: FaGift, path: '/reward' },
    { name: 'Health Plans', icon: FaHeart, path: '/healthplan' },
    { name: 'Blogs', icon: FaBook, path: '/blogs' },
    // { name: 'Need Help?', icon: FaQuestionCircle, path: '/need' },
    // { name: 'About Us', icon: FaInfoCircle, path: '/aboutus' },
    { name: 'Settings', icon: FaBook, path: '/settings1' },
    
    { name: 'Logout', icon: FaSignOutAlt, path: '/logout' },
  ];

  const handleNavigation = (path) => {
    if (path === '/logout') {
      logout();
      navigate('/login-register');
    } else {
      navigate(path);
    }
    setIsOpen(false); // Close menu on navigation in mobile
  };

  return (
    <>
      {/* Burger Menu Button for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-purple-800 text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="p-6 pt-16 md:pt-6 overflow-y-auto h-full scrollbar-hide">
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none; /* IE and Edge */
              scrollbar-width: none; /* Firefox */
            }
          `}</style>
          <h2 className="text-xl font-bold text-purple-800 mb-6">Menu</h2>
          {sidebarItems.map((item) => (
            <div
              key={item.name}
              className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer hover:bg-purple-100 ${
                location.pathname === item.path ? 'bg-purple-200' : ''
              }`}
              onClick={() => handleNavigation(item.path)}
            >
              <item.icon className="text-purple-600 mr-3" />
              <span className="text-gray-700">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;