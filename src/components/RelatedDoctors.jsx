import React, { useState } from 'react';

const RelatedDoctors = ({ doctors, specialty, date, time, onSelectDoctor, patientInfo }) => {
  const [selectedSlot, setSelectedSlot] = useState(null); // Track single selected slot globally

  const handleSlotClick = (doctorId, slot) => {
    const newSelectedSlot = { doctorId, slot };
    setSelectedSlot(newSelectedSlot); // Store single selected slot
    onSelectDoctor(doctorId, slot); // Call parent handler
  };

  console.log('RelatedDoctors props:', { doctors, specialty, date, time, patientInfo });

  if (!doctors || doctors.length === 0) {
    return (
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-purple-100 mb-6 md:mb-10">
        <h3 className="text-lg md:text-xl font-semibold text-purple-700 mb-4 md:mb-6">
          Alternative Doctors for {specialty}
        </h3>
        <div className="text-center text-sm md:text-base text-gray-600">
          No alternative doctors available for {specialty} on{' '}
          {date
            ? new Date(date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            : 'the selected date'}.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-purple-100 mb-6 md:mb-10">
      <h3 className="text-lg md:text-xl font-semibold text-purple-700 mb-4 md:mb-6">
        Alternative Doctors for {specialty}
      </h3>
      <p className="text-sm md:text-base text-gray-600 mb-4">
        The selected doctor is unavailable at {time} on{' '}
        {date
          ? new Date(date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          : 'the selected date'}
        . Consider these alternative doctors:
      </p>
      <div className="space-y-6 md:space-y-8">
        {doctors.map((doctor) => (
          <div
            key={doctor.doctor_id}
            className="flex flex-col md:flex-row items-start gap-4 md:gap-6 border-b border-gray-200 pb-4 md:pb-6"
          >
            <img
              src={doctor.image}
              alt={doctor.doctor_name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border border-purple-200"
            />
            <div className="flex-1">
              <h4 className="text-base md:text-lg font-semibold text-gray-800">{doctor.doctor_name}</h4>
              <p className="text-sm md:text-base text-gray-600">{doctor.specialization_name}</p>
              <p className="text-sm md:text-base text-gray-600">Fee: ${doctor.consultation_fee}</p>
              <div className="mt-3 md:mt-4">
                <p className="text-sm md:text-base font-medium text-gray-700 mb-2">Available Time Slots:</p>
                {doctor.time_slots && doctor.time_slots.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
                    {doctor.time_slots.map((slot, index) => {
                      const isSelected =
                        selectedSlot?.doctorId === doctor.doctor_id && selectedSlot?.slot === slot;
                      return (
                        <button
                          key={`${doctor.doctor_id}-${slot}-${index}`}
                          onClick={() => handleSlotClick(doctor.doctor_id, slot)}
                          className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-medium border text-center transition ${
                            isSelected
                              ? 'bg-purple-600 text-white'
                              : 'bg-white border-purple-500 text-purple-600 hover:bg-purple-50'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm md:text-base text-red-600">
                    No available time slots for this doctor.
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;