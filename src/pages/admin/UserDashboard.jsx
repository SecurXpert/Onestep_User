import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AppContext } from "../../context/AppContext";
import { FaBell } from "react-icons/fa";

const NotificationCard = ({ id, message, timestamp, onDismiss }) => {
  const formatISTTime = (timestamp) => {
    if (!timestamp) return 'Time not available';
    try {
      const dateObj = new Date(timestamp);
      return dateObj.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }) + ' IST';
    } catch {
      return 'Time not available';
    }
  };

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-md shadow-sm flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-700">{message}</p>
        <p className="text-xs text-gray-500">{formatISTTime(timestamp)}</p>
      </div>
      <button
        onClick={() => onDismiss(id)}
        className="text-red-500 hover:text-red-600 text-xs font-medium"
      >
        Dismiss
      </button>
    </div>
  );
};

const PrescriptionCard = ({ id, doctorName, date, medications, instructions, report, onBookMedicine, timestamp }) => {
  const [isBooking, setIsBooking] = useState(false);
  const [orderType, setOrderType] = useState('full');
  const [customQuantities, setCustomQuantities] = useState({});

  const { topdoctors } = useContext(AppContext);

  const getInitials = (name) => {
    if (!name || name === 'Unknown') return 'Dr';
    const names = name.split(' ');
    return names.map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const doctor = topdoctors.find((doc) => doc.name === doctorName);
  const doctorImage = doctor ? doctor.image : null;

  const formatISTTime = (timestamp) => {
    if (!timestamp) return 'Time not available';
    try {
      const dateObj = new Date(timestamp);
      return dateObj.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }) + ' IST';
    } catch {
      return 'Time not available';
    }
  };

  const handleQuantityChange = (med, value) => {
    setCustomQuantities((prev) => ({
      ...prev,
      [med]: value,
    }));
  };

  const handleBookMedicine = () => {
    const quantities = orderType === 'full'
      ? medications.reduce((acc, med) => ({ ...acc, [med]: 1 }), {})
      : customQuantities;

    if (orderType === 'custom' && Object.keys(quantities).length !== medications.length) {
      alert('Please specify quantities for all medications.');
      return;
    }

    const paymentConfirmed = window.confirm('Proceed with prepaid payment for the order?');
    if (!paymentConfirmed) {
      alert('Payment cancelled. Order not placed.');
      return;
    }

    onBookMedicine(id, quantities);
    setIsBooking(false);
    setCustomQuantities({});
    setOrderType('full');
  };

  const handleDownloadReport = () => {
    if (!report?.fileData) return;
    try {
      const link = document.createElement('a');
      link.href = report.fileData;
      link.download = report.fileName || `report-${id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Failed to download report. Please try again.');
    }
  };

  const order = JSON.parse(localStorage.getItem('pharmacyOrders') || '[]').find(
    (o) => o.prescriptionId === id
  );

  const statusSteps = ['Order Placed', 'Packed', 'In Transit', 'Delivered'];
  const currentStatusIndex = order ? statusSteps.indexOf(order.status) : -1;

  return (
    <div className="bg-white shadow-sm rounded-lg p-3 border border-gray-100 hover:shadow-md transition">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            {doctorImage ? (
              <img
                src={doctorImage}
                alt={doctorName}
                className="w-10 h-10 rounded-full object-cover shadow-sm"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-base font-medium shadow-sm">
                {getInitials(doctorName)}
              </div>
            )}
            <div>
              <h3 className="text-base font-semibold text-purple-700">
                Dr. {doctorName}
              </h3>
              <p className="text-xs text-gray-500">
                {date} | {formatISTTime(timestamp)}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-700 font-medium">Medications:</p>
            <ul className="list-disc pl-4 text-sm text-gray-600">
              {medications.map((med, index) => (
                <li key={index}>{med}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm text-gray-700 font-medium">Instructions:</p>
            <p className="text-sm text-gray-600 line-clamp-2">{instructions}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsBooking(!isBooking)}
              className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700 transition"
            >
              {isBooking ? 'Cancel' : 'Book Medicine'}
            </button>
            {/* {report && (
              <button
                onClick={handleDownloadReport}
                className="bg-green-600 text-white text-xs px-3 py-1 rounded hover:bg-green-700 transition"
              >
                Download Report
              </button>
            )} */}
          </div>
          {isBooking && (
            <div className="mt-2 p-2 border rounded bg-gray-50">
              <p className="text-xs font-medium text-gray-700">Order Type:</p>
              <select
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                className="w-full border p-1 rounded text-xs mt-1"
              >
                <option value="full">Full Course</option>
                <option value="custom">Custom Quantity</option>
              </select>
              {orderType === 'custom' && (
                <div className="mt-2">
                  <p className="text-xs font-medium text-gray-700">Quantities:</p>
                  {medications.map((med, index) => (
                    <div key={index} className="flex items-center gap-2 mt-1">
                      <label className="text-xs text-gray-600">{med}:</label>
                      <input
                        type="number"
                        min="0"
                        value={customQuantities[med] || ''}
                        onChange={(e) => handleQuantityChange(med, e.target.value)}
                        className="w-16 border p-1 rounded text-xs"
                        placeholder="Qty"
                      />
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={handleBookMedicine}
                className="mt-2 bg-green-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700 transition"
              >
                Confirm Order
              </button>
            </div>
          )}
          {order && (
            <div className="mt-2">
              <p className="text-xs text-gray-700 font-medium">Delivery Status:</p>
              <div className="flex items-center gap-1 mt-1">
                {statusSteps.map((step, index) => (
                  <div key={step} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs text-white ${
                        index <= currentStatusIndex ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <p className="text-xs text-gray-600 mt-1 text-center line-clamp-1">{step}</p>
                    {index < statusSteps.length - 1 && (
                      <div
                        className={`h-1 flex-1 w-full mt-1 ${
                          index < currentStatusIndex ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          <p className="text-xs text-gray-400 mt-2">
            ID: <span className="font-mono">{id}</span>
          </p>
        </div>
        {report && (
        <div className="flex-shrink-0 w-full sm:w-40">
  <img
    src={report.fileData}
    alt="Report"
    className="w-full h-auto rounded object-cover"
    style={{ maxHeight: '120px' }}
  />
  <div className="flex justify-center">
    <button
      onClick={handleDownloadReport}
      className="bg-green-600 text-white text-xs mt-3 px-3 py-2 rounded hover:bg-green-700 transition"
    >
      Download Report
    </button>
  </div>
</div>
          
        )}
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [profile, setProfile] = useState({});
  const [newAddress, setNewAddress] = useState('');
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(false);

  useEffect(() => {
    try {
      const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
      setProfile(savedProfile);
    } catch (error) {
      console.error('Error loading profile from localStorage:', error);
    }
  }, []);

  const fetchPrescriptions = () => {
    try {
      const allPrescriptions = JSON.parse(localStorage.getItem("prescriptions")) || [];
      const allReports = JSON.parse(localStorage.getItem("reports")) || [];
      const userPrescriptions = allPrescriptions
        .filter((pres) => pres.patientEmail === user?.email)
        .map((pres) => {
          const report = allReports.find((r) => r.appointmentId === pres.appointmentId);
          return { ...pres, report };
        });
      console.log("User email:", user?.email);
      console.log("All prescriptions:", allPrescriptions);
      console.log("All reports:", allReports);
      console.log("Filtered prescriptions:", userPrescriptions);
      setPrescriptions(userPrescriptions);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      setPrescriptions([]);
    }
  };

  const fetchNotifications = () => {
    try {
      const allNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
      const userNotifications = allNotifications.filter(
        (notif) => notif.patientEmail === user?.email && !notif.read
      );
      console.log("User notifications:", userNotifications);
      setNotifications(userNotifications);
      setShowNotificationBadge(userNotifications.length > 0);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
      setShowNotificationBadge(false);
    }
  };

  const handleDismissNotification = (notificationId) => {
    try {
      const allNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
      const updatedNotifications = allNotifications.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      );
      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
      fetchNotifications();
    } catch (error) {
      console.error('Error dismissing notification:', error);
      alert('Failed to dismiss notification. Please try again.');
    }
  };

  const handleBookMedicine = (prescriptionId, quantities) => {
    try {
      const prescription = prescriptions.find((p) => p.id === prescriptionId);
      if (!prescription) {
        alert('Prescription not found.');
        return;
      }

      const deliveryAddress = newAddress || profile.address || 'Not Provided';

      const allOrders = JSON.parse(localStorage.getItem('pharmacyOrders') || '[]');
      const newOrder = {
        id: `order-${Date.now()}`,
        prescriptionId,
        patientEmail: prescription.patientEmail,
        doctorName: prescription.doctorName || 'Unknown',
        medications: Object.entries(quantities).map(([med, qty]) => ({ name: med, quantity: qty })),
        report: prescription.report,
        status: 'Order Placed',
        date: new Date().toLocaleDateString(),
        address: deliveryAddress,
      };

      allOrders.push(newOrder);
      localStorage.setItem('pharmacyOrders', JSON.stringify(allOrders));

      const event = new Event('pharmacyOrderUpdated');
      window.dispatchEvent(event);

      alert('Order placed successfully and forwarded to pharmacy!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order');
    }
  };

  const handleSaveAddress = () => {
    if (!newAddress.trim()) {
      alert('Please enter a valid address.');
      return;
    }
    try {
      const updatedProfile = { ...profile, address: newAddress };
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      setProfile(updatedProfile);
      setNewAddress('');
      setIsAddingAddress(false);
      alert('Address saved successfully!');
    } catch (error) {
      console.error('Error saving address to localStorage:', error);
      alert('Failed to save address. Please try again.');
    }
  };

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setShowNotificationBadge(false); // Hide badge when viewing notifications
    }
  };

  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate('/login-register');
      return;
    }

    console.log("User:", user);
    fetchPrescriptions();
    fetchNotifications();

    const handlePrescriptionChange = () => {
      console.log('Prescription changed');
      fetchPrescriptions();
    };

    const handleOrderChange = () => {
      console.log('Order changed');
      fetchPrescriptions();
    };

    const handleNotificationChange = () => {
      console.log('Notification changed');
      fetchNotifications();
    };

    const handleVisibility = () => {
      if (document.readyState == 'complete') {
        console.log('Tab is active');
        fetchPrescriptions();
        fetchNotifications();
      }
    };

    window.addEventListener('prescriptionUpdated', handlePrescriptionChange);
    window.addEventListener('pharmacyOrderUpdated', handleOrderChange);
    window.addEventListener('notificationUpdated', handleNotificationChange);
    document.addEventListener('readystatechange', handleVisibility);

    return () => {
      window.removeEventListener('prescriptionUpdated', handlePrescriptionChange);
      window.removeEventListener('pharmacyOrderUpdated', handleOrderChange);
      window.removeEventListener('notificationUpdated', handleNotificationChange);
      document.removeEventListener('readystatechange', handleVisibility);
    };
  }, [isLoggedIn, user, navigate]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">My Prescriptions</h1>
          <div className="relative">
            <button
              onClick={handleToggleNotifications}
              className="text-gray-600 hover:text-gray-800 transition"
            >
              <FaBell className="text-xl" />
              {showNotificationBadge && notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
          </div>
        </div>
        {/* <button
          onClick={() => navigate("/myappointment")}
          className="bg-purple-600 text-white text-sm px-4 py-2 rounded-md hover:bg-purple-700 transition"
        >
          View Appointments
        </button> */}
      </div>
      {/* Notifications Section */}
      {showNotifications && (
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100">
          <h2 className="text-lg font-semibold text-purple-700 mb-3">Notifications</h2>
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-500">No new notifications.</p>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  id={notification.id}
                  message={notification.message}
                  timestamp={notification.timestamp}
                  onDismiss={handleDismissNotification}
                />
              ))}
            </div>
          )}
        </div>
      )}
      {/* Address Section */}
      <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100">
        <p className="text-sm text-gray-700 font-medium">Delivery Address:</p>
        <p className="text-sm text-gray-600">{profile.address || 'Not Provided'}</p>
        <button
          onClick={() => setIsAddingAddress(!isAddingAddress)}
          className="mt-2 text-blue-600 text-sm hover:underline"
        >
          {isAddingAddress ? 'Cancel' : 'Add New Address'}
        </button>
        {isAddingAddress && (
          <div className="mt-2 space-y-2">
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Enter new address"
              className="w-full border p-2 rounded text-sm"
            />
            <button
              onClick={handleSaveAddress}
              className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700 transition"
            >
              Save Address
            </button>
          </div>
        )}
      </div>
      {/* Prescriptions Section */}
      {prescriptions.length === 0 ? (
        <p className="text-center text-sm text-gray-500">No prescriptions available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prescriptions.slice().reverse().map((prescription) => (
            <PrescriptionCard
              key={prescription.id}
              id={prescription.id}
              doctorName={prescription.doctorName}
              date={prescription.date}
              medications={prescription.medications}
              instructions={prescription.instructions}
              report={prescription.report}
              onBookMedicine={handleBookMedicine}
              timestamp={prescription.timestamp}
            />
          ))}
        </div>
      )}
      <button
        className="bg-red-600 text-white text-sm px-4 py-2 rounded-md hover:bg-red-700 transition"
        onClick={() => {
          localStorage.removeItem('prescriptions');
          localStorage.removeItem('reports');
          localStorage.removeItem('pharmacyOrders');
          localStorage.removeItem('notifications');
          window.location.reload();
        }}
      >
        Clear All
      </button>
    </div>
  );
};

export default UserDashboard;





// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const DoctorDashboard = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [doctorId, setDoctorId] = useState('');
//   const [prescriptionForms, setPrescriptionForms] = useState({});
//   const [reportFiles, setReportFiles] = useState({});
//   const [doctorReports, setDoctorReports] = useState([]);
//   const [doctorPrescriptions, setDoctorPrescriptions] = useState([]);
//   const [activeTab, setActiveTab] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loggedInDoctorId = localStorage.getItem('loggedInDoctorId');
//     if (!loggedInDoctorId) {
//       navigate('/doctor-login');
//       return;
//     }

//     setDoctorId(loggedInDoctorId);
//     fetchDoctorAppointments(loggedInDoctorId);
//     fetchDoctorReports(loggedInDoctorId);
//     fetchDoctorPrescriptions(loggedInDoctorId);
//   }, [navigate]);

//   const fetchDoctorAppointments = (loggedInDoctorId) => {
//     try {
//       const allAppointments = JSON.parse(localStorage.getItem('myAppointments')) || [];
//       const doctorAppointments = allAppointments
//         .filter((app) => app.doctorId === loggedInDoctorId)
//         .map((app) => ({
//           ...app,
//           status: app.status === 'paid' ? 'pending' : app.status,
//           payment: app.status === 'paid' ? 'paid' : app.payment,
//         }))
//         .sort((a, b) => {
//           const getDateTime = (app) => {
//             try {
//               return new Date(`${app.date} ${app.time || '12:00 AM'}`);
//             } catch {
//               return new Date(app.date || '1970-01-01');
//             }
//           };
//           const dateTimeA = getDateTime(a);
//           const dateTimeB = getDateTime(b);
//           return dateTimeA - dateTimeB; // Sorts newest first
//         });
//       console.log('Doctor appointments:', doctorAppointments);
//       setAppointments(doctorAppointments);
//     } catch (error) {
//       console.error('Error fetching appointments:', error);
//       setAppointments([]);
//     }
//   };

//   const fetchDoctorReports = (loggedInDoctorId) => {
//     try {
//       const allDoctorReports = JSON.parse(localStorage.getItem('doctorReports')) || [];
//       const filteredReports = allDoctorReports.filter(
//         (report) => report.doctorId === loggedInDoctorId
//       );
//       console.log('Doctor reports:', filteredReports);
//       setDoctorReports(filteredReports);
//     } catch (error) {
//       console.error('Error fetching doctor reports:', error);
//       setDoctorReports([]);
//     }
//   };

//   const fetchDoctorPrescriptions = (loggedInDoctorId) => {
//     try {
//       const allDoctorPrescriptions = JSON.parse(localStorage.getItem('doctorPrescriptions')) || [];
//       const filteredPrescriptions = allDoctorPrescriptions.filter(
//         (pres) => pres.doctorId === loggedInDoctorId
//       );
//       console.log('Doctor prescriptions:', filteredPrescriptions);
//       setDoctorPrescriptions(filteredPrescriptions);
//     } catch (error) {
//       console.error('Error fetching doctor prescriptions:', error);
//       setDoctorPrescriptions([]);
//     }
//   };

//   const updateStatus = (id, newStatus) => {
//     try {
//       const allAppointments = JSON.parse(localStorage.getItem('myAppointments')) || [];
//       const updatedAppointments = allAppointments.map((app) =>
//         app.id === id ? { ...app, status: newStatus } : app
//       );
//       localStorage.setItem('myAppointments', JSON.stringify(updatedAppointments));
//       fetchDoctorAppointments(doctorId);
//     } catch (error) {
//       console.error('Error updating appointment status:', error);
//     }
//   };

//   const handlePrescriptionChange = (e, appointmentId) => {
//     const { name, value } = e.target;
//     setPrescriptionForms((prev) => ({
//       ...prev,
//       [appointmentId]: {
//         ...(prev[appointmentId] || {}),
//         [name]: value,
//       },
//     }));
//   };

//   const handleReportFileChange = (e, appointmentId) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith('image/')) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setReportFiles((prev) => ({
//           ...prev,
//           [appointmentId]: {
//             name: file.name,
//             data: reader.result,
//           },
//         }));
//       };
//       reader.readAsDataURL(file);
//     } else {
//       alert('Please upload a valid image file.');
//     }
//   };

//   const handleSendPrescription = (appointment) => {
//     const form = prescriptionForms[appointment.id] || {};
//     if (!form.medications || !form.instructions) {
//       alert('Please fill out both medications and instructions.');
//       return;
//     }

//     try {
//       const allPrescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];
//       const allDoctorPrescriptions = JSON.parse(localStorage.getItem('doctorPrescriptions')) || [];
//       const patientEmail = appointment.patient?.contact;

//       if (!patientEmail || patientEmail === 'N/A' || !/\S+@\S+\.\S+/.test(patientEmail)) {
//         alert('Invalid or missing patient email. Cannot send prescription.');
//         return;
//       }

//       const newPrescription = {
//         id: `prescription-${Date.now()}`,
//         appointmentId: appointment.id,
//         patientEmail,
//         doctorName: appointment.name || 'Unknown',
//         doctorId: doctorId,
//         date: new Date().toLocaleDateString(),
//         timestamp: new Date().toISOString(),
//         medications: form.medications.split('\n').filter((med) => med.trim()),
//         instructions: form.instructions,
//       };

//       console.log('New prescription:', newPrescription);

//       allPrescriptions.push(newPrescription);
//       localStorage.setItem('prescriptions', JSON.stringify(allPrescriptions));

//       allDoctorPrescriptions.push(newPrescription);
//       localStorage.setItem('doctorPrescriptions', JSON.stringify(allDoctorPrescriptions));
//       setDoctorPrescriptions((prev) => [...prev, newPrescription]);

//       if (reportFiles[appointment.id]) {
//         const allReports = JSON.parse(localStorage.getItem('reports')) || [];
//         const allDoctorReports = JSON.parse(localStorage.getItem('doctorReports')) || [];
//         const newReport = {
//           id: `report-${Date.now()}`,
//           appointmentId: appointment.id,
//           patientEmail,
//           doctorName: appointment.name || 'Unknown',
//           doctorId: doctorId,
//           date: new Date().toLocaleDateString(),
//           fileName: reportFiles[appointment.id].name,
//           fileData: reportFiles[appointment.id].data,
//         };

//         allReports.push(newReport);
//         localStorage.setItem('reports', JSON.stringify(allReports));

//         allDoctorReports.push(newReport);
//         localStorage.setItem('doctorReports', JSON.stringify(allDoctorReports));
//         setDoctorReports((prev) => [...prev, newReport]);
//       }

//       const event = new Event('prescriptionUpdated');
//       window.dispatchEvent(event);

//       setPrescriptionForms((prev) => ({
//         ...prev,
//         [appointment.id]: undefined,
//       }));

//       setReportFiles((prev) => ({
//         ...prev,
//         [appointment.id]: undefined,
//       }));

//       alert('Prescription and report (if uploaded) sent successfully!');
//     } catch (error) {
//       console.error('Error sending prescription:', error);
//       alert('Failed to send prescription. Please try again.');
//     }
//   };

//   const handleDownloadReport = (report) => {
//     if (!report?.fileData) return;
//     try {
//       const link = document.createElement('a');
//       link.href = report.fileData;
//       link.download = report.fileName || `report-${Date.now()}.png`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       console.error('Error downloading report:', error);
//       alert('Failed to download report. Please try again.');
//     }
//   };

//   const handleLogout = () => {
//     try {
//       localStorage.removeItem('loggedInDoctorId');
//       navigate('/doctor-login');
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };

//   const handleSearch = () => {
//     console.log('Searching for:', searchQuery);
//   };

//   const filteredAppointments = appointments
//     .filter((app) => {
//       if (activeTab === 'all') return true;
//       if (activeTab === 'new') return app.status === 'pending';
//       if (activeTab === 'confirmed') return app.status === 'confirmed';
//       if (activeTab === 'rejected') return app.status === 'rejected';
//       return false;
//     })
//     .filter((app) => {
//       if (!searchQuery) return true;
//       const name = app.patient?.name?.toLowerCase() || '';
//       const email = app.patient?.contact?.toLowerCase() || '';
//       const query = searchQuery.toLowerCase();
//       return name.includes(query) || email.includes(query);
//     });

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     setSearchQuery('');
//     setIsSidebarOpen(false);
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 w-64 bg-blue-700 text-white flex flex-col transform ${
//           isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } sm:translate-x-0 transition-transform duration-300 z-50`}
//       >
//         <div className="p-4 text-2xl font-bold border-b border-blue-800">
//           Menu
//         </div>
//         <nav className="flex-1 flex flex-col p-4 space-y-2">
//           <button
//             className={`w-full text-left px-4 py-2 rounded-lg text-sm font-semibold transition ${
//               activeTab === 'new' ? 'bg-blue-800 text-white' : 'hover:bg-blue-600'
//             }`}
//             onClick={() => handleTabChange('new')}
//           >
//             New Appointments
//           </button>
//           <button
//             className={`w-full text-left px-4 py-2 rounded-lg text-sm font-semibold transition ${
//               activeTab === 'confirmed' ? 'bg-blue-800 text-white' : 'hover:bg-blue-600'
//             }`}
//             onClick={() => handleTabChange('confirmed')}
//           >
//             Confirmed Appointments
//           </button>
//           <button
//             className={`w-full text-left px-4 py-2 rounded-lg text-sm font-semibold transition ${
//               activeTab === 'all' ? 'bg-blue-800 text-white' : 'hover:bg-blue-600'
//             }`}
//             onClick={() => handleTabChange('all')}
//           >
//             All Appointments
//           </button>
//           <button
//             className={`w-full text-left px-4 py-2 rounded-lg text-sm font-semibold transition ${
//               activeTab === 'rejected' ? 'bg-blue-800 text-white' : 'hover:bg-blue-600'
//             }`}
//             onClick={() => handleTabChange('rejected')}
//           >
//             Rejected Appointments
//           </button>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 sm:ml-64 p-6">
//         <div className="max-w-3xl mx-auto">
//           {/* Header */}
//           <div className="flex justify-between items-center mb-6">
//             <div className="flex items-center gap-4">
//               <button
//                 className="sm:hidden text-blue-700 text-2xl"
//                 onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               >
//                 ☰
//               </button>
//               <h2 className="text-2xl font-bold text-purple-700">Doctor Dashboard</h2>
//             </div>
//             <button onClick={handleLogout} className="text-red-500 underline hover:text-red-600">
//               Logout
//             </button>
//           </div>

//           {/* Search Bar */}
//           <div className="mb-6 flex">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search by patient name or email"
//               className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
//             />
//             <button
//               onClick={handleSearch}
//               className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition text-sm"
//             >
//               Search
//             </button>
//           </div>

//           {/* Appointments */}
//           {filteredAppointments.length === 0 ? (
//             <p className="text-gray-500 text-center">
//               No {activeTab === 'all' ? 'appointments' : activeTab === 'new' ? 'new appointments' : activeTab === 'confirmed' ? 'confirmed appointments' : 'rejected appointments'} available.
//             </p>
//           ) : (
//             <div className="space-y-4">
//               {filteredAppointments.map((app) => (
//                 <div key={app.id} className="border p-4 rounded-lg shadow-sm bg-white">
//                   <div className="flex justify-between items-center">
//                     <div className="text-sm">
//                       <p>
//                         <strong>Patient:</strong> {app.patient?.name || 'N/A'}
//                       </p>
//                       <p>
//                         <strong>Email:</strong> {app.patient?.contact || 'N/A'}
//                       </p>
//                       {app.mode === 'Home Visit' && (
//                         <p>
//                           <strong>Address:</strong> {app.patient?.address || 'N/A'}
//                         </p>
//                       )}
//                       <p>
//                         <strong>Date:</strong> {app.date}
//                       </p>
//                       <p>
//                         <strong>Time:</strong> {app.time}
//                       </p>
//                       <p>
//                         <strong>Mode:</strong> {app.mode}
//                       </p>
//                       <p>
//                         <strong>Status:</strong>{' '}
//                         <span
//                           className={`font-semibold ${
//                             app.status === 'confirmed'
//                               ? 'text-green-600'
//                               : app.status === 'rejected'
//                               ? 'text-red-600'
//                               : 'text-yellow-500'
//                           }`}
//                         >
//                           {app.status}
//                         </span>
//                       </p>
//                       <p>
//                         <strong>Payment:</strong>{' '}
//                         <span
//                           className={`font-semibold ${
//                             app.payment === 'paid' ? 'text-green-600' : 'text-yellow-500'
//                           }`}
//                         >
//                           {app.payment || 'pending'}
//                         </span>
//                       </p>
//                     </div>
//                     {app.status === 'pending' && (
//                       <div className="space-x-2">
//                         <button
//                           className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
//                           onClick={() => updateStatus(app.id, 'confirmed')}
//                         >
//                           Confirm
//                         </button>
//                         <button
//                           className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
//                           onClick={() => updateStatus(app.id, 'rejected')}
//                         >
//                           Reject
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                   {app.status === 'confirmed' && (
//                     <div className="mt-4">
//                       {doctorPrescriptions.find((pres) => pres.appointmentId === app.id) ? (
//                         <p className="text-green-600 font-semibold text-sm">
//                           Prescription Sent Successfully
//                         </p>
//                       ) : (
//                         <>
//                           <h4 className="text-sm font-semibold text-gray-800">Send Prescription</h4>
//                           <textarea
//                             name="medications"
//                             value={prescriptionForms[app.id]?.medications || ''}
//                             onChange={(e) => handlePrescriptionChange(e, app.id)}
//                             placeholder="Enter medications (one per line)"
//                             className="w-full border p-2 rounded mt-2 text-sm"
//                             rows="3"
//                           />
//                           <textarea
//                             name="instructions"
//                             value={prescriptionForms[app.id]?.instructions || ''}
//                             onChange={(e) => handlePrescriptionChange(e, app.id)}
//                             placeholder="Enter instructions"
//                             className="w-full border p-2 rounded mt-2 text-sm"
//                             rows="3"
//                           />
//                           <div className="mt-2">
//                             <label className="block text-sm font-semibold text-gray-800 mb-1">
//                               Upload Report (Image)
//                             </label>
//                             <input
//                               type="file"
//                               accept="image/*"
//                               onChange={(e) => handleReportFileChange(e, app.id)}
//                               className="w-full border p-2 rounded text-sm"
//                             />
//                             {reportFiles[app.id]?.name && (
//                               <p className="text-sm text-gray-600 mt-1">
//                                 Selected: {reportFiles[app.id].name}
//                               </p>
//                             )}
//                           </div>
//                           <button
//                             className="bg-blue-600 text-white px-3 py-1 rounded mt-2 hover:bg-blue-700 transition text-sm"
//                             onClick={() => handleSendPrescription(app)}
//                           >
//                             Send Prescription
//                           </button>
//                         </>
//                       )}
//                       {doctorPrescriptions.find((pres) => pres.appointmentId === app.id) && (
//                         <div className="mt-4 flex flex-col sm:flex-row sm:justify-between gap-4">
//                           <div className="flex-1 bg-white shadow-md rounded-lg p-4 border border-gray-200">
//                             <div className="flex flex-col space-y-2">
//                               <div className="flex justify-between items-center">
//                                 <h3 className="text-sm font-semibold text-purple-700">
//                                   Prescription for {app.patient?.name || 'N/A'}
//                                 </h3>
//                                 <p className="text-gray-600 text-sm">
//                                   Date: {doctorPrescriptions.find((pres) => pres.appointmentId === app.id)?.date || 'N/A'}
//                                 </p>
//                               </div>
//                               <div>
//                                 <p className="text-gray-800 font-medium text-sm">Medications:</p>
//                                 <ul className="list-disc pl-5 text-gray-600 text-sm">
//                                   {doctorPrescriptions.find((pres) => pres.appointmentId === app.id)?.medications?.map((med, index) => (
//                                     <li key={index}>{med}</li>
//                                   )) || <li>No medications available</li>}
//                                 </ul>
//                               </div>
//                               <div>
//                                 <p className="text-gray-800 font-medium text-sm">Instructions:</p>
//                                 <p className="text-gray-600 text-sm">
//                                   {doctorPrescriptions.find((pres) => pres.appointmentId === app.id)?.instructions || 'N/A'}
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                           {doctorReports.find((report) => report.appointmentId === app.id) && (
//                             <div className="sm:w-1/3 flex flex-col items-center">
//                               <img
//                                 src={doctorReports.find((report) => report.appointmentId === app.id).fileData}
//                                 alt="Report"
//                                 className="mt-2 max-w-full h-auto rounded-lg"
//                                 style={{ maxHeight: '200px' }}
//                               />
//                               <button
//                                 onClick={() =>
//                                   handleDownloadReport(
//                                     doctorReports.find((report) => report.appointmentId === app.id)
//                                   )
//                                 }
//                                 className="mt-2 flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-full hover:bg-green-700 transition shadow-md text-sm"
//                               >
//                                 <span className="text-sm font-semibold">Download</span>
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;