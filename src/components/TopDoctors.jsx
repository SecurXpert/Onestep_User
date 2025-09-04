import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

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

const TopDoctors = () => {
  const navigate = useNavigate();
  const { topdoctors } = useContext(AppContext)

  const renderDoctorCards = () => {
    return topdoctors.slice(0, 5).map((doctor) => (
      <div
        key={doctor._id}
        onClick={() => navigate(`/appointment/${doctor.doctor_id}`)}
        className="w-64 rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:-translate-y-1 bg-custom-blue"
      >
        {/* Image Section */}
        <div className="relative w-full h-40 bg-gray-100 flex items-center justify-center">
          <img
            src={doctor.image}
            alt={doctor.doctor_name}
            className="w-full h-full object-contain"
          />
          {/* Stars positioned at bottom-left */}
          <div className="absolute bottom-2 left-2 flex gap-0.5 drop-shadow-md">
    {renderStars(doctor.rating, 'text-xs')}
  </div>
        </div>

        {/* Text Section */}
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-white mb-1">
            {doctor.doctor_name}
          </h3>
          <p className="text-white text-sm mb-2">{doctor.specialty}</p>
          <p className="text-white text-sm">{doctor.experience}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-b3d8e4-gradient py-1">
      {/* <button
        onClick={refreshDoctors}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Refresh Doctors
      </button> */}
      <div className="w-full max-w-6xl mx-auto py-10 px-4 ">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Top Doctors</h2>
        <p className="text-center text-gray-600 mb-6">
          Choose your specialist from our expert doctors.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {renderDoctorCards()}
        </div>
      </div>
    </div>
  );
};

export default TopDoctors;