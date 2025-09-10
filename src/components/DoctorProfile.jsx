import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const DoctorProfile = ({ doctor }) => {
  if (!doctor) {
    return <div className="text-center p-4 text-white bg-gray-800 rounded-lg">Loading doctor details...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 mb-6 md:mb-10 bg-white shadow-lg p-4 md:p-6 rounded-xl border border-gray-200">
      <div className="flex flex-col items-center md:items-start">
        <img
          src={doctor.image || 'https://via.placeholder.com/150'}
          alt={doctor.doctor_name}
          className="w-40 h-40 rounded-full object-cover bg-gray-100 border-2 border-gray-200"
        />
        <div className="flex flex-col mt-4 space-y-2">
          {doctor.qualifications && (
            <div className="flex items-center">
              <span className="text-blue-600 text-xs mr-1">🏫</span>
              <p className="text-gray-600 text-sm">{doctor.qualifications}</p>
            </div>
          )}
          {doctor.institution && (
            <div className="flex items-center">
              <span className="text-blue-600 text-xs mr-1">🌐</span>
              <p className="text-gray-600 text-sm">{doctor.institution}</p>
            </div>
          )}
          {doctor.certification && (
            <div className="flex items-center">
              <span className="text-blue-600 text-xs mr-1">📜</span>
              <p className="text-gray-600 text-sm">{doctor.certification}</p>
            </div>
          )}
          {/* <div className="flex items-center">
            <span className="text-blue-600 text-xs mr-1">⏳</span>
            <p className="text-gray-600 text-sm">{doctor.experience}</p>
          </div>
          <div className="flex items-center">
            <span className="text-blue-600 text-xs mr-1">🆔</span>
            <p className="text-gray-600 text-sm">ID: {doctor.id}</p>
          </div> */}
        </div>
      </div>
      <div className="flex-1 space-y-2 md:space-y-3 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">{doctor.doctor_name}</h2>
            <p className="text-gray-600 font-medium text-sm md:text-base">{doctor.specialty}</p>
          </div>
          <div className="flex space-x-2 mt-2 md:mt-0">
            {/* <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm md:text-base hover:bg-blue-700">
              Book Appointment
            </button> */}
            {doctor.contact && (
              <a
                href={`tel:${doctor.contact}`}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm md:text-base hover:bg-gray-300"
              >
                <span role="img" aria-label="phone">📞</span>
              </a>
            )}
            {doctor.linkedin && (
              <a
                href={doctor.linkedin}
                className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm md:text-base hover:bg-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span role="img" aria-label="linkedin">Ⓢ</span>
              </a>
            )}
          </div>
        </div>
        <p className="text-gray-600 text-sm md:text-base">
          Experience: <span className="font-medium">{doctor.experience}</span> | Rating:{' '}
          <span className="font-medium">{doctor.rating || 'N/A'}</span>
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="space-y-2">
            <h3 className="text-gray-700 font-semibold text-sm md:text-base">About Doctor</h3>
            <div className="flex space-x-2">
              <p className="text-gray-600 text-sm md:text-base">
                Gender: <span className="font-medium">{doctor.gender || 'N/A'}</span>
              </p>
              <p className="text-gray-600 text-sm md:text-base">
                Languages: <span className="font-medium">{doctor.languages || 'N/A'}</span>
              </p>
            </div>
            <div className="flex space-x-2">
              <p className="text-gray-600 text-sm md:text-base">Modes:</p>
              <div className="flex space-x-1">
                <span className="text-gray-600 text-sm md:text-base font-medium">Offline</span>
                <span className="text-gray-600 text-sm md:text-base font-medium">/</span>
                <span className="text-gray-600 text-sm md:text-base font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {doctor.expertise && (
            <div className="space-y-2">
              <h3 className="text-gray-700 font-semibold text-sm md:text-base">Medical Expertise</h3>
              {doctor.expertise.map((item, index) => (
                <p key={index} className="text-gray-600 text-sm md:text-base">{item}</p>
              ))}
              {doctor.success_rate && (
                <p className="text-gray-600 text-sm md:text-base">{doctor.success_rate} Success rate</p>
              )}
            </div>
          )}
          {doctor.techniques && (
            <div className="space-y-2">
              <h3 className="text-gray-700 font-semibold text-sm md:text-base">Techniques Known</h3>
              {doctor.techniques.map((technique, index) => (
                <p key={index} className="text-gray-600 text-sm md:text-base">{technique}</p>
              ))}
            </div>
          )}
          {doctor.hospital && (
            <div className="space-y-2">
              <h3 className="text-gray-700 font-semibold text-sm md:text-base">{doctor.hospital.name}</h3>
              <p className="text-gray-600 text-sm md:text-base">{doctor.hospital.location}</p>
              <p className="text-gray-600 text-sm md:text-base">{doctor.hospital.hours}</p>
            </div>
          )}
        </div>
        <div className="flex items-start gap-2 mt-2">
          <FaInfoCircle className="mt-1 text-gray-600" />
          <p className="text-gray-600 text-sm md:text-base">
            {doctor.about || 'Experienced and compassionate doctor.'}
          </p>
        </div>
        <div className="mt-4 inline-block px-4 py-2 border border-gray-300 rounded-md bg-gray-50 shadow-sm">
          <span className="text-gray-800 font-bold text-sm md:text-base">Fee: </span>
          <span className="text-gray-800 font-semibold text-sm md:text-base">₹{doctor.consultation_fee}</span>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;