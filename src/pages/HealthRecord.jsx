import React from 'react';
import Sidebar from './Sidebar';
import HealthRecords from './HealthRecords';

const HealthRecord = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar on the left */}
      <Sidebar />
      
      {/* Profile content on the right */}
      <div className="flex-1">
        <HealthRecords />
      </div>
    </div>
  );
};

export default HealthRecord;