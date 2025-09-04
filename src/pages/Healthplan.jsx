import React from 'react';
import Sidebar from './Sidebar';
import HealthPlansPage from './Healthplans';


const HealthPlan = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar on the left */}
      <Sidebar />
      
      {/* Profile content on the right */}
      <div className="flex-1">
        <HealthPlansPage />
      </div>
    </div>
  );
};

export default HealthPlan;