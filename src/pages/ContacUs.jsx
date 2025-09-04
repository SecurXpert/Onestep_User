import React, { useState } from 'react';
import myImage from '../assets/contactus-1.png';
import { FaPaperPlane } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name' && value && !/^[a-zA-Z\s]*$/.test(value)) {
      setErrors({ ...errors, [name]: 'Name can only contain letters and spaces' });
      return;
    }

    if (name === 'phone_number' && value && !/^\d*$/.test(value)) {
      setErrors({ ...errors, [name]: 'Phone number can only contain numbers' });
      return;
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone_number.trim()) newErrors.phone_number = 'Phone number is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit called');
    const formErrors = validateForm();
    console.log('Form errors:', formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      try {
        console.log('Attempting API call with data:', formData);
        // Retrieve access token from sessionStorage
        const token = sessionStorage.getItem('access_token');
        if (!token) {
          throw new Error('No access token found. Please log in.');
        }

        // Set headers with Bearer token
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        const response = await fetch('https://api.onestepmedi.com:8000/contact/contact_us', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to submit form');
        }

        setFormData({
          name: '',
          email: '',
          phone_number: '',
          subject: '',
          message: '',
        });
        alert('Message sent successfully!');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to send message. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        <div className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-3xl font-bold text-custom-blue mb-4 tracking-tight">
            Get In Touch
          </h2>
          <p className="text-custom-blue mb-8 text-lg max-w-lg">
            Have a question or idea? Fill out the form below, and we'll respond promptly!
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder=" "
                className={`w-full peer bg-transparent border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-indigo-500 transition-all duration-300 ${errors.name ? 'border-red-400' : ''}`}
                aria-label="Your Name"
              />
              <label
                htmlFor="name"
                className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
              >
                Your Name
              </label>
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                className={`w-full peer bg-transparent border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-indigo-500 transition-all duration-300 ${errors.email ? 'border-red-400' : ''}`}
                aria-label="Your Email"
              />
              <label
                htmlFor="email"
                className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
              >
                Your Email
              </label>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="relative">
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder=" "
                className={`w-full peer bg-transparent border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-indigo-500 transition-all duration-300 ${errors.phone_number ? 'border-red-400' : ''}`}
                aria-label="Your Phone Number"
              />
              <label
                htmlFor="phone_number"
                className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
              >
                Your Phone Number
              </label>
              {errors.phone_number && <p className="text-red-400 text-sm mt-1">{errors.phone_number}</p>}
            </div>
            <div className="relative">
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder=" "
                className={`w-full peer bg-transparent border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-indigo-500 transition-all duration-300 ${errors.subject ? 'border-red-400' : ''}`}
                aria-label="Subject"
              />
              <label
                htmlFor="subject"
                className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
              >
                Subject
              </label>
              {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
            </div>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                rows="5"
                className={`w-full peer bg-transparent border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-indigo-500 transition-all duration-300 ${errors.message ? 'border-red-400' : ''}`}
                aria-label="Your Message"
              ></textarea>
              <label
                htmlFor="message"
                className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
              >
                Your Message
              </label>
              {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center justify-center bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-600 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <FaPaperPlane className="mr-2" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative w-full h-96 rounded-xl overflow-hidden group mb-8 hidden sm:block">
            <img
              src={myImage}
              alt="Contact Us"
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-xl group-hover:border-indigo-600/30 transition-colors duration-300"></div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-custom-blue text-lg">Email</h4>
              <p className="text-gray-600">support@onestepmedi.com</p>
            </div>
            <div>
              <h4 className="font-semibold text-custom-blue text-lg">Phone</h4>
              <p className="text-gray-600">+91 7993256679</p>
            </div>
            <div>
              <h4 className="font-semibold text-custom-blue text-lg"> Our Co-operate Office Address</h4>
              <p className="text-gray-600">
                5th Floor, Krishna Towers, 100 Feet Rd, Madhapur<br /> Hyderabad, Telangana 500081, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;