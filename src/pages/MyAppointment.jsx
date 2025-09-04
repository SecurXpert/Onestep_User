import React, { useEffect, useState } from "react";
import AppointmentCard from "../components/AppointmentCard";
import RazorpayPayment from "./RazorpayPayment";

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [prescriptions, setPrescriptions] = useState({});
  const [showPayment, setShowPayment] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const fetchAppointments = async () => {
    try {
      const token = sessionStorage.getItem("access_token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch("https://api.onestepmedi.com:8000/appointments/my-appointments", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch appointments: ${response.status}`);
      }

      const data = await response.json();
      const unique = [];
      const seen = new Set();

      for (const appt of data) {
        if (!seen.has(appt.appointment_id)) {
          unique.push({
            id: appt.appointment_id,
            doctorName: appt.doctor_name,
            doctorId: appt.doctor_unique_id,
            patientName: appt.name,
            phoneNumber: appt.phone_number,
            patientId: appt.patient_id,
            specialization: appt.specialization,
            date: appt.preferred_date,
            time: appt.time_slot,
            appointmentType: appt.appointment_type,
            zoomStartUrl: appt.zoom_start_url,
            zoomJoinUrl: appt.zoom_join_url,
            rejectionReason: appt.rejection_reason,
            status: appt.status,
            createdAt: appt.created_at,
            expiresAt: appt.expires_at,
            patientEmail: appt.patientEmail || "user@example.com",
            fees: appt.consultation_fee || "200",
          });
          seen.add(appt.appointment_id);
        }
      }

      setAppointments(unique);
      setError(null);

      // Check for prescriptions for each appointment
      const prescriptionStatus = {};
      for (const appt of unique) {
        try {
          const prescriptionResponse = await fetch(
            `https://api.onestepmedi.com:8000/prescription/by-appointment/${appt.id}`,
            {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (prescriptionResponse.ok) {
            const prescriptionData = await prescriptionResponse.json();
            prescriptionStatus[appt.id] = prescriptionData;
          } else {
            prescriptionStatus[appt.id] = null;
          }
        } catch (err) {
          prescriptionStatus[appt.id] = null;
        }
      }
      setPrescriptions(prescriptionStatus);
    } catch (err) {
      setError(err.message);
      setAppointments([]);
    }
  };

  const handleProceedToPayment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowPayment(true);
  };

  const handleDownloadReceipt = async (appointmentId) => {
    try {
      const token = sessionStorage.getItem("access_token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`https://api.onestepmedi.com:8000/payment/${appointmentId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch receipt: ${response.status}`);
      }

      const data = await response.json();
      const receiptUrl = data.receipt_url;

      if (receiptUrl) {
        // Create a temporary anchor element to trigger the download
        const link = document.createElement("a");
        link.href = receiptUrl;
        link.download = `receipt_${appointmentId}.pdf`; // Suggest a filename for the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        throw new Error("Receipt URL not found in response");
      }
    } catch (err) {
      setError(`Failed to download receipt: ${err.message}`);
    }
  };

  const handleViewPrescription = (appointmentId) => {
    const prescription = prescriptions[appointmentId];
    if (prescription) {
      console.log(`Prescription for appointment ${appointmentId}:`, prescription);
    }
  };

  const handlePaymentSuccess = (appointmentId) => {
    const updatedAppointments = appointments.map((appt) =>
      appt.id === appointmentId
        ? { ...appt, status: "confirmed", payment: "completed" }
        : appt
    );
    setAppointments(updatedAppointments);
    const saved = JSON.parse(localStorage.getItem("myAppointments")) || [];
    const updatedSaved = saved.map((appt) =>
      appt.id === appointmentId
        ? { ...appt, status: "confirmed", payment: "completed" }
        : appt
    );
    localStorage.setItem("myAppointments", JSON.stringify(updatedSaved));
    setShowPayment(false);
    setSelectedAppointment(null);
  };

  useEffect(() => {
    fetchAppointments();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        fetchAppointments();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6 h-screen overflow-y-auto md:ml-64 scrollbar-hide">
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .zoom-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .zoom-icon {
          width: 20px;
          height: 20px;
        }
      `}</style>
      <h1 className="text-3xl font-bold text-center text-black mb-8">My Appointments</h1>

      {error && (
        <p className="text-center text-red-500">{error}</p>
      )}

      {appointments.length === 0 && !error ? (
        <p className="text-center text-gray-500">No appointments booked yet.</p>
      ) : (
        appointments.map((appt) => (
          <div key={appt.id} className="border rounded-lg p-4 bg-white shadow-md">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h2 className="text-xl font-semibold">{appt.doctorName}</h2>
                <p className="text-gray-600">{appt.specialization}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-700">{appt.date} at {appt.time}</p>
                <p className="text-gray-700 capitalize">Status: {appt.status}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              {appt.status === "pending" && !showPayment && (
                <button
                  onClick={() => handleProceedToPayment(appt)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Proceed to Payment
                </button>
              )}
              {showPayment && selectedAppointment && selectedAppointment.id === appt.id && (
                <RazorpayPayment
                  appointmentId={selectedAppointment.id}
                  amount={parseFloat(selectedAppointment.fees || "200")}
                  onSuccess={() => handlePaymentSuccess(selectedAppointment.id)}
                  doctorName={selectedAppointment.doctorName || "Unknown"}
                  patientEmail={selectedAppointment.patientEmail || "user@example.com"}
                />
              )}
              {appt.status === "confirmed" && (
                <>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Payment Done
                  </span>
                  <button
                    onClick={() => handleDownloadReceipt(appt.id)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Download Receipt
                  </button>
                  {appt.zoomJoinUrl && (
                    <a
                      href={appt.zoomJoinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="zoom-button bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      <svg className="zoom-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4-6h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H8c-.55 0-1-.45-1-1s.45-1 1-1h3V8c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1z"/>
                      </svg>
                      Join Zoom
                    </a>
                  )}
                  {prescriptions[appt.id] && (
                    <button
                      onClick={() => handleViewPrescription(appt.id)}
                      className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                    >
                      View Prescription
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyAppointment;