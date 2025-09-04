import React from 'react';
import Sidebar from './Sidebar';

import AboutUs from './AboutUs';


const Rate = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar on the left */}
      <Sidebar />
      
      {/* Profile content on the right */}
      <div className="flex-1">
        <AboutUs/>
      </div>
    </div>
  );
};

export default Rate;