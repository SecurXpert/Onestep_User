import React from 'react';
import Sidebar from './Sidebar';
import UserDashboardMock from './UserDashboardMock';

const Myorder = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar on the left */}
      <Sidebar />
      
      {/* Profile content on the right */}
      <div className="flex-1">
        <UserDashboardMock />
      </div>
    </div>
  );
};

export default Myorder;