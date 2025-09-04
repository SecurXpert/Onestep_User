import React from 'react';
import Sidebar from './Sidebar';

import RewardsPage from './RewardsPage';


const Reward = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar on the left */}
      <Sidebar />
      
      {/* Profile content on the right */}
      <div className="flex-1">
        <RewardsPage/>
      </div>
    </div>
  );
};

export default Reward;