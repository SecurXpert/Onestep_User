import React, { useState } from 'react';
import Dashboard from '../Dashborad_Admin';
import DoctorsData from '../Doctorsdata';
import Settings from '../Settings';

const SuperAdminDashboard = () => {
  const [activeView, setActiveView] = useState('dashboard');

  const views = [
    { name: 'Add Profile', id: 'profile' },
    { name: 'Add Portfolio', id: 'portfolio' },
    { name: 'Settings', id: 'settings' },
    { name: 'Dashboard', id: 'dashboard' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-gray-50 flex">
      {/* Decorative Line Element (Header) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-full md:w-[220px] bg-indigo-800 shadow-xl">
          <div className="p-4">
            <h2 className="text-xl font-bold text-white mb-6">SuperAdmin</h2>
            <nav className="flex flex-col space-y-3">
              {views.map((view) => (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id)}
                  className={`px-4 py-2 rounded-lg text-center font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 ${
                    activeView === view.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-indigo-100 text-indigo-700 hover:bg-purple-500 hover:text-white'
                  }`}
                >
                  {view.name}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-10">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-indigo-700 mb-8 tracking-tight animate-fade-in-up">
              SuperAdmin Dashboard
            </h2>
            <div className="animate-fade-in">
              {activeView === 'profile' && <DoctorsData />}
              {activeView === 'portfolio' && <DoctorsData />}
              {activeView === 'settings' && <Settings />}
              {activeView === 'dashboard' && <Dashboard />}
            </div>
          </div>
        </div>
      </div>

      {/* Tailwind CSS Animation */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SuperAdminDashboard;