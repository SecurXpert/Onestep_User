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

      // Check prescriptions for each appointment
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
        } catch {
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
        const link = document.createElement("a");
        link.href = receiptUrl;
        link.download = `receipt_${appointmentId}.pdf`;
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
    <main className="md:ml-64 min-h-screen bg-gray-50">
      <div className="h-screen overflow-y-auto scrollbar-hide">
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

        {/* Hero header (design only; content unchanged) */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-500 opacity-90" />
          <svg
            className="absolute -top-10 -right-10 w-[320px] sm:w-[420px] opacity-20"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fill="#ffffff"
              d="M46.3,-60.4C58.5,-52.6,65.7,-39.2,70.8,-24.9C75.8,-10.6,78.6,4.7,73.7,17.5C68.7,30.4,56,40.7,42.5,51.8C29,62.8,14.5,74.5,-0.4,75.1C-15.3,75.7,-30.6,65.1,-44.7,53.7C-58.9,42.4,-71.9,30.4,-77,15.3C-82.1,0.3,-79.4,-18,-70.9,-31.7C-62.4,-45.4,-48.1,-54.6,-33.6,-62.9C-19.1,-71.2,-9.6,-78.6,3.1,-83.1C15.7,-87.6,31.5,-89.1,46.3,-60.4Z"
            />
          </svg>
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <h1 className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              My Appointments
            </h1>
            <p className="mt-3 text-center text-indigo-100">
              View status, complete payments, and join your consultations.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {error && (
            <p className="text-center text-red-500">{error}</p>
          )}

          {appointments.length === 0 && !error ? (
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-8 text-center">
              <p className="text-gray-500">No appointments booked yet.</p>
            </div>
          ) : (
            appointments.map((appt) => (
              <div
                key={appt.id}
                className="group bg-white rounded-2xl p-5 shadow-sm ring-1 ring-gray-100 hover:shadow-lg hover:ring-indigo-100 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{appt.doctorName}</h2>
                    <p className="text-gray-600">{appt.specialization}</p>
                  </div>
                  <div className="text-sm sm:text-right text-gray-700">
                    <p>
                      {appt.date} at {appt.time}
                    </p>
                    <p className="capitalize">Status: {appt.status}</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100 my-3" />

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {appt.status === "pending" && !showPayment && (
                    <button
                      onClick={() => handleProceedToPayment(appt)}
                      className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    >
                      Proceed to Payment
                    </button>
                  )}

                  {showPayment && selectedAppointment && selectedAppointment.id === appt.id && (
                    <div className="w-full sm:w-auto">
                      <RazorpayPayment
                        appointmentId={selectedAppointment.id}
                        amount={parseFloat(selectedAppointment.fees || "200")}
                        onSuccess={() => handlePaymentSuccess(selectedAppointment.id)}
                        doctorName={selectedAppointment.doctorName || "Unknown"}
                        patientEmail={selectedAppointment.patientEmail || "user@example.com"}
                      />
                    </div>
                  )}

                  {appt.status === "confirmed" && (
                    <>
                      <span className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        Payment Done
                      </span>
                      <button
                        onClick={() => handleDownloadReceipt(appt.id)}
                        className="inline-flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500/40"
                      >
                        Download Receipt
                      </button>

                      {appt.zoomJoinUrl && (
                        <a
                          href={appt.zoomJoinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="zoom-button bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
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
                          className="inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40"
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
        </section>
      </div>
    </main>
  );
};

export default MyAppointment;
