import React from 'react';
import Sidebar from './Sidebar';
import NeedHelp from './NeedHelp'


const ProfilePage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar on the left */}
      <Sidebar />
      
      {/* Profile content on the right */}
      <div className="flex-1">
        <NeedHelp/>
      </div>
    </div>
  );
};

export default ProfilePage;