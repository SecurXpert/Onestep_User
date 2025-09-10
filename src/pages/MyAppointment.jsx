
import React, { useEffect, useState, Component } from "react";
import AppointmentCard from "../components/AppointmentCard";
import RazorpayPayment from "./RazorpayPayment";

// Error Boundary Component
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-500 text-center p-4">
          <p>Something went wrong: {this.state.error?.message}</p>
          <p>Please try again or contact support.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [prescriptions, setPrescriptions] = useState({});
  const [showPayment, setShowPayment] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

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

  const handleViewPrescription = async (appointmentId) => {
    try {
      console.log(`Fetching prescription for appointment ID: ${appointmentId}`);
      const token = sessionStorage.getItem("access_token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`https://api.onestepmedi.com:8000/prescription/by-appointment/${appointmentId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch prescription: ${response.status}`);
      }

      const prescriptionData = await response.json();
      console.log("Prescription API response:", prescriptionData);

      if (!prescriptionData || !Array.isArray(prescriptionData) || prescriptionData.length === 0) {
        setError("No prescription found for this appointment.");
        return;
      }

      setSelectedPrescription(prescriptionData[0]);
      setShowPrescriptionDialog(true);
      console.log("Dialog should open with prescription:", prescriptionData[0]);
    } catch (err) {
      console.error("Error fetching prescription:", err);
      setError(`Failed to fetch prescription: ${err.message}`);
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
    <ErrorBoundary>
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6 h-screen overflow-y-auto md:ml-64 scrollbar-hide">
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
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
          .dialog-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.75);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          .dialog-content {
            background: white;
            padding: 0;
            border-radius: 12px;
            max-width: 90%;
            width: 700px;
            max-height: 85vh;
            overflow-y: auto;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
            font-family: 'Inter', sans-serif;
          }
          .dialog-header {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            padding: 1.5rem;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .dialog-body {
            padding: 2rem;
          }
          .section-card {
            background: #f9fafb;
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            border: 1px solid #e5e7eb;
          }
          .close-button {
            background: #dc2626;
            color: white;
            padding: 0.5rem 1.5rem;
            border-radius: 9999px;
            transition: background-color 0.3s ease;
          }
          .close-button:hover {
            background: #b91c1c;
          }
          .pdf-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: #2563eb;
            font-weight: 500;
            transition: color 0.3s ease;
          }
          .pdf-link:hover {
            color: #1d4ed8;
          }
          .pdf-icon {
            width: 20px;
            height: 20px;
          }
        `}</style>
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">My Appointments</h1>

        {error && (
          <p className="text-center text-red-500 bg-red-50 p-4 rounded-lg">{error}</p>
        )}

        {appointments.length === 0 && !error ? (
          <p className="text-center text-gray-500 text-lg">No appointments booked yet.</p>
        ) : (
          appointments.map((appt) => (
            <div key={appt.id} className="border rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{appt.doctorName}</h2>
                  <p className="text-gray-600">{appt.specialization}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-700">{appt.date} at {appt.time}</p>
                  <p className="text-gray-700 capitalize font-medium">Status: {appt.status}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-3 flex-wrap">
                {appt.status === "pending" && !showPayment && (
                  <button
                    onClick={() => handleProceedToPayment(appt)}
                    className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors"
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
                    <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                      Payment Done
                    </span>
                    <button
                      onClick={() => handleDownloadReceipt(appt.id)}
                      className="bg-gray-600 text-white px-5 py-2 rounded-full hover:bg-gray-700 transition-colors"
                    >
                      Download Receipt
                    </button>
                    {appt.zoomJoinUrl && (
                      <a
                        href={appt.zoomJoinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="zoom-button bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors flex items-center"
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
                        className="bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition-colors"
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

        {showPrescriptionDialog && (
          <div className="dialog-overlay">
            <div className="dialog-content">
              <div className="dialog-header">
                <h2 className="text-2xl font-bold">Prescription Details</h2>
                <button
                  onClick={() => {
                    setShowPrescriptionDialog(false);
                    setSelectedPrescription(null);
                  }}
                  className="close-button"
                >
                  Close
                </button>
              </div>
              <div className="dialog-body">
                {selectedPrescription ? (
                  <div className="space-y-6">
                    <div className="section-card">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">Case Study</h3>
                      <div className="space-y-2">
                        <p><strong className="text-gray-700">Symptoms:</strong> {selectedPrescription.case_study?.symptoms || "N/A"}</p>
                        <p><strong className="text-gray-700">Diagnosis:</strong> {selectedPrescription.case_study?.diagnosis || "N/A"}</p>
                        <p><strong className="text-gray-700">Notes:</strong> {selectedPrescription.case_study?.notes || "N/A"}</p>
                      </div>
                    </div>
                    <div className="section-card">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">Medications</h3>
                      {selectedPrescription.items && selectedPrescription.items.length > 0 ? (
                        <ul className="list-disc pl-6 space-y-2">
                          {selectedPrescription.items.map((item, index) => (
                            <li key={index} className="text-gray-700">
                              <strong>{item.medicine_name}</strong>: {item.dosage_time}, {item.duration_days} days, 
                              Quantity: {item.quantity}, Cost per unit: ₹{item.cost_per_unit}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600">No medications prescribed.</p>
                      )}
                    </div>
                    <div className="section-card">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">Tests</h3>
                      {selectedPrescription.tests && Array.isArray(selectedPrescription.tests) && selectedPrescription.tests.length > 0 ? (
                        <ul className="list-disc pl-6 space-y-2">
                          {selectedPrescription.tests.map((test, index) => (
                            <li key={index} className="text-gray-700">
                              <strong>{test.test_name || test.name || "Unnamed Test"}</strong>
                              {test.test_description || test.description ? `: ${test.test_description || test.description}` : ""}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600">No tests prescribed.</p>
                      )}
                    </div>
                    {selectedPrescription.file_url && (
                      <div className="section-card">
                        <a
                          href={selectedPrescription.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pdf-link"
                        >
                          <svg className="pdf-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 2v20h12V2H6zm10 18H8V4h8v16zM9 6h6v2H9V6zm0 3h6v2H9V9zm0 3h6v2H9v-2zm0 3h4v2H9v-2z"/>
                          </svg>
                          View Prescription PDF
                        </a>
                      </div>
                    )}
                    <div className="section-card">
                      <p><strong className="text-gray-700">Generated At:</strong> {selectedPrescription.generated_at ? new Date(selectedPrescription.generated_at).toLocaleString() : "N/A"}</p>
                      <p><strong className="text-gray-700">Status:</strong> {selectedPrescription.status || "N/A"}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-red-500 text-center">No prescription data available.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default MyAppointment;
