import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { FaStar, FaStarHalfAlt, FaRegStar, FaTrash, FaEdit } from 'react-icons/fa';

const renderStars = (rating, size = 'text-xs') => {
  const stars = [];
  const rounded = Math.round(rating * 2) / 2;

  for (let i = 1; i <= 5; i++) {
    if (i <= rounded) {
      stars.push(<FaStar key={i} className={`text-yellow-400 ${size}`} />);
    } else if (i - 0.5 === rounded) {
      stars.push(<FaStarHalfAlt key={i} className={`text-yellow-400 ${size}`} />);
    } else {
      stars.push(<FaRegStar key={i} className={`text-gray-300 ${size}`} />);
    }
  }

  return stars;
};

const DoctorList = () => {
  const { topdoctors, setTopDoctors } = useContext(AppContext);
  const [editDoctor, setEditDoctor] = useState(null);
  const [formData, setFormData] = useState({ name: '', specialty: '', experience: '', rating: '', image: '', about: '', fees: '', address: '' });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  const handleDelete = (id) => {
    if (typeof setTopDoctors === 'function') {
      const updatedDoctors = topdoctors.filter((doctor) => doctor._id !== id);
      setTopDoctors(updatedDoctors);
    } else {
      console.error('setTopDoctors is not a function. Ensure AppContext is properly set up.');
    }
  };

  const handleEdit = (doctor) => {
    setEditDoctor(doctor._id);
    setFormData({
      name: doctor.doctor_name,
      specialty: doctor.specialty,
      experience: doctor.experience,
      rating: doctor.rating,
      image: doctor.image,
      about: doctor.about,
      fees: doctor.fees,
      address: doctor.address,
    });
    setImagePreview(doctor.image);
    setError('');
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (typeof setTopDoctors === 'function') {
      if (!formData.name || !formData.specialty || !formData.experience || !formData.rating || !formData.image || !formData.about || !formData.fees || !formData.address) {
        setError('All fields are required');
        return;
      }
      const updatedDoctors = topdoctors.map((doctor) =>
        doctor._id === editDoctor
          ? {
            ...doctor,
            ...formData,
            rating: parseFloat(formData.rating),
            experience: parseInt(formData.experience),
          }
          : doctor
      );
      setTopDoctors(updatedDoctors);
      setEditDoctor(null);
      setFormData({ name: '', specialty: '', experience: '', rating: '', image: '', about: '', fees: '', address: '' });
      setImagePreview(null);
      setError('');
    } else {
      console.error('setTopDoctors is not a function. Ensure AppContext is properly set up.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        setError('Please upload a valid image file (JPEG, PNG, or GIF)');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
        setImagePreview(reader.result);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const closeModal = () => {
    setEditDoctor(null);
    setFormData({ name: '', specialty: '', experience: '', rating: '', image: '', about: '', fees: '', address: '' });
    setImagePreview(null);
    setError('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-blue-500 mb-4">Doctor List</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-3 text-blue-500 font-semibold">Name</th>
              <th className="p-3 text-blue-500 font-semibold">Specialty</th>
              <th className="p-3 text-blue-500 font-semibold">Experience</th>
              <th className="p-3 text-blue-500 font-semibold">about</th>
              <th className="p-3 text-blue-500 font-semibold">fees</th>
              <th className="p-3 text-blue-500 font-semibold">address</th>
              <th className="p-3 text-blue-500 font-semibold">Rating</th>
              <th className="p-3 text-blue-500 font-semibold">Image</th>
              <th className="p-3 text-blue-500 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {topdoctors.length > 0 ? (
              topdoctors.map((doctor) => (
                <tr
                  key={doctor._id}
                  className="border-b hover:bg-blue-50 transition-all duration-300"
                >
                  <td className="p-3">{doctor.doctor_name}</td>
                  <td className="p-3">{doctor.specialty}</td>
                  <td className="p-3">{doctor.experience}</td>
                  <td className="p-3">{doctor.about}</td>
                  <td className="p-3">{doctor.fees}</td>
                  <td className="p-3">{doctor.address}</td>
                  <td className="p-3 flex gap-0.5">{renderStars(doctor.rating)}</td>
                  <td className="p-3">
                    <img
                      src={doctor.image}
                      alt={doctor.doctor_name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(doctor)}
                      className="text-blue-500 hover:text-blue-700 transition-all duration-300"
                      aria-label={`Edit ${doctor.doctor_name}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(doctor._id)}
                      className="text-red-500 hover:text-red-700 transition-all duration-300"
                      aria-label={`Delete ${doctor.doctor_name}`}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-3 text-center text-gray-600">
                  No doctors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold text-blue-500 mb-4">Edit Doctor</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="specialty"
                value={formData.specialty}
                onChange={handleInputChange}
                placeholder="Specialty"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Experience (years)"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="0"
              />
              <input
                type="text"
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                placeholder="about"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="number"
                name="fees"
                value={formData.fees}
                onChange={handleInputChange}
                placeholder="fees"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="0"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="address"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required

              />
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                placeholder="Rating (0-5)"
                step="0.5"
                min="0"
                max="5"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div>
                <label className="block text-gray-700 mb-1">Upload Image</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 w-24 h-24 object-cover rounded"
                  />
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorList;