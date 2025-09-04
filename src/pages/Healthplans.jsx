import React, { useState } from 'react';

const HealthPlansPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plan: 'basic',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle plan subscription logic here (e.g., send data to an API)
    console.log('Plan subscription submitted:', formData);
    setFormData({ name: '', email: '', plan: 'basic' });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Health Plans</h1>
          <p className="mt-4 text-lg text-gray-600">
            Choose a plan that fits your healthcare needs and enjoy seamless access to our services.
          </p>
        </div>

        {/* Health Plans Overview */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Plans</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-md p-4">
              <h3 className="text-lg font-medium text-gray-900">Basic Plan</h3>
              <p className="mt-1 text-gray-600">$10/month</p>
              <ul className="mt-2 text-gray-600 list-disc list-inside">
                <li>2 consultations per month</li>
                <li>Access to general practitioners</li>
                <li>24/7 support</li>
              </ul>
              <button className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Select Plan
              </button>
            </div>
            <div className="border border-gray-200 rounded-md p-4">
              <h3 className="text-lg font-medium text-gray-900">Standard Plan</h3>
              <p className="mt-1 text-gray-600">$25/month</p>
              <ul className="mt-2 text-gray-600 list-disc list-inside">
                <li>5 consultations per month</li>
                <li>Access to specialists</li>
                <li>Priority scheduling</li>
                <li>24/7 support</li>
              </ul>
              <button className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Select Plan
              </button>
            </div>
            <div className="border border-gray-200 rounded-md p-4">
              <h3 className="text-lg font-medium text-gray-900">Premium Plan</h3>
              <p className="mt-1 text-gray-600">$50/month</p>
              <ul className="mt-2 text-gray-600 list-disc list-inside">
                <li>Unlimited consultations</li>
                <li>Access to top-tier specialists</li>
                <li>Priority scheduling</li>
                <li>Health check-up package</li>
                <li>24/7 support</li>
              </ul>
              <button className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Select Plan
              </button>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Our Plans?</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Flexible Options</h3>
              <p className="mt-1 text-gray-600">
                Select a plan that suits your needs, from basic consultations to comprehensive care.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Expert Care</h3>
              <p className="mt-1 text-gray-600">
                Access a network of experienced doctors and specialists at your convenience.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Affordable Pricing</h3>
              <p className="mt-1 text-gray-600">
                Get quality healthcare services at competitive prices with no hidden fees.
              </p>
            </div>
          </div>
        </div>

        {/* Subscription Form Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Subscribe to a Plan</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your name"
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
              <label htmlFor="plan" className="block text-sm font-medium text-gray-700">
                Select Plan
              </label>
              <select
                id="plan"
                name="plan"
                value={formData.plan}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="basic">Basic Plan ($10/month)</option>
                <option value="standard">Standard Plan ($25/month)</option>
                <option value="premium">Premium Plan ($50/month)</option>
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Subscribe Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HealthPlansPage;