import React from 'react';
import Sidebar from './Sidebar';

import MyAppointment from './MyAppointment';

const MyConsultations = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar on the left */}
      <Sidebar />
      
      {/* Profile content on the right */}
      <div className="flex-1">
        <MyAppointment />
      </div>
    </div>
  );
};

export default MyConsultations;