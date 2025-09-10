import React, { useState, useMemo, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaUser, FaShoppingCart, FaStethoscope, FaFileMedical, FaStar,
  FaGift, FaHeart, FaBook, FaQuestionCircle, FaInfoCircle,
  FaSignOutAlt, FaBars, FaTimes, FaChevronRight
} from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const HEADER_HEIGHT = 64;
const FOOTER_HEIGHT = 65;

const Sidebar = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const sidebarItems = useMemo(() => ([
    { name: 'Profile', icon: FaUser, path: '/profilepage' },
    { name: 'My Orders', icon: FaShoppingCart, path: '/myorder' },
    { name: 'My Consultations', icon: FaStethoscope, path: '/myconsultations' },
    { name: 'Health Records', icon: FaFileMedical, path: '/health-record' },
    { name: 'Rate Consultation', icon: FaStar, path: '/rate' },
    { name: 'My Rewards', icon: FaGift, path: '/reward' },
    { name: 'Health Plans', icon: FaHeart, path: '/healthplan' },
    { name: 'Blogs', icon: FaBook, path: '/blogs' },
    { name: 'Need Help?', icon: FaQuestionCircle, path: '/need' },
    { name: 'About Us', icon: FaInfoCircle, path: '/aboutus' },
  ]), []);

  const handleNavigation = (path) => {
    if (path === '/logout') {
      logout();
      navigate('/login-register');
    } else {
      navigate(path);
    }
    setIsOpen(false);
    setActiveSubmenu(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login-register');
    setIsOpen(false);
  };

  const stickyStyles = useMemo(() => ({
    top: `${HEADER_HEIGHT}px`,
    height: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)`,
  }), []);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className="md:hidden fixed top-4 left-4 z-50 bg-purple-600 text-white p-2 rounded-lg shadow-md hover:bg-purple-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          'bg-gradient-to-b from-purple-50 to-white w-64 shadow-xl',
          'fixed top-0 left-0 h-full transform transition-transform duration-300 ease-in-out z-50',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0 md:sticky md:left-0 md:z-30',
        ].join(' ')}
        style={stickyStyles}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="h-full flex flex-col overflow-hidden">
          {/* Header with user info */}
          <div className="p-5 border-b border-purple-100 bg-white">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="ml-3">
                <h3 className="font-semibold text-gray-800">{user?.name || 'User'}</h3>
                <p className="text-sm text-gray-500">Welcome back!</p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent scrollbar-thumb-rounded-full">
            <h2 className="text-lg font-semibold text-purple-800 mb-5 px-2 flex items-center">
              <span className="w-1 h-5 bg-purple-600 rounded-full mr-3"></span>
              Menu
            </h2>
            
            <ul className="space-y-1">
              {sidebarItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                
                return (
                  <li key={item.name}>
                    <button
                      className={[
                        'w-full flex items-center justify-between p-3 rounded-xl',
                        'transition-all duration-200 hover:bg-purple-100/70',
                        'focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50',
                        isActive 
                          ? 'bg-purple-100 text-purple-700 font-medium shadow-sm' 
                          : 'text-gray-600 hover:text-purple-600'
                      ].join(' ')}
                      onClick={() => handleNavigation(item.path)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <div className="flex items-center">
                        <Icon 
                          className={isActive ? "text-purple-600" : "text-purple-400"} 
                          size={18} 
                        />
                        <span className="ml-3">{item.name}</span>
                      </div>
                      {isActive && <FaChevronRight size={12} className="text-purple-500" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout Section */}
          <div className="p-4 border-t border-purple-100 bg-white">
            <button
              className="w-full flex items-center p-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-200"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;