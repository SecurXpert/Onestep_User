import React from 'react';
import Sidebar from './Sidebar';
import Blog from './Blog';

const Blogs = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar on the left */}
      <Sidebar />
      
      {/* Profile content on the right */}
      <div className="flex-1">
        <Blog />
      </div>
    </div>
  );
};

export default Blogs;