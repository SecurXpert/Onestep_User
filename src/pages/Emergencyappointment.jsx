// import React, { useEffect, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { fetchWithAuth } from '../utils/api';
// import RazorpayEmergency from './RazorpayEmergency';

// const Emergencyappointment = () => {
//   const navigate = useNavigate();
//   const { isLoggedIn, user } = useContext(AuthContext);
//   const [patientInfo, setPatientInfo] = useState({
//     name: '',
//     age: '',
//     gender: '',
//     phone: '',
//     specialty: '',
//     description: '',
//     fees: '',
//   });
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [bookingStatus, setBookingStatus] = useState('');
//   const [error, setError] = useState('');
//   const [bookingForSelf, setBookingForSelf] = useState(true);
//   const [showPayment, setShowPayment] = useState(false);
//   const [appointmentId, setAppointmentId] = useState(null);
//   const [paymentCompleted, setPaymentCompleted] = useState(false);
//   const [specialties, setSpecialties] = useState([]);

//   // Fetch specialties from API
//   useEffect(() => {
//     const fetchSpecialties = async () => {
//       try {
//         const accessToken = sessionStorage.getItem('access_token');
//         if (!accessToken) {
//           throw new Error('No access token found. Please log in again.');
//         }

//         const response = await fetch('https://api.onestepmedi.com:8000/specializations/', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${accessToken}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch specialties: ${response.statusText}`);
//         }

//         const data = await response.json();
//         console.log('API Response for specialties:', data); // Debug: Log the API response

//         // Map API response to expected format
//         const formattedSpecialties = data.map(item => ({
//           specialization: item.specialization_name.charAt(0).toUpperCase() + item.specialization_name.slice(1), // Capitalize first letter
//           payment: item.emergency_consultation_fee || 0,
//         }));

//         console.log('Formatted specialties:', formattedSpecialties); // Debug: Log formatted specialties
//         setSpecialties(formattedSpecialties);
//       } catch (error) {
//         console.error('Error fetching specialties:', error.message);
//         setError(`Failed to load specialties: ${error.message}`);
//       }
//     };

//     fetchSpecialties();
//   }, []);

//   // Populate or clear user data based on bookingForSelf
//   useEffect(() => {
//     if (!isLoggedIn) {
//       alert('Please log in to book an emergency appointment.');
//       navigate('/login-register');
//       return;
//     }

//     if (user && bookingForSelf) {
//       setPatientInfo((prev) => ({
//         ...prev,
//         name: user.name || 'Unknown Patient',
//         phone: user.phone || '',
//         age: user.age || '',
//         gender: user.gender || 'Other',
//         specialty: prev.specialty,
//         description: prev.description,
//         fees: prev.fees,
//       }));
//     } else {
//       setPatientInfo((prev) => ({
//         name: '',
//         age: '',
//         gender: '',
//         phone: '',
//         specialty: prev.specialty,
//         description: prev.description,
//         fees: prev.fees,
//       }));
//     }
//   }, [isLoggedIn, navigate, user, bookingForSelf]);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'specialty') {
//       const selectedSpecialty = specialties.find((spec) => spec.specialization === value);
//       console.log('Selected specialty:', selectedSpecialty); // Debug: Log selected specialty
//       setPatientInfo((prev) => ({
//         ...prev,
//         specialty: value,
//         fees: selectedSpecialty ? selectedSpecialty.payment.toString() : '',
//       }));
//     } else {
//       setPatientInfo((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   // Handle terms and conditions checkbox
//   const handleTermsChange = (e) => {
//     setTermsAccepted(e.target.checked);
//   };

//   // Handle payment success
//   const handlePaymentSuccess = () => {
//     const saved = JSON.parse(localStorage.getItem('myAppointments') || '[]');
//     const updatedAppointments = saved.map((appt) =>
//       appt.id === appointmentId
//         ? { ...appt, payment: 'completed', status: 'confirmed' }
//         : appt
//     );
//     localStorage.setItem('myAppointments', JSON.stringify(updatedAppointments));
//     setBookingStatus('Emergency appointment booked and payment completed.');
//     setShowPayment(false);
//     setPaymentCompleted(true);
//     setTimeout(() => navigate('/myappointment'), 3500);
//   };

//   // Handle download receipt
//   const downloadReceipt = () => {
//     const receiptContent = `
//       Emergency Appointment Receipt
//       ------------------
//       Appointment ID: ${appointmentId}
//       Patient Name: ${patientInfo.name || 'Unknown Patient'}
//       Specialty: ${patientInfo.specialty || 'Unknown Specialty'}
//       Date: ${new Date().toISOString().split('T')[0]}
//       Mode: Emergency
//       Fees: ₹${patientInfo.fees || '1500'}
//       Patient Email: ${user?.email || patientInfo.phone || ''}
//       Status: Confirmed
//       Payment Status: Completed
//       Description: ${patientInfo.description || 'No description provided'}
//       ------------------
//       Generated on: ${new Date().toLocaleString()}
//     `;

//     const blob = new Blob([receiptContent], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `emergency_receipt_${appointmentId}.txt`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   // Handle form submission
//   const handleBook = async () => {
//     console.log('Starting handleBook with state:', {
//       patientInfo,
//       user,
//       bookingForSelf,
//       termsAccepted,
//     });

//     // Validation
//     const missingFields = [];
//     if (!isLoggedIn) {
//       alert('Please log in to book an appointment.');
//       navigate('/login-register');
//       return;
//     }
//     if (!user?.patient_id) {
//       alert('Your profile is incomplete. Please update your profile with a valid patient ID in the Profile section.');
//       navigate('/profilepage');
//       return;
//     }
//     if (!patientInfo.specialty) missingFields.push('Specialty');
//     if (!patientInfo.name) missingFields.push('Patient Name');
//     if (!patientInfo.age || isNaN(parseInt(patientInfo.age, 10)) || parseInt(patientInfo.age, 10) <= 0)
//       missingFields.push('Patient Age');
//     if (!patientInfo.gender) missingFields.push('Gender');
//     if (!patientInfo.phone) missingFields.push('Phone Number');
//     if (!patientInfo.description) missingFields.push('Description');
//     if (!patientInfo.fees) missingFields.push('Fees');
//     if (!termsAccepted) missingFields.push('Terms and Conditions');

//     if (missingFields.length > 0) {
//       alert(`Please fill all required fields: ${missingFields.join(', ')}.`);
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     try {
//       const appointmentData = {
//         is_self: bookingForSelf,
//         patient_id: user?.patient_id || '',
//         name: patientInfo.name || user?.name || 'Unknown Patient',
//         phone_number: patientInfo.phone || user?.phone || '',
//         age: parseInt(patientInfo.age, 10) || 0,
//         gender: patientInfo.gender || user?.gender || 'Other',
//         problem_description: patientInfo.description,
//         specialization: patientInfo.specialty,
//         fees: parseFloat(patientInfo.fees) || 1500,
//       };

//       console.log('appointmentData before sending:', JSON.stringify(appointmentData, null, 2));

//       const response = await fetchWithAuth('https://api.onestepmedi.com:8000/emergency/emergency/book', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(appointmentData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Backend validation errors:', JSON.stringify(errorData.detail, null, 2));
//         if (Array.isArray(errorData.detail)) {
//           const errorMessages = errorData.detail.map((err) => {
//             return `Field ${err.loc.join('.')} is ${err.msg.toLowerCase()}`;
//           });
//           throw new Error(errorMessages.join('; '));
//         }
//         throw new Error(errorData.detail || 'Failed to book emergency appointment');
//       }

//       const data = await response.json();
//       const appointmentId = data.appointment_id;
//       setAppointmentId(appointmentId);

//       const saved = JSON.parse(localStorage.getItem('myAppointments') || '[]');
//       const appointmentWithId = {
//         id: appointmentId,
//         date: new Date().toISOString().split('T')[0],
//         mode: 'Emergency',
//         name: 'Emergency Appointment',
//         specialty: patientInfo.specialty,
//         image: '/src/assets/emergency-icon.png',
//         fees: patientInfo.fees || '1500',
//         status: 'pending',
//         payment: 'pending',
//         patientEmail: user?.email || patientInfo.phone || '',
//         appointmentId: appointmentId,
//         userId: user?.patient_id || '',
//       };
//       localStorage.setItem('myAppointments', JSON.stringify([appointmentWithId, ...saved]));

//       setBookingStatus('Emergency appointment booked. Proceed to payment.');
//       setShowPayment(true);
//     } catch (error) {
//       console.error('Booking error:', error.message);
//       setError(`Failed to book emergency appointment: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-b3d8e4-gradient">
//       <div className="max-w-5xl mx-auto bg-white px-3 py-6 md:px-4 md:py-10">
//         <h3 className="text-lg md:text-xl font-semibold text-purple-700 mb-4 md:mb-6">Book Emergency Appointment</h3>
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
//             {error}
//           </div>
//         )}
//         <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-purple-100 mb-6 md:mb-10">
//           <div className="mb-6">
//             <label className="block text-xs md:text-sm font-semibold text-gray-800 mb-2">Specialty *</label>
//             <div className="flex items-center gap-4">
//               <select
//                 name="specialty"
//                 value={patientInfo.specialty}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border border-gray-300 rounded-md text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
//               >
//                 <option value="">Select Specialty</option>
//                 {specialties.length > 0 ? (
//                   specialties.map((spec) => (
//                     <option key={spec.specialization} value={spec.specialization}>
//                       {spec.specialization}
//                     </option>
//                   ))
//                 ) : (
//                   <option value="" disabled>
//                     No specialties available
//                   </option>
//                 )}
//               </select>
//               {patientInfo.specialty && (
//                 <span className="text-xs md:text-sm text-blue-600 font-semibold">
//                   Fees: ₹{patientInfo.fees || 'N/A'}
//                 </span>
//               )}
//             </div>
//           </div>
//           <div className="mb-6">
//             <label className="block text-xs md:text-sm font-semibold text-gray-800 mb-2">Book for</label>
//             <div className="flex gap-4">
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="bookingFor"
//                   checked={bookingForSelf}
//                   onChange={() => setBookingForSelf(true)}
//                   className="mr-2"
//                 />
//                 Self
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="bookingFor"
//                   checked={!bookingForSelf}
//                   onChange={() => setBookingForSelf(false)}
//                   className="mr-2"
//                 />
//                 Family Member
//               </label>
//             </div>
//           </div>
//           <div className="mb-6">
//             <label className="block text-xs md:text-sm font-semibold text-gray-800 mb-2">Patient Information</label>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-xs md:text-sm text-gray-600 mb-1">Patient Name *</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={patientInfo.name}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
//                   placeholder="Enter patient name"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs md:text-sm text-gray-600 mb-1">Patient Age *</label>
//                 <input
//                   type="number"
//                   name="age"
//                   value={patientInfo.age}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
//                   placeholder="Enter age"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs md:text-sm text-gray-600 mb-1">Gender *</label>
//                 <select
//                   name="gender"
//                   value={patientInfo.gender}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-xs md:text-sm text-gray-600 mb-1">Phone Number *</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={patientInfo.phone}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
//                   placeholder="Enter phone number"
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-xs md:text-sm text-gray-600 mb-1">Description *</label>
//                 <textarea
//                   name="description"
//                   value={patientInfo.description}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border border-gray-300 rounded-md text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
//                   placeholder="Describe the emergency"
//                   rows="4"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="mb-6">
//             <label className="flex items-center text-xs md:text-sm text-gray-600">
//               <input
//                 type="checkbox"
//                 checked={termsAccepted}
//                 onChange={handleTermsChange}
//                 className="mr-2"
//               />
//               I agree to the Terms and Conditions *
//             </label>
//           </div>
//           {isLoading && (
//             <p className="text-purple-600 text-xs md:text-sm mt-4">Submitting emergency appointment...</p>
//           )}
//           {bookingStatus && (
//             <p
//               className={`text-xs md:text-sm mt-4 font-semibold ${
//                 bookingStatus.includes('Failed') ? 'text-red-600' : 'text-purple-600'
//               }`}
//             >
//               {bookingStatus}
//             </p>
//           )}
//           {showPayment ? (
//             <RazorpayEmergency
//               appointmentId={appointmentId}
//               amount={parseFloat(patientInfo.fees) || 1500}
//               onSuccess={handlePaymentSuccess}
//               doctorName="Emergency Appointment"
//               patientEmail={user?.email || patientInfo.phone || ''}
//             />
//           ) : paymentCompleted ? (
//             <div className="flex items-center space-x-4 mt-4">
//               <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-md text-sm font-semibold">
//                 Payment Done
//               </span>
//               <button
//                 onClick={downloadReceipt}
//                 className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-semibold hover:bg-purple-700 transition"
//               >
//                 Download Receipt
//               </button>
//             </div>
//           ) : (
//             <button
//               disabled={isLoading || !termsAccepted}
//               onClick={handleBook}
//               className={`w-full max-w-[200px] md:max-w-xs p-2.5 md:p-3 rounded-lg font-semibold text-xs md:text-sm mt-6 ${
//                 !isLoading && termsAccepted
//                   ? 'bg-blue-600 text-white hover:bg-blue-700'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               Book Emergency Appointment
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Emergencyappointment;


import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchWithAuth } from '../utils/api';
import RazorpayEmergency from './RazorpayEmergency';

const Emergencyappointment = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(AuthContext);

  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    specialty: '',
    description: '',
    fees: '',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState('');
  const [error, setError] = useState('');
  const [bookingForSelf, setBookingForSelf] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [appointmentId, setAppointmentId] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [specialties, setSpecialties] = useState([]);

  // decorative styles only
  const DecorativeCSS = () => (
    <style>{`
      @keyframes fadeSlideUp { from { transform: translateY(6px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      .animate-fadeSlideUp { animation: fadeSlideUp .35s ease-out both; }
      .card { box-shadow: 0 10px 30px rgba(30, 58, 138, .08); }
      .ring-soft { box-shadow: 0 0 0 1px rgba(99, 102, 241, .12) inset; }
      .focus-ring:focus { outline: none; box-shadow: 0 0 0 3px rgba(99,102,241,.25); }
    `}</style>
  );

  // Fetch specialties from API
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const accessToken = sessionStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('No access token found. Please log in again.');
        }

        const response = await fetch('https://api.onestepmedi.com:8000/specializations/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch specialties: ${response.statusText}`);
        }

        const data = await response.json();

        const formattedSpecialties = data.map(item => ({
          specialization: item.specialization_name.charAt(0).toUpperCase() + item.specialization_name.slice(1),
          payment: item.emergency_consultation_fee || 0,
        }));

        setSpecialties(formattedSpecialties);
      } catch (error) {
        console.error('Error fetching specialties:', error.message);
        setError(`Failed to load specialties: ${error.message}`);
      }
    };

    fetchSpecialties();
  }, []);

  // Populate or clear user data based on bookingForSelf
  useEffect(() => {
    if (!isLoggedIn) {
      alert('Please log in to book an emergency appointment.');
      navigate('/login-register');
      return;
    }

    if (user && bookingForSelf) {
      setPatientInfo((prev) => ({
        ...prev,
        name: user.name || 'Unknown Patient',
        phone: user.phone || '',
        age: user.age || '',
        gender: user.gender || 'Other',
        specialty: prev.specialty,
        description: prev.description,
        fees: prev.fees,
      }));
    } else {
      setPatientInfo((prev) => ({
        name: '',
        age: '',
        gender: '',
        phone: '',
        specialty: prev.specialty,
        description: prev.description,
        fees: prev.fees,
      }));
    }
  }, [isLoggedIn, navigate, user, bookingForSelf]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'specialty') {
      const selectedSpecialty = specialties.find((spec) => spec.specialization === value);
      setPatientInfo((prev) => ({
        ...prev,
        specialty: value,
        fees: selectedSpecialty ? selectedSpecialty.payment.toString() : '',
      }));
    } else {
      setPatientInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle terms and conditions checkbox
  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  // Handle payment success
  const handlePaymentSuccess = () => {
    const saved = JSON.parse(localStorage.getItem('myAppointments') || '[]');
    const updatedAppointments = saved.map((appt) =>
      appt.id === appointmentId
        ? { ...appt, payment: 'completed', status: 'confirmed' }
        : appt
    );
    localStorage.setItem('myAppointments', JSON.stringify(updatedAppointments));
    setBookingStatus('Emergency appointment booked and payment completed.');
    setShowPayment(false);
    setPaymentCompleted(true);
    setTimeout(() => navigate('/myappointment'), 3500);
  };

  // Handle download receipt
  const downloadReceipt = () => {
    const receiptContent = `
      Emergency Appointment Receipt
      ------------------
      Appointment ID: ${appointmentId}
      Patient Name: ${patientInfo.name || 'Unknown Patient'}
      Specialty: ${patientInfo.specialty || 'Unknown Specialty'}
      Date: ${new Date().toISOString().split('T')[0]}
      Mode: Emergency
      Fees: ₹${patientInfo.fees || '1500'}
      Patient Email: ${user?.email || patientInfo.phone || ''}
      Status: Confirmed
      Payment Status: Completed
      Description: ${patientInfo.description || 'No description provided'}
      ------------------
      Generated on: ${new Date().toLocaleString()}
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `emergency_receipt_${appointmentId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle form submission
  const handleBook = async () => {
    console.log('Starting handleBook with state:', {
      patientInfo,
      user,
      bookingForSelf,
      termsAccepted,
    });

    // Validation
    const missingFields = [];
    if (!isLoggedIn) {
      alert('Please log in to book an appointment.');
      navigate('/login-register');
      return;
    }
    if (!user?.patient_id) {
      alert('Your profile is incomplete. Please update your profile with a valid patient ID in the Profile section.');
      navigate('/profilepage');
      return;
    }
    if (!patientInfo.specialty) missingFields.push('Specialty');
    if (!patientInfo.name) missingFields.push('Patient Name');
    if (!patientInfo.age || isNaN(parseInt(patientInfo.age, 10)) || parseInt(patientInfo.age, 10) <= 0)
      missingFields.push('Patient Age');
    if (!patientInfo.gender) missingFields.push('Gender');
    if (!patientInfo.phone) missingFields.push('Phone Number');
    if (!patientInfo.description) missingFields.push('Description');
    if (!patientInfo.fees) missingFields.push('Fees');
    if (!termsAccepted) missingFields.push('Terms and Conditions');

    if (missingFields.length > 0) {
      alert(`Please fill all required fields: ${missingFields.join(', ')}.`);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const appointmentData = {
        is_self: bookingForSelf,
        patient_id: user?.patient_id || '',
        name: patientInfo.name || user?.name || 'Unknown Patient',
        phone_number: patientInfo.phone || user?.phone || '',
        age: parseInt(patientInfo.age, 10) || 0,
        gender: patientInfo.gender || user?.gender || 'Other',
        problem_description: patientInfo.description,
        specialization: patientInfo.specialty,
        fees: parseFloat(patientInfo.fees) || 1500,
      };

      console.log('appointmentData before sending:', JSON.stringify(appointmentData, null, 2));

      const response = await fetchWithAuth('https://api.onestepmedi.com:8000/emergency/emergency/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Backend validation errors:', JSON.stringify(errorData.detail, null, 2));
        if (Array.isArray(errorData.detail)) {
          const errorMessages = errorData.detail.map((err) => {
            return `Field ${err.loc.join('.')} is ${err.msg.toLowerCase()}`;
          });
          throw new Error(errorMessages.join('; '));
        }
        throw new Error(errorData.detail || 'Failed to book emergency appointment');
      }

      const data = await response.json();
      const appointmentId = data.appointment_id;
      setAppointmentId(appointmentId);

      const saved = JSON.parse(localStorage.getItem('myAppointments') || '[]');
      const appointmentWithId = {
        id: appointmentId,
        date: new Date().toISOString().split('T')[0],
        mode: 'Emergency',
        name: 'Emergency Appointment',
        specialty: patientInfo.specialty,
        image: '/src/assets/emergency-icon.png',
        fees: patientInfo.fees || '1500',
        status: 'pending',
        payment: 'pending',
        patientEmail: user?.email || patientInfo.phone || '',
        appointmentId: appointmentId,
        userId: user?.patient_id || '',
      };
      localStorage.setItem('myAppointments', JSON.stringify([appointmentWithId, ...saved]));

      setBookingStatus('Emergency appointment booked. Proceed to payment.');
      setShowPayment(true);
    } catch (error) {
      console.error('Booking error:', error.message);
      setError(`Failed to book emergency appointment: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          'radial-gradient(120% 120% at 0% 0%, #e6f0ff 0%, #f5f7ff 40%, #ffffff 100%)',
      }}
    >
      <DecorativeCSS />

      <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="animate-fadeSlideUp bg-gradient-to-br from-white/90 to-white/70 backdrop-blur rounded-2xl p-[1px] ring-1 ring-indigo-100 card">
          <div className="bg-white rounded-2xl px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
            <h3 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-5 sm:mb-7">
              Book Emergency Appointment
            </h3>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7">
              {/* LEFT: selections + terms */}
              <section className="lg:col-span-1 space-y-5">
                {/* Specialty */}
                <div className="bg-white rounded-xl ring-1 ring-gray-100 p-4 sm:p-5">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Specialty *
                  </label>
                  <div className="flex items-center gap-3">
                    <select
                      name="specialty"
                      value={patientInfo.specialty}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus-ring focus:ring-2 focus:ring-purple-600"
                    >
                      <option value="">Select Specialty</option>
                      {specialties.length > 0 ? (
                        specialties.map((spec) => (
                          <option key={spec.specialization} value={spec.specialization}>
                            {spec.specialization}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          No specialties available
                        </option>
                      )}
                    </select>

                    {patientInfo.specialty && (
                      <span className="inline-flex items-center whitespace-nowrap px-3 py-1 rounded-full text-sm font-semibold bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200">
                        Fees: ₹{patientInfo.fees || 'N/A'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Book for */}
                <div className="bg-white rounded-xl ring-1 ring-gray-100 p-4 sm:p-5">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Book for
                  </label>
                  <div className="flex gap-5">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="bookingFor"
                        checked={bookingForSelf}
                        onChange={() => setBookingForSelf(true)}
                        className="mr-2 accent-indigo-600"
                      />
                      Self
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="bookingFor"
                        checked={!bookingForSelf}
                        onChange={() => setBookingForSelf(false)}
                        className="mr-2 accent-indigo-600"
                      />
                      Family Member
                    </label>
                  </div>
                </div>

                {/* Terms */}
                <div className="bg-white rounded-xl ring-1 ring-gray-100 p-4 sm:p-5">
                  <label className="flex items-start gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={handleTermsChange}
                      className="mt-0.5 accent-indigo-600"
                    />
                    <span>I agree to the Terms and Conditions *</span>
                  </label>
                </div>
              </section>

              {/* RIGHT: patient info */}
              <section className="lg:col-span-2 bg-white rounded-xl ring-1 ring-gray-100 p-4 sm:p-5">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Patient Information
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Patient Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={patientInfo.name}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus-ring"
                      placeholder="Enter patient name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Patient Age *
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={patientInfo.age}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus-ring"
                      placeholder="Enter age"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={patientInfo.gender}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus-ring"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={patientInfo.phone}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus-ring"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs text-gray-600 mb-1">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={patientInfo.description}
                      onChange={handleInputChange}
                      className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus-ring"
                      placeholder="Describe the emergency"
                      rows="5"
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Status & Actions */}
            <div className="mt-6 sm:mt-7">
              {isLoading && (
                <p className="text-indigo-600 text-sm">Submitting emergency appointment...</p>
              )}

              {bookingStatus && (
                <p
                  className={`text-sm mt-2 font-semibold ${
                    bookingStatus.includes('Failed') ? 'text-red-600' : 'text-indigo-700'
                  }`}
                >
                  {bookingStatus}
                </p>
              )}

              {showPayment ? (
                <div className="mt-4">
                  <RazorpayEmergency
                    appointmentId={appointmentId}
                    amount={parseFloat(patientInfo.fees) || 1500}
                    onSuccess={handlePaymentSuccess}
                    doctorName="Emergency Appointment"
                    patientEmail={user?.email || patientInfo.phone || ''}
                  />
                </div>
              ) : paymentCompleted ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4">
                  <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-md text-sm font-semibold">
                    Payment Done
                  </span>
                  <button
                    onClick={downloadReceipt}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold hover:bg-indigo-700 transition"
                  >
                    Download Receipt
                  </button>
                </div>
              ) : (
                <button
                  disabled={isLoading || !termsAccepted}
                  onClick={handleBook}
                  className={`w-full sm:w-auto px-5 py-3 rounded-lg font-semibold text-sm mt-4 shadow-md transition
                    ${
                      !isLoading && termsAccepted
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  Book Emergency Appointment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergencyappointment;
