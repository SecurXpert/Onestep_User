import React, { useState } from 'react';
import { AppContext } from '../../context/AppContext';

const AddDoctorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    experience_years: '',
    hospital: '',
    total_patients: '',
    status: false,
    label1: '',
    label2: '',
    label3: '',
    quote: '',
    about: '',
    doctor_id: '',
    profile_img_left: null,
    profile_img_right: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) || '' : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setError('Please upload a JPEG or PNG image');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError('Image size must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, [name]: reader.result }));
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = [
      'name', 'specialization', 'experience_years', 'hospital', 
      'total_patients', 'status', 'label1', 'label2', 'label3', 
      'quote', 'about', 'doctor_id', 'profile_img_left', 'profile_img_right',
    ];

    if (requiredFields.some((field) => !formData[field])) {
      setError('All fields are required');
      return;
    }

    if (isNaN(formData.experience_years) || formData.experience_years < 0) {
      setError('Experience years must be a positive number');
      return;
    }

    if (isNaN(formData.total_patients) || formData.total_patients < 0) {
      setError('Total patients must be a positive number');
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'profile_img_left' || key === 'profile_img_right') {
        if (value) {
          // Convert base64 to blob for file upload
          const byteString = atob(value.split(',')[1]);
          const mimeString = value.split(',')[0].split(':')[1].split(';')[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: mimeString });
          formDataToSend.append(key, blob, `${key}.png`);
        }
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await fetch('https://api.onestepmedi.com:8000/doctors/create', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to create doctor');
      }

      setSuccess('Doctor added successfully');
      setFormData({
        name: '',
        specialization: '',
        experience_years: '',
        hospital: '',
        total_patients: '',
        status: false,
        label1: '',
        label2: '',
        label3: '',
        quote: '',
        about: '',
        doctor_id: '',
        profile_img_left: null,
        profile_img_right: null,
      });
      setError('');
      document.getElementById('profile_img_left').value = '';
      document.getElementById('profile_img_right').value = '';
    } catch (err) {
      setError(err.message || 'An error occurred while adding the doctor');
      setSuccess('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-blue-500 mb-4">Add New Doctor</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder=" "
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="Doctor name"
          />
          <label
            htmlFor="name"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
          >
            Doctor Name
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleInputChange}
            placeholder=" "
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="Specialization"
          />
          <label
            htmlFor="specialization"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
          >
            Specialization
          </label>
        </div>
        <div className="relative">
          <input
            type="number"
            name="experience_years"
            value={formData.experience_years}
            onChange={handleInputChange}
            placeholder=" "
            min="0"
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="Experience Years"
          />
          <label
            htmlFor="experience_years"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
          >
            Experience Years
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            name="hospital"
            value={formData.hospital}
            onChange={handleInputChange}
            placeholder=" "
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="Hospital"
          />
          <label
            htmlFor="hospital"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
          >
            Hospital
          </label>
        </div>
        <div className="relative">
          <input
            type="number"
            name="total_patients"
            value={formData.total_patients}
            onChange={handleInputChange}
            placeholder=" "
            min="0"
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="Total Patients"
          />
          <label
            htmlFor="total_patients"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
          >
            Total Patients
          </label>
        </div>
        <div className="relative">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={handleInputChange}
              className="h-5 w-5 text-blue-500 border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <span className="text-sm text-blue-500">Active Status</span>
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            name="label1"
            value={formData.label1}
            onChange={handleInputChange}
            placeholder=" "
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="Label 1"
          />
          <label
            htmlFor="label1"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
          >
            Label 1
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            name="label2"
            value={formData.label2}
            onChange={handleInputChange}
            placeholder=" "
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="Label 2"
          />
          <label
            htmlFor="label2"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
          >
            Label 2
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            name="label3"
            value={formData.label3}
            onChange={handleInputChange}
            placeholder=" "
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="Label 3"
          />
          <label
            htmlFor="label3"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
          >
            Label 3
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            name="quote"
            value={formData.quote}
            onChange={handleInputChange}
            placeholder=" "
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="Quote"
          />
          <label
            htmlFor="quote"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
          >
            Quote
          </label>
        </div>
        <div className="relative">
          <textarea
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            placeholder=" "
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="About"
            rows="4"
          />
          <label
            htmlFor="about"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
          >
            About
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            name="doctor_id"
            value={formData.doctor_id}
            onChange={handleInputChange}
            placeholder=" "
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="Doctor ID"
          />
          <label
            htmlFor="doctor_id"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
          >
            Doctor ID
          </label>
        </div>
        <div className="relative">
          <input
            type="file"
            id="profile_img_left"
            name="profile_img_left"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="Profile Image Left"
          />
          <label
            htmlFor="profile_img_left"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
          >
            Profile Image Left
          </label>
        </div>
        <div className="relative">
          <input
            type="file"
            id="profile_img_right"
            name="profile_img_right"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="Profile Image Right"
          />
          <label
            htmlFor="profile_img_right"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
          >
            Profile Image Right
          </label>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="md:col-span-2 bg-blue-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-all duration-300 shadow-[0_4px_12px_rgba(59,130,246,0.1)] hover:shadow-[0_6px_20px_rgba(147,51,234,0.15)] hover:-translate-y-1"
        >
          Add Doctor
        </button>
      </div>
    </div>
  );
};

export default AddDoctorForm;