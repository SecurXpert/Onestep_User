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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Help & Support</h1>
          <p className="mt-4 text-lg text-gray-600">
            We're here to assist you with your doctor appointment and consultation needs.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                How do I book an appointment?
              </h3>
              <p className="mt-1 text-gray-600">
                Navigate to the "Book Appointment" section, select your preferred doctor, choose a
                time slot, and confirm your booking.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Can I cancel or reschedule my appointment?
              </h3>
              <p className="mt-1 text-gray-600">
                Yes, go to "My Appointments" in your account, select the appointment, and choose
                "Cancel" or "Reschedule."
              </p>
            </div>
            <div>
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

        {/* Contact Information Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            Reach out to us for any assistance. Our support team is available 24/7.
          </p>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> support@healthapp.com
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Phone:</span> +1 (800) 123-4567
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Address:</span> 123 Health St, Wellness City, HC 12345
            </p>
          </div>
        </div>

        {/* Support Form Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Send Us a Message</h2>
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;