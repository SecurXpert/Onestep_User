import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [prescriptionForms, setPrescriptionForms] = useState({});
  const [reportFiles, setReportFiles] = useState({});
  const [doctorReports, setDoctorReports] = useState([]);
  const [doctorPrescriptions, setDoctorPrescriptions] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [showNewIndicator, setShowNewIndicator] = useState(false);

  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
    if (tab === 'new') {
      setShowNewIndicator(false);
    }
  };

  useEffect(() => {
    const loggedInDoctorId = localStorage.getItem('loggedInDoctorId');
    if (!loggedInDoctorId) {
      navigate('/doctor-login');
      return;
    }

    setDoctorId(loggedInDoctorId);
    fetchDoctorAppointments(loggedInDoctorId);
    fetchDoctorReports(loggedInDoctorId);
    fetchDoctorPrescriptions(loggedInDoctorId);
  }, [navigate]);

  const fetchDoctorAppointments = (loggedInDoctorId) => {
    try {
      const allAppointments = JSON.parse(localStorage.getItem('myAppointments')) || [];
      const doctorAppointments = allAppointments
        .filter((app) => app.doctorId === loggedInDoctorId)
        .map((app) => ({
          ...app,
          status: app.status === 'paid' ? 'pending' : app.status,
          payment: app.payment || 'pending',
        }))
        .sort((a, b) => {
          const getTimestamp = (app) => {
            try {
              if (app.timestamp) {
                return new Date(app.timestamp).getTime();
              }
              const idTimestamp = parseInt(app.id.split('-')[1], 10);
              return isNaN(idTimestamp) ? 0 : idTimestamp;
            } catch {
              return 0;
            }
          };
          const timestampA = getTimestamp(a);
          const timestampB = getTimestamp(b);
          return timestampB - timestampA;
        });
      setAppointments(doctorAppointments);
      setShowNewIndicator(doctorAppointments.some((app) => app.status === 'pending'));
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setAppointments([]);
      setShowNewIndicator(false);
    }
  };

  const fetchDoctorReports = (loggedInDoctorId) => {
    try {
      const allDoctorReports = JSON.parse(localStorage.getItem('doctorReports')) || [];
      const filteredReports = allDoctorReports.filter(
        (report) => report.doctorId === loggedInDoctorId
      );
      setDoctorReports(filteredReports);
    } catch (error) {
      console.error('Error fetching doctor reports:', error);
      setDoctorReports([]);
    }
  };

  const fetchDoctorPrescriptions = (loggedInDoctorId) => {
    try {
      const allDoctorPrescriptions = JSON.parse(localStorage.getItem('doctorPrescriptions')) || [];
      const filteredPrescriptions = allDoctorPrescriptions.filter(
        (pres) => pres.doctorId === loggedInDoctorId
      );
      setDoctorPrescriptions(filteredPrescriptions);
    } catch (error) {
      console.error('Error fetching doctor prescriptions:', error);
      setDoctorPrescriptions([]);
    }
  };

  const updateStatus = (id, newStatus) => {
    try {
      const allAppointments = JSON.parse(localStorage.getItem('myAppointments')) || [];
      const updatedAppointments = allAppointments.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      );
      localStorage.setItem('myAppointments', JSON.stringify(updatedAppointments));
      fetchDoctorAppointments(doctorId);
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  const handlePrescriptionChange = (e, appointmentId) => {
    const { name, value } = e.target;
    setPrescriptionForms((prev) => ({
      ...prev,
      [appointmentId]: {
        ...(prev[appointmentId] || {}),
        [name]: value,
      },
    }));
  };

  const compressImage = (file, maxSizeKB = 100) => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          let width = img.width;
          let height = img.height;
          const maxDimension = 800;

          if (width > height) {
            if (width > maxDimension) {
              height = Math.round((height * maxDimension) / width);
              width =

 maxDimension;
            }
          } else {
            if (height > maxDimension) {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          let quality = 0.9;
          let dataUrl;
          do {
            dataUrl = canvas.toDataURL('image/jpeg', quality);
            quality -= 0.1;
          } while (dataUrl.length / 1024 > maxSizeKB && quality > 0.1);

          resolve({ name: file.name, data: dataUrl });
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const getLocalStorageSize = () => {
    let total = 0;
    for (const x in localStorage) {
      if (localStorage.hasOwnProperty(x)) {
        total += ((localStorage[x].length + x.length) * 2);
      }
    }
    return total / 1024;
  };

  const handleReportFileChange = async (e, appointmentId) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      try {
        const compressedFile = await compressImage(file, 100);
        setReportFiles((prev) => ({
          ...prev,
          [appointmentId]: compressedFile,
        }));
      } catch (error) {
        console.error('Error compressing image:', error);
        alert('Failed to process image. Please try a smaller file.');
      }
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const handleSendPrescription = (appointment) => {
    const form = prescriptionForms[appointment.id] || {};
    if (!form.medications || !form.instructions) {
      alert('Please fill out both medications and instructions.');
      return;
    }

    try {
      const allPrescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];
      const allDoctorPrescriptions = JSON.parse(localStorage.getItem('doctorPrescriptions')) || [];
      const patientEmail = appointment.patient?.contact;

      if (!/\S+@\S+\.\S+/.test(patientEmail)) {
        alert('Invalid or missing patient email. Cannot send prescription.');
        return;
      }

      const newPrescription = {
        id: `prescription-${Date.now()}`,
        appointmentId: appointment.id,
        patientEmail,
        doctorName: appointment.name || 'Unknown',
        doctorId: doctorId,
        date: new Date().toLocaleDateString(),
        timestamp: new Date().toISOString(),
        medications: form.medications.split('\n').filter((med) => med.trim()),
        instructions: form.instructions,
      };

      allPrescriptions.push(newPrescription);
      localStorage.setItem('prescriptions', JSON.stringify(allPrescriptions));

      allDoctorPrescriptions.push(newPrescription);
      localStorage.setItem('doctorPrescriptions', JSON.stringify(allDoctorPrescriptions));
      setDoctorPrescriptions((prev) => [...prev, newPrescription]);

      if (reportFiles[appointment.id]) {
        const allReports = JSON.parse(localStorage.getItem('reports')) || [];
        const allDoctorReports = JSON.parse(localStorage.getItem('doctorReports')) || [];
        const newReport = {
          id: `report-${Date.now()}`,
          appointmentId: appointment.id,
          patientEmail,
          doctorName: appointment.name || 'Unknown',
          doctorId: doctorId,
          date: new Date().toLocaleDateString(),
          fileName: reportFiles[appointment.id].name,
          fileData: reportFiles[appointment.id].data,
        };

        const currentStorageSizeKB = getLocalStorageSize();
        const newReportSizeKB = (JSON.stringify(newReport).length * 2) / 1024;
        const estimatedTotalSizeKB = currentStorageSizeKB + newReportSizeKB;

        if (estimatedTotalSizeKB > 5120) {
          alert('Storage limit exceeded. Please clear some data from localStorage or use a smaller file.');
          return;
        }

        allReports.push(newReport);
        localStorage.setItem('reports', JSON.stringify(allReports));

        allDoctorReports.push(newReport);
        localStorage.setItem('doctorReports', JSON.stringify(allDoctorReports));
        setDoctorReports((prev) => [...prev, newReport]);
      }

      const event = new Event('prescriptionUpdated');
      window.dispatchEvent(event);

      setPrescriptionForms((prev) => ({
        ...prev,
        [appointment.id]: undefined,
      }));

      setReportFiles((prev) => ({
        ...prev,
        [appointment.id]: undefined,
      }));

      alert('Prescription and report (if uploaded) sent successfully!');
    } catch (error) {
      console.error('Error sending prescription:', error);
      alert('Failed to send prescription. Please try again or clear localStorage.');
    }
  };

  const handleSendVirtualLink = (appointment) => {
    try {
      const allNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
      const meetingLink = `https://meet.example.com/appointment-${appointment.id}-${Date.now()}`;
      const newNotification = {
        id: `notification-${Date.now()}`,
        appointmentId: appointment.id,
        patientEmail: appointment.patient?.contact,
        message: `Join your virtual appointment with Dr. ${appointment.name || 'Unknown'} here: ${meetingLink}`,
        timestamp: new Date().toISOString(),
        read: false,
      };

      allNotifications.push(newNotification);
      localStorage.setItem('notifications', JSON.stringify(allNotifications));

      const event = new Event('notificationUpdated');
      window.dispatchEvent(event);

      alert('Virtual meeting link sent successfully!');
    } catch (error) {
      console.error('Error sending virtual meeting link:', error);
      alert('Failed to send virtual meeting link. Please try again.');
    }
  };

  const handleOpenRescheduleModal = (appointment) => {
    setSelectedAppointment(appointment);
    setNewDate(appointment.date);
    setNewTime(appointment.time);
    setIsRescheduleModalOpen(true);
    setIsDetailsModalOpen(false);
  };

  const handleRescheduleAppointment = () => {
    if (!selectedAppointment) return;

    if (!newDate || !newTime) {
      alert('Please select both date and time.');
      return;
    }

    const selectedDateTime = new Date(`${newDate} ${newTime}`);
    const now = new Date();
    if (selectedDateTime <= now) {
      alert('Please select a future date and time.');
      return;
    }

    try {
      const allAppointments = JSON.parse(localStorage.getItem('myAppointments')) || [];
      const appointmentToUpdate = allAppointments.find((app) => app.id === selectedAppointment.id);
      if (!appointmentToUpdate) {
        alert('Appointment not found.');
        return;
      }

      const newTimeString = selectedDateTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      const newDateString = selectedDateTime.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });

      const updatedAppointments = allAppointments.map((app) =>
        app.id === selectedAppointment.id
          ? { ...app, date: newDateString, time: newTimeString }
          : app
      );
      localStorage.setItem('myAppointments', JSON.stringify(updatedAppointments));

      const allNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
      const newNotification = {
        id: `notification-${Date.now()}`,
        appointmentId: selectedAppointment.id,
        patientEmail: selectedAppointment.patient?.contact,
        message: `Appointment rescheduled to ${newDateString} at ${newTimeString}.`,
        timestamp: new Date().toISOString(),
        read: false,
      };

      allNotifications.push(newNotification);
      localStorage.setItem('notifications', JSON.stringify(allNotifications));

      const event = new Event('notificationUpdated');
      window.dispatchEvent(event);

      fetchDoctorAppointments(doctorId);

      setIsRescheduleModalOpen(false);
      setSelectedAppointment(null);
      setNewDate('');
      setNewTime('');

      alert('Appointment rescheduled and notification sent!');
    } catch (error) {
      console.error('Error rescheduling appointment:', error);
      alert('Failed to reschedule appointment. Please try again.');
    }
  };

  const handleSendReminderNotification = (appointment) => {
    try {
      const allNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
      const newNotification = {
        id: `notification-${Date.now()}`,
        appointmentId: appointment.id,
        patientEmail: appointment.patient?.contact,
        message: `Reminder: Please attend your appointment on ${appointment.date} at ${appointment.time}.`,
        timestamp: new Date().toISOString(),
        read: false,
      };

      allNotifications.push(newNotification);
      localStorage.setItem('notifications', JSON.stringify(allNotifications));

      const event = new Event('notificationUpdated');
      window.dispatchEvent(event);

      alert('Reminder notification sent!');
    } catch (error) {
      console.error('Error sending reminder notification:', error);
      alert('Failed to send reminder notification. Please try again.');
    }
  };

  const handleDownloadReport = (report) => {
    if (!report?.fileData) return;
    try {
      const link = document.createElement('a');
      link.href = report.fileData;
      link.download = report.fileName || `report-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Failed to download report. Please try again.');
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('loggedInDoctorId');
      navigate('/doctor-login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const filteredAppointments = appointments
    .filter((app) => {
      if (activeTab === 'all') return true;
      if (activeTab === 'new') return app.status === 'pending';
      if (activeTab === 'confirmed') return app.status === 'confirmed';
      if (activeTab === 'rejected') return app.status === 'rejected';
      return false;
    })
    .filter((app) => {
      if (!searchQuery) return true;
      const name = app.patient?.name?.toLowerCase() || '';
      const email = app.patient?.contact?.toLowerCase() || '';
      const query = searchQuery.toLowerCase();
      return name.includes(query) || email.includes(query);
    });

  const handleOpenDetailsModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-blue-700 text-white flex flex-col transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0 transition-transform duration-300 z-50`}
      >
        <div className="p-4 text-2xl font-bold border-b border-blue-800">
          Menu
        </div>
        <nav className="flex-1 flex flex-col p-4 space-y-2">
          <button
            className={`w-full text-left px-4 py-2 rounded-lg text-sm font-semibold transition relative ${
              activeTab === 'new' ? 'bg-blue-800 text-white' : 'hover:bg-blue-600'
            }`}
            onClick={() => handleTabChange('new')}
          >
            New Appointments
            {showNewIndicator && (
              <span className="absolute top-2 right-2 h-3 w-3 bg-red-500 rounded-full"></span>
            )}
          </button>
          <button
            className={`w-full text-left px-4 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === 'confirmed' ? 'bg-blue-800 text-white' : 'hover:bg-blue-600'
            }`}
            onClick={() => handleTabChange('confirmed')}
          >
            Confirmed Appointments
          </button>
          <button
            className={`w-full text-left px-4 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === 'all' ? 'bg-blue-800 text-white' : 'hover:bg-blue-600'
            }`}
            onClick={() => handleTabChange('all')}
          >
            All Appointments
          </button>
          <button
            className={`w-full text-left px-4 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === 'rejected' ? 'bg-blue-800 text-white' : 'hover:bg-blue-600'
            }`}
            onClick={() => handleTabChange('rejected')}
          >
            Rejected Appointments
          </button>
        </nav>
      </div>

      <div className="flex-1 sm:ml-64 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <button
                className="sm:hidden text-blue-700 text-2xl"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              >
                {isSidebarOpen ? <FaTimes /> : <FaBars />}
              </button>
              <h2 className="text-2xl font-bold text-purple-700">Doctor Dashboard</h2>
            </div>
            <button onClick={handleLogout} className="text-red-500 underline hover:text-red-600">
              Logout
            </button>
          </div>

          <div className="mb-6 flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by patient name or email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition text-sm"
            >
              Search
            </button>
          </div>

          {isRescheduleModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h3 className="text-lg font-semibold text-purple-700 mb-4">
                  Reschedule Appointment
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">
                      New Date
                    </label>
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full border p-2 rounded text-sm"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">
                      New Time
                    </label>
                    <input
                      type="time"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full border p-2 rounded text-sm"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-2">
                  <button
                    onClick={() => setIsRescheduleModalOpen(false)}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRescheduleAppointment}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
                  >
                    Confirm Reschedule
                  </button>
                </div>
              </div>
            </div>
          )}

          {isDetailsModalOpen && selectedAppointment && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                <h3 className="text-lg font-semibold text-purple-700 mb-4">
                  Appointment Details
                </h3>
                <div className="text-sm space-y-2">
                  <p>
                    <strong>Patient:</strong> {selectedAppointment.patient?.name || 'N/A'}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedAppointment.patient?.contact || 'N/A'}
                  </p>
                  {selectedAppointment.mode === 'Home Visit' && (
                    <p>
                      <strong>Address:</strong> {selectedAppointment.patient?.address || 'N/A'}
                    </p>
                  )}
                  <p>
                    <strong>Date:</strong> {selectedAppointment.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {selectedAppointment.time}
                  </p>
                  <p>
                    <strong>Mode:</strong> {selectedAppointment.mode}
                  </p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span
                      className={`font-semibold ${
                        selectedAppointment.status === 'confirmed'
                          ? 'text-green-600'
                          : selectedAppointment.status === 'rejected'
                          ? 'text-red-600'
                          : 'text-yellow-500'
                      }`}
                    >
                      {selectedAppointment.status}
                    </span>
                  </p>
                  <p>
                    <strong>Payment:</strong>{' '}
                    <span
                      className={`font-semibold ${
                        selectedAppointment.payment === 'paid' ? 'text-green-600' : 'text-yellow-500'
                      }`}
                    >
                      {selectedAppointment.payment || 'pending'}
                    </span>
                  </p>
                  <div className="flex space-x-2 mt-4">
                    {selectedAppointment.status === 'pending' && (
                      <>
                        <button
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                          onClick={() => {
                            updateStatus(selectedAppointment.id, 'confirmed');
                            setIsDetailsModalOpen(false);
                          }}
                        >
                          Confirm
                        </button>
                        <button
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                          onClick={() => {
                            updateStatus(selectedAppointment.id, 'rejected');
                            setIsDetailsModalOpen(false);
                          }}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {selectedAppointment.status === 'confirmed' && (
                      <>
                        <button
                          className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition"
                          onClick={() => handleOpenRescheduleModal(selectedAppointment)}
                        >
                          Reschedule
                        </button>
                        <button
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                          onClick={() => {
                            handleSendReminderNotification(selectedAppointment);
                            setIsDetailsModalOpen(false);
                          }}
                        >
                          Send Reminder
                        </button>
                        <button
                          className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition"
                          onClick={() => {
                            handleSendVirtualLink(selectedAppointment);
                            setIsDetailsModalOpen(false);
                          }}
                        >
                          Send Virtual Link
                        </button>
                      </>
                    )}
                  </div>
                  {selectedAppointment.status === 'confirmed' && (
                    <div className="mt-4">
                      {doctorPrescriptions.find((pres) => pres.appointmentId === selectedAppointment.id) ? (
                        <p className="text-green-600 font-semibold text-sm">
                          Prescription Sent Successfully
                        </p>
                      ) : (
                        <>
                          <h4 className="text-sm font-semibold text-gray-800">Send Prescription</h4>
                          <textarea
                            name="medications"
                            value={prescriptionForms[selectedAppointment.id]?.medications || ''}
                            onChange={(e) => handlePrescriptionChange(e, selectedAppointment.id)}
                            placeholder="Enter medications (one per line)"
                            className="w-full border p-2 rounded mt-2 text-sm"
                            rows="3"
                          />
                          <textarea
                            name="instructions"
                            value={prescriptionForms[selectedAppointment.id]?.instructions || ''}
                            onChange={(e) => handlePrescriptionChange(e, selectedAppointment.id)}
                            placeholder="Enter instructions"
                            className="w-full border p-2 rounded mt-2 text-sm"
                            rows="3"
                          />
                          <div className="mt-2">
                            <label className="block text-sm font-semibold text-gray-800 mb-1">
                              Upload Report (Image)
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleReportFileChange(e, selectedAppointment.id)}
                              className="w-full border p-2 rounded text-sm"
                            />
                            {reportFiles[selectedAppointment.id]?.name && (
                              <p className="text-sm text-gray-600 mt-1">
                                Selected: {reportFiles[selectedAppointment.id].name}
                              </p>
                            )}
                          </div>
                          <button
                            className="bg-blue-600 text-white px-3 py-1 rounded mt-2 hover:bg-blue-700 transition text-sm"
                            onClick={() => {
                              handleSendPrescription(selectedAppointment);
                              setIsDetailsModalOpen(false);
                            }}
                          >
                            Send Prescription
                          </button>
                        </>
                      )}
                      {doctorPrescriptions.find((pres) => pres.appointmentId === selectedAppointment.id) && (
                        <div className="mt-4 flex flex-col sm:flex-row sm:justify-between gap-4">
                          <div className="flex-1 bg-white shadow-md rounded-lg p-4 border border-gray-200">
                            <div className="flex flex-col space-y-2">
                              <div className="flex justify-between items-center">
                                <h3 className="text-sm font-semibold text-purple-700">
                                  Prescription for {selectedAppointment.patient?.name || 'N/A'}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                  Date: {doctorPrescriptions.find((pres) => pres.appointmentId === selectedAppointment.id)?.date || 'N/A'}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-800 font-medium text-sm">Medications:</p>
                                <ul className="list-disc pl-5 text-gray-600 text-sm">
                                  {doctorPrescriptions.find((pres) => pres.appointmentId === selectedAppointment.id)?.medications?.map((med, index) => (
                                    <li key={index}>{med}</li>
                                  )) || <li>No medications available</li>}
                                </ul>
                              </div>
                              <div>
                                <p className="text-gray-800 font-medium text-sm">Instructions:</p>
                                <p className="text-gray-600 text-sm">
                                  {doctorPrescriptions.find((pres) => pres.appointmentId === selectedAppointment.id)?.instructions || 'N/A'}
                                </p>
                              </div>
                            </div>
                          </div>
                          {doctorReports.find((report) => report.appointmentId === selectedAppointment.id) && (
                            <div className="sm:w-1/3 flex flex-col items-center">
                              <img
                                src={doctorReports.find((report) => report.appointmentId === selectedAppointment.id).fileData}
                                alt="Report"
                                className="mt-2 max-w-full h-auto rounded-lg"
                                style={{ maxHeight: '200px' }}
                              />
                              <button
                                onClick={() =>
                                  handleDownloadReport(
                                    doctorReports.find((report) => report.appointmentId === selectedAppointment.id)
                                  )
                                }
                                className="mt-2 flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-full hover:bg-green-700 transition shadow-md text-sm"
                              >
                                <span className="text-sm font-semibold">Download</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setIsDetailsModalOpen(false)}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {filteredAppointments.length === 0 ? (
            <p className="text-gray-500 text-center">
              No {activeTab === 'all' ? 'appointments' : activeTab === 'new' ? 'new appointments' : activeTab === 'confirmed' ? 'confirmed appointments' : 'rejected appointments'} available.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAppointments.map((app) => (
                <div
                  key={app.id}
                  className="bg-white border p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
                  onClick={() => handleOpenDetailsModal(app)}
                >
                  <p className="text-sm">
                    <strong>Patient:</strong> {app.patient?.name || 'N/A'}
                  </p>
                  <p className="text-sm">
                    <strong>Email:</strong> {app.patient?.contact || 'N/A'}
                  </p>
                  <p className="text-sm">
                    <strong>Date:</strong> {app.date}
                  </p>
                  <p className="text-sm">
                    <strong>Payment:</strong>{' '}
                    <span
                      className={`font-semibold ${
                        app.payment === 'paid' ? 'text-green-600' : 'text-yellow-500'
                      }`}
                    >
                      {app.payment || 'pending'}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;

