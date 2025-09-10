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
    <main className="min-h-screen bg-gray-50">
      {/* Header Section (same content, upgraded visuals/responsiveness) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-500 opacity-90" />
        <svg
          className="absolute -top-10 -right-10 w-[320px] sm:w-[380px] opacity-20"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill="#ffffff"
            d="M46.3,-60.4C58.5,-52.6,65.7,-39.2,70.8,-24.9C75.8,-10.6,78.6,4.7,73.7,17.5C68.7,30.4,56,40.7,42.5,51.8C29,62.8,14.5,74.5,-0.4,75.1C-15.3,75.7,-30.6,65.1,-44.7,53.7C-58.9,42.4,-71.9,30.4,-77,15.3C-82.1,0.3,-79.4,-18,-70.9,-31.7C-62.4,-45.4,-48.1,-54.6,-33.6,-62.9C-19.1,-71.2,-9.6,-78.6,3.1,-83.1C15.7,-87.6,31.5,-89.1,46.3,-60.4Z"
          />
        </svg>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Health Plans
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-indigo-100">
              Choose a plan that fits your healthcare needs and enjoy seamless access to our services.
            </p>
          </div>
        </div>
      </section>

      {/* Body container */}
      <div className="mx-auto max-w-6xl w-full space-y-8 px-4 sm:px-6 lg:px-8 py-8">

        {/* Health Plans Overview (same content) */}
        <section className="bg-white shadow-sm rounded-2xl p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Our Plans</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Basic Plan */}
            <div className="rounded-xl border border-gray-200 p-4 sm:p-5 hover:shadow-md transition">
              <h3 className="text-lg font-medium text-gray-900">Basic Plan</h3>
              <p className="mt-1 text-gray-600">$10/month</p>
              <ul className="mt-2 text-gray-600 list-disc list-inside space-y-1">
                <li>2 consultations per month</li>
                <li>Access to general practitioners</li>
                <li>24/7 support</li>
              </ul>
              <button className="mt-4 w-full py-2 px-4 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm">
                Select Plan
              </button>
            </div>

            {/* Standard Plan */}
            <div className="rounded-xl border border-gray-200 p-4 sm:p-5 hover:shadow-md transition">
              <h3 className="text-lg font-medium text-gray-900">Standard Plan</h3>
              <p className="mt-1 text-gray-600">$25/month</p>
              <ul className="mt-2 text-gray-600 list-disc list-inside space-y-1">
                <li>5 consultations per month</li>
                <li>Access to specialists</li>
                <li>Priority scheduling</li>
                <li>24/7 support</li>
              </ul>
              <button className="mt-4 w-full py-2 px-4 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm">
                Select Plan
              </button>
            </div>

            {/* Premium Plan */}
            <div className="rounded-xl border border-gray-200 p-4 sm:p-5 hover:shadow-md transition">
              <h3 className="text-lg font-medium text-gray-900">Premium Plan</h3>
              <p className="mt-1 text-gray-600">$50/month</p>
              <ul className="mt-2 text-gray-600 list-disc list-inside space-y-1">
                <li>Unlimited consultations</li>
                <li>Access to top-tier specialists</li>
                <li>Priority scheduling</li>
                <li>Health check-up package</li>
                <li>24/7 support</li>
              </ul>
              <button className="mt-4 w-full py-2 px-4 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm">
                Select Plan
              </button>
            </div>
          </div>
        </section>

        {/* Benefits Section (same content) */}
        <section className="bg-white shadow-sm rounded-2xl p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Why Choose Our Plans?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="rounded-xl border border-gray-200 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-medium text-gray-900">Flexible Options</h3>
              <p className="mt-1 text-gray-600">
                Select a plan that suits your needs, from basic consultations to comprehensive care.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-medium text-gray-900">Expert Care</h3>
              <p className="mt-1 text-gray-600">
                Access a network of experienced doctors and specialists at your convenience.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-medium text-gray-900">Affordable Pricing</h3>
              <p className="mt-1 text-gray-600">
                Get quality healthcare services at competitive prices with no hidden fees.
              </p>
            </div>
          </div>
        </section>

        {/* Subscription Form Section (same content) */}
        <section className="bg-white shadow-sm rounded-2xl p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Subscribe to a Plan</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
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
                  className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                  placeholder="Enter your email"
                  required
                />
              </div>
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
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
              >
                <option value="basic">Basic Plan ($10/month)</option>
                <option value="standard">Standard Plan ($25/month)</option>
                <option value="premium">Premium Plan ($50/month)</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full inline-flex justify-center items-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Subscribe Now
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default HealthPlansPage;
