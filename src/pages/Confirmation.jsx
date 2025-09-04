import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Confirmation = () => {
  const { state } = useLocation();

  if (!state) return <div className="p-10 text-center text-red-600">No appointment details found.</div>;

  const { appointmentId, doctor, selectedDate, selectedTime } = state;

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white shadow p-6 rounded-lg text-center">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Appointment Confirmed!</h1>

      <div className="space-y-2 text-gray-700">
        <p><strong>Appointment ID:</strong> <span className="text-purple-700">{appointmentId}</span></p>
        <p><strong>Doctor:</strong> {doctor.doctor_name}</p>
        <p><strong>Date:</strong> {selectedDate}</p>
        <p><strong>Time:</strong> {selectedTime}</p>
      </div>

      <Link
        to="/myappointment"
        className="inline-block mt-6 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
      >
        Go to My Appointments
      </Link>
    </div>
  );
};

export default Confirmation;