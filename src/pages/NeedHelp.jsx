import React, { useState } from 'react';

const HelpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to an API)
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Header (design-only; content unchanged) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-500 opacity-90" />
        <svg
          className="absolute -top-10 -right-10 w-[320px] sm:w-[420px] opacity-20"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill="#ffffff"
            d="M46.3,-60.4C58.5,-52.6,65.7,-39.2,70.8,-24.9C75.8,-10.6,78.6,4.7,73.7,17.5C68.7,30.4,56,40.7,42.5,51.8C29,62.8,14.5,74.5,-0.4,75.1C-15.3,75.7,-30.6,65.1,-44.7,53.7C-58.9,42.4,-71.9,30.4,-77,15.3C-82.1,0.3,-79.4,-18,-70.9,-31.7C-62.4,-45.4,-48.1,-54.6,-33.6,-62.9C-19.1,-71.2,-9.6,-78.6,3.1,-83.1C15.7,-87.6,31.5,-89.1,46.3,-60.4Z"
          />
        </svg>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Help &amp; Support
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-indigo-100">
            We&apos;re here to assist you with your doctor appointment and consultation needs.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-6xl w-full space-y-8 px-4 sm:px-6 lg:px-8 py-8">
        {/* FAQ Section (content unchanged) */}
        <div className="bg-white shadow-sm rounded-2xl p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            <div className="rounded-xl border border-gray-200 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-medium text-gray-900">
                How do I book an appointment?
              </h3>
              <p className="mt-1 text-gray-600">
                Navigate to the &quot;Book Appointment&quot; section, select your preferred doctor, choose a
                time slot, and confirm your booking.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-medium text-gray-900">
                Can I cancel or reschedule my appointment?
              </h3>
              <p className="mt-1 text-gray-600">
                Yes, go to &quot;My Appointments&quot; in your account, select the appointment, and choose
                &quot;Cancel&quot; or &quot;Reschedule.&quot;
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4 hover:shadow-md transition">
              <h3 className="text-lg font-medium text-gray-900">
                How do I join a virtual consultation?
              </h3>
              <p className="mt-1 text-gray-600">
                You’ll receive a link to the virtual consultation room in your email or account
                dashboard before your appointment time.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information Section (content unchanged) */}
        <div className="bg-white shadow-sm rounded-2xl p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            Reach out to us for any assistance. Our support team is available 24/7.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-gray-200 p-4 hover:shadow-md transition">
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> support@healthapp.com
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4 hover:shadow-md transition">
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span> +1 (800) 123-4567
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4 hover:shadow-md transition">
              <p className="text-gray-600">
                <span className="font-medium">Address:</span> 123 Health St, Wellness City, HC 12345
              </p>
            </div>
          </div>
        </div>

        {/* Support Form Section (content & fields unchanged) */}
        <div className="bg-white shadow-sm rounded-2xl p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Send Us a Message</h2>
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
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
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
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full inline-flex justify-center items-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default HelpPage;
