import React, { useState } from 'react';

const AddSectionForm = () => {
 const [formData, setFormData] = useState({
    doctor_id: '',
    section_type: '',
    image_url: null,
    id: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validImageTypes = ['image/jpeg', 'image/png'];
    const maxFileSize = 2 * 1024 * 1024; // 2MB

    const invalidFiles = files.filter(
      (file) => !validImageTypes.includes(file.type) || file.size > maxFileSize
    );

    if (invalidFiles.length > 0) {
      setError('All images must be JPEG/PNG and less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image_url: reader.result,
      }));
      setError('');
    };
    reader.readAsDataURL(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { doctor_id, section_type, image_url, id, description } = formData;

    if (!doctor_id || !section_type || !image_url || !id) {
      setError('Doctor ID, Section Type, Image, and ID are required');
      return;
    }

    // Prepare form data for backend (multipart/form-data)
const formDataToSend = new FormData();
    formDataToSend.append('doctor_id', doctor_id);
    formDataToSend.append('section_type', section_type);
    formDataToSend.append('id', id);
    if (description) formDataToSend.append('description', description);
    if (image_url) {
      const byteString = atob(image_url.split(',')[1]);
      const mimeString = image_url.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      formDataToSend.append('image_url', blob, 'section_image.png');
    }

    try {
      const response = await fetch(`https://api.onestepmedi.com:8000/doctors/sections/${doctor_id}`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to create section');
      }

      setSuccess('Section added successfully');
      setFormData({
        doctor_id: '',
        section_type: '',
        image_url: null,
        id: '',
        description: '',
      });
      setError('');
      document.getElementById('image_url').value = '';
    } catch (err) {
      setError(err.message || 'An error occurred while adding the section');
      setSuccess('');
    }
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-blue-500 mb-4">Add New Section</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            type="text"
            name="section_type"
            value={formData.section_type}
            onChange={handleInputChange}
            placeholder=" "
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="Section Type"
          />
          <label
            htmlFor="section_type"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
          >
            Section Type
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            placeholder=" "
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="Section ID"
          />
          <label
            htmlFor="id"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
          >
            Section ID
          </label>
        </div>
        <div className="relative">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder=" "
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="Description"
            rows="4"
          />
          <label
            htmlFor="description"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
          >
            Description (Optional)
          </label>
        </div>
        <div className="relative md:col-span-2">
          <input
            type="file"
            id="image_url"
            name="image_url"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            className="w-full peer bg-transparent border-2 border-blue-500 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-purple-600 transition-all duration-300"
            aria-label="Image"
          />
          <label
            htmlFor="image_url"
            className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
          >
            Image (JPEG/PNG, max 2MB)
          </label>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="md:col-span-2 bg-blue-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-all duration-300 shadow-[0_4px_12px_rgba(59,130,246,0.1)] hover:shadow-[0_6px_20px_rgba(147,51,234,0.15)] hover:-translate-y-1"
        >
          Add Section
        </button>
      </div>
    </div>
  );
};

export default AddSectionForm;