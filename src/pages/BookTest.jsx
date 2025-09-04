import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const BookTest = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    testType: '',
    visitType: 'direct',
    date: '',
    time: '',
    address: '',
  });
  const [errors, setErrors] = useState({});
  const [bookingConfirmation, setBookingConfirmation] = useState(null);

  // Mock API function to simulate booking
  const bookTest = async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          bookingId: `BOOK${Math.floor(Math.random() * 100000)}`,
          ...data,
          status: 'Confirmed',
          agentDetails: data.visitType === 'virtual' ? {
            name: 'John Doe',
            contact: '+91 98765 43210',
            estimatedArrival: `${data.date} ${data.time}`,
          } : null,
        });
      }, 1000);
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.testType) newErrors.testType = 'Please select a test type';
    if (!formData.visitType) newErrors.visitType = 'Please select a visit type';
    if (!formData.date) newErrors.date = 'Please select a date';
    if (!formData.time) newErrors.time = 'Please select a time slot';
    if (formData.visitType === 'virtual' && !formData.address.trim()) {
      newErrors.address = 'Please provide a valid address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate('/register');
      return;
    }
    if (!validateForm()) return;

    try {
      const booking = await bookTest(formData);
      setBookingConfirmation(booking);
      setFormData({
        testType: '',
        visitType: 'direct',
        date: '',
        time: '',
        address: '',
      });
    } catch (error) {
      console.error('Booking failed:', error);
      setErrors({ submit: 'Failed to book test. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Book a Diagnostic Test
        </h2>

        {bookingConfirmation ? (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
            <h3 className="text-lg font-semibold">Booking Confirmed!</h3>
            <p>Booking ID: {bookingConfirmation.bookingId}</p>
            <p>Test: {bookingConfirmation.testType}</p>
            <p>Visit Type: {bookingConfirmation.visitType === 'direct' ? 'Direct (In-Person)' : 'Virtual (Home Collection)'}</p>
            <p>Date: {bookingConfirmation.date}</p>
            <p>Time: {bookingConfirmation.time}</p>
            {bookingConfirmation.visitType === 'virtual' && (
              <>
                <p>Address: {bookingConfirmation.address}</p>
                <p>Agent: {bookingConfirmation.agentDetails.name}</p>
                <p>Contact: {bookingConfirmation.agentDetails.contact}</p>
                <p>Estimated Arrival: {bookingConfirmation.agentDetails.estimatedArrival}</p>
              </>
            )}
            <button
              onClick={() => setBookingConfirmation(null)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Book Another Test
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Test Type */}
            <div>
              <label htmlFor="testType" className="block text-sm font-medium text-gray-700">
                Test Type
              </label>
              <select
                id="testType"
                name="testType"
                value={formData.testType}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select a test</option>
                <option value="Blood Test">Blood Test</option>
                <option value="Full Body Checkup">Full Body Checkup</option>
                <option value="Thyroid Profile">Thyroid Profile</option>
                <option value="Diabetes Panel">Diabetes Panel</option>
              </select>
              {errors.testType && <p className="mt-1 text-sm text-red-600">{errors.testType}</p>}
            </div>

            {/* Visit Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Visit Type</label>
              <div className="mt-1 flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="visitType"
                    value="direct"
                    checked={formData.visitType === 'direct'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-600">Direct (In-Person)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="visitType"
                    value="virtual"
                    checked={formData.visitType === 'virtual'}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-600">Virtual (Home Collection)</span>
                </label>
              </div>
              {errors.visitType && <p className="mt-1 text-sm text-red-600">{errors.visitType}</p>}
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Preferred Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
            </div>

            {/* Time */}
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Preferred Time Slot
              </label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select a time slot</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
              </select>
              {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
            </div>

            {/* Address (for Virtual) */}
            {formData.visitType === 'virtual' && (
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address for Sample Collection
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your full address for agent visit"
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md hover:scale-105 text-sm"
              >
                Book Test
              </button>
              {errors.submit && <p className="mt-2 text-sm text-red-600 text-center">{errors.submit}</p>}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookTest;