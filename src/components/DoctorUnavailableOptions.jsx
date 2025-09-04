
import React from 'react';

const DoctorUnavailableOptions = ({
  doctor,
  similarDoctors,
  nextAvailableSlots,
  unavailableTime,
  onForward,
  onReschedule,
}) => {
  return (
    <div className="bg-orange-50 border border-orange-200 p-6 rounded-xl mt-6 shadow">
      <h3 className="text-lg font-semibold text-orange-700 mb-3">
        Doctor Unavailable at {unavailableTime}
      </h3>
      <p className="text-sm text-gray-700 mb-6">
        You have marked this as an emergency. You can either forward your request or wait for the next available slot.
      </p>

      {/* Option 1: Forward */}
      <div className="mb-6">
        <h4 className="font-semibold text-purple-700 mb-2">1. Forward to Similar Doctors</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {similarDoctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md cursor-pointer transition"
              onClick={() => onForward(doc)}
            >
              <img src={doc.image} alt={doc.name} className="w-full h-28 object-contain mb-2" />
              <h5 className="text-purple-700 font-semibold">{doc.name}</h5>
              <p className="text-sm text-gray-500">{doc.specialty}</p>
              <p className="text-sm text-blue-600">Available at {unavailableTime}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Option 2: Wait for next slot */}
      <div>
        <h4 className="font-semibold text-purple-700 mb-2">2. Wait for Next Available Slot</h4>
        {nextAvailableSlots.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {nextAvailableSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => onReschedule(slot)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                {slot}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-red-500">No other slots available for this doctor.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorUnavailableOptions;
