import React from 'react';

const Rate = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-full max-w-md mx-auto my-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-10">RATE ONESTEP MEDI</h1>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">ANY SUGGESTIONS</h2>
            <textarea 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type message here..."
              rows="4"
            />
          </div>
          
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200">
            SUBMIT FEEDBACK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rate;