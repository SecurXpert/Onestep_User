import React from 'react';
import Sidebar from './Sidebar';
import ConsultationRating from './ConsultationRating'


const Rate = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar on the left */}
      <Sidebar />
      
      {/* Profile content on the right */}
      <div className="flex-1">
        <ConsultationRating/>
      </div>
    </div>
  );
};

export default Rate;