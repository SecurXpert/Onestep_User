import React, { useState } from 'react';

const RewardsPage = () => {
  const [formData, setFormData] = useState({
    rewardCode: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle reward redemption logic here (e.g., send data to an API)
    console.log('Reward redemption submitted:', formData);
    setFormData({ rewardCode: '', email: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Rewards Program</h1>
          <p className="mt-4 text-lg text-gray-600">
            Earn points with every appointment and redeem them for exciting rewards!
          </p>
        </div>

        {/* Rewards Program Overview */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">How It Works</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Earn Points</h3>
              <p className="mt-1 text-gray-600">
                Get 10 points for every completed doctor appointment or consultation booked through our app.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Redeem Rewards</h3>
              <p className="mt-1 text-gray-600">
                Use your points to unlock discounts, free consultations, or exclusive health packages.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Track Your Points</h3>
              <p className="mt-1 text-gray-600">
                Check your points balance in your account dashboard under "My Rewards."
              </p>
            </div>
          </div>
        </div>

        {/* Available Rewards Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Available Rewards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-md p-4">
              <h3 className="text-lg font-medium text-gray-900">Free Consultation</h3>
              <p className="mt-1 text-gray-600">Redeem 50 points for a free 15-minute consultation with any doctor.</p>
            </div>
            <div className="border border-gray-200 rounded-md p-4">
              <h3 className="text-lg font-medium text-gray-900">$10 Discount</h3>
              <p className="mt-1 text-gray-600">Use 30 points to get a $10 discount on your next appointment.</p>
            </div>
            <div className="border border-gray-200 rounded-md p-4">
              <h3 className="text-lg font-medium text-gray-900">Health Package</h3>
              <p className="mt-1 text-gray-600">Redeem 100 points for a premium health check-up package.</p>
            </div>
            <div className="border border-gray-200 rounded-md p-4">
              <h3 className="text-lg font-medium text-gray-900">Priority Booking</h3>
              <p className="mt-1 text-gray-600">Use 20 points to get priority scheduling for your next appointment.</p>
            </div>
          </div>
        </div>

        {/* Reward Redemption Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Redeem Your Rewards</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="rewardCode" className="block text-sm font-medium text-gray-700">
                Reward Code
              </label>
              <input
                type="text"
                id="rewardCode"
                name="rewardCode"
                value={formData.rewardCode}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your reward code"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Redeem Reward
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;