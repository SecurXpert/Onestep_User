import React, { useState } from 'react';

const RewardsPage = () => {
  const [formData, setFormData] = useState({
    rewardCode: '',
    email: '',
  });
  const [status, setStatus] = useState(null); // { type: 'success'|'error', message: string }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (status) setStatus(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle reward redemption logic here (e.g., send data to an API)
    console.log('Reward redemption submitted:', formData);
    setStatus({ type: 'success', message: 'Your reward request was submitted. Check your email for details.' });
    setFormData({ rewardCode: '', email: '' });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero / Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-500 opacity-90" />
        <svg
          className="absolute -top-10 -right-10 w-[360px] opacity-20"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path fill="#ffffff" d="M46.3,-60.4C58.5,-52.6,65.7,-39.2,70.8,-24.9C75.8,-10.6,78.6,4.7,73.7,17.5C68.7,30.4,56,40.7,42.5,51.8C29,62.8,14.5,74.5,-0.4,75.1C-15.3,75.7,-30.6,65.1,-44.7,53.7C-58.9,42.4,-71.9,30.4,-77,15.3C-82.1,0.3,-79.4,-18,-70.9,-31.7C-62.4,-45.4,-48.1,-54.6,-33.6,-62.9C-19.1,-71.2,-9.6,-78.6,3.1,-83.1C15.7,-87.6,31.5,-89.1,46.3,-60.4Z" />
        </svg>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">Rewards Program</h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-indigo-100">
              Earn points with every appointment and redeem them for exciting rewards!
            </p>
          </div>
        </div>
      </section>

      {/* Page content container */}
      <div className="mx-auto max-w-6xl w-full space-y-8 px-4 sm:px-6 lg:px-8 py-8">

        {/* Dismissible status (success/error) */}
        {status && (
          <div
            className={`rounded-lg border p-4 ${
              status.type === 'success'
                ? 'border-green-200 bg-green-50 text-green-800'
                : 'border-red-200 bg-red-50 text-red-800'
            }`}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm sm:text-base">{status.message}</p>
              <button
                onClick={() => setStatus(null)}
                className="ml-3 rounded-md px-2 py-1 text-xs font-semibold hover:bg-white/60"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* How It Works */}
        <section className="bg-white shadow-sm rounded-2xl p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Step 1 */}
            <div className="rounded-xl border border-gray-200 p-4 sm:p-5 hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-indigo-100 text-indigo-700 grid place-items-center font-bold">1</div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900">Earn Points</h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Get 10 points for every completed doctor appointment or consultation booked through our app.
              </p>
            </div>
            {/* Step 2 */}
            <div className="rounded-xl border border-gray-200 p-4 sm:p-5 hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-indigo-100 text-indigo-700 grid place-items-center font-bold">2</div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900">Redeem Rewards</h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Use your points to unlock discounts, free consultations, or exclusive health packages.
              </p>
            </div>
            {/* Step 3 */}
            <div className="rounded-xl border border-gray-200 p-4 sm:p-5 hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-indigo-100 text-indigo-700 grid place-items-center font-bold">3</div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900">Track Your Points</h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Check your points balance in your account dashboard under &quot;My Rewards.&quot;
              </p>
            </div>
          </div>
        </section>

        {/* Available Rewards */}
        <section className="bg-white shadow-sm rounded-2xl p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Available Rewards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="group rounded-xl border border-gray-200 p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <h3 className="text-base font-medium text-gray-900">Free Consultation</h3>
                <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2 py-1 rounded-full">50 pts</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Redeem 50 points for a free 15-minute consultation with any doctor.
              </p>
            </div>

            <div className="group rounded-xl border border-gray-200 p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <h3 className="text-base font-medium text-gray-900">$10 Discount</h3>
                <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2 py-1 rounded-full">30 pts</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Use 30 points to get a $10 discount on your next appointment.
              </p>
            </div>

            <div className="group rounded-xl border border-gray-200 p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <h3 className="text-base font-medium text-gray-900">Health Package</h3>
                <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2 py-1 rounded-full">100 pts</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Redeem 100 points for a premium health check-up package.
              </p>
            </div>

            <div className="group rounded-xl border border-gray-200 p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <h3 className="text-base font-medium text-gray-900">Priority Booking</h3>
                <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2 py-1 rounded-full">20 pts</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Use 20 points to get priority scheduling for your next appointment.
              </p>
            </div>
          </div>
        </section>

        {/* Redeem Form */}
        <section className="bg-white shadow-sm rounded-2xl p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Redeem Your Rewards</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Reward Code */}
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
                  className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                  placeholder="Enter your reward code"
                  autoComplete="one-time-code"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">Typically a mix of letters & numbers (e.g., RX4-9KJ).</p>
              </div>

              {/* Email */}
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
                  autoComplete="email"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">We’ll send confirmation and next steps here.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="submit"
                className="inline-flex justify-center items-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Redeem Reward
              </button>
              <span className="text-xs text-gray-500">Redemptions are processed within 24–48 hours.</span>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default RewardsPage;
