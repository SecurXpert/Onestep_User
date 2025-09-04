


// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const AppointmentCard = ({
//   id,
//   doctor_id,
//   date,
//   time,
//   mode,
//   name,
//   specialty,
//   image,
//   fees,
//   status,
//   payment,
//   patientEmail,
//   appointmentId,
//   userId,
// }) => {
//   const navigate = useNavigate();

//   const handlePaymentRedirect = () => {
//     navigate(`/appointment/${doctor_id}`, {
//       state: {
//         appointmentId,
//         amount: parseFloat(fees) || 200,
//         doctorName: name,
//         patientEmail,
//       },
//     });
//   };

//   const downloadReceipt = async () => {
//     try {
//       const response = await fetch(`http://api.onestepmedi.com:8000/payment/${appointmentId}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           // Add authentication headers if required, e.g.:
//           // 'Authorization': `Bearer ${yourTokenHere}`,
//         },
//       });

//       if (!response.ok) {
//         if (response.status === 404) {
//           throw new Error(`Receipt not found for appointment ID: ${appointmentId}. Please verify the appointment ID.`);
//         }
//         throw new Error(`Failed to fetch receipt: ${response.status} ${response.statusText}`);
//       }

//       const data = await response.json();
//       const receiptUrl = data.receipt_url;

//       if (!receiptUrl) {
//         throw new Error('Receipt URL not provided in the response.');
//       }

//       // Create a temporary link to download the PDF
//       const link = document.createElement('a');
//       link.href = receiptUrl;
//       link.download = `receipt_${appointmentId}.pdf`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       console.error('Error downloading receipt:', error.message);
//       alert(`Failed to download receipt: ${error.message}`);
//     }
//   };

//   return (
//     <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-200 mb-4 flex flex-col md:flex-row items-start md:items-center justify-between">
//       <div className="flex items-center space-x-4">
//         <img
//           src={image || '/src/assets/default-doctor.png'}
//           alt={name}
//           className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
//         />
//         <div>
//           <h2 className="text-lg md:text-xl font-semibold text-gray-800">{name || 'Unknown Doctor'}</h2>
//           <p className="text-sm md:text-base text-gray-600">{specialty || 'Unknown Specialty'}</p>
//           <p className="text-sm text-gray-500">Date: {date}</p>
//           <p className="text-sm text-gray-500">Time: {time}</p>
//           <p className="text-sm text-gray-500">Mode: {mode}</p>
//           <p className="text-sm text-gray-500">Fees: ₹{fees || '200'}</p>
//           <p className="text-sm text-gray-500">Status: {status || 'Pending'}</p>
//           <p className="text-sm text-gray-500">Email: {patientEmail}</p>
//         </div>
//       </div>
//       <div className="mt-4 md:mt-0 flex space-x-2">
//         {payment === 'completed' ? (
//           <>
//             <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-md text-sm font-semibold">
//               Payment Done
//             </span>
//             <button
//               onClick={downloadReceipt}
//               className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-semibold hover:bg-purple-700 transition"
//             >
//               Download Receipt
//             </button>
//           </>
//         ) : payment === 'not_required' ? (
//           <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-semibold">
//             Payment Not Required
//           </span>
//         ) : (
//           <button
//             onClick={handlePaymentRedirect}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition"
//           >
//             Proceed to Pay
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AppointmentCard;


import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppointmentCard = ({
  id,
  doctor_id,
  date,
  time,
  mode,
  name,
  specialty,
  image,
  fees,
  status,
  payment,
  patientEmail,
  appointmentId,
  userId,
}) => {
  const navigate = useNavigate();

  const handlePaymentRedirect = () => {
    navigate(`/appointment/${doctor_id}`, {
      state: {
        appointmentId,
        amount: parseFloat(fees) || 200,
        doctorName: name,
        patientEmail,
      },
    });
  };

  const downloadReceipt = async () => {
    try {
      // Determine the endpoint based on appointmentId prefix
      const isEmergency = appointmentId.startsWith('EMG');
      const endpoint = isEmergency
        ? `https://api.onestepmedi.com:8000/emergency/receipt/${appointmentId}`
        : `https://api.onestepmedi.com:8000/payment/${appointmentId}`;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers if required, e.g.:
          // 'Authorization': `Bearer ${yourTokenHere}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Receipt not found for appointment ID: ${appointmentId}. Please verify the appointment ID.`);
        }
        throw new Error(`Failed to fetch receipt: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const receiptUrl = data.receipt_url;

      if (!receiptUrl) {
        throw new Error('Receipt URL not provided in the response.');
      }

      // Create a temporary link to download the PDF
      const link = document.createElement('a');
      link.href = receiptUrl;
      link.download = `receipt_${appointmentId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading receipt:', error.message);
      alert(`Failed to download receipt: ${error.message}`);
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-200 mb-4 flex flex-col md:flex-row items-start md:items-center justify-between">
      <div className="flex items-center space-x-4">
        <img
          src={image || '/src/assets/default-doctor.png'}
          alt={name}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">{name || 'Unknown Doctor'}</h2>
          <p className="text-sm md:text-base text-gray-600">{specialty || 'Unknown Specialty'}</p>
          <p className="text-sm text-gray-500">Date: {date}</p>
          <p className="text-sm text-gray-500">Time: {time}</p>
          <p className="text-sm text-gray-500">Mode: {mode}</p>
          <p className="text-sm text-gray-500">Fees: ₹{fees || '200'}</p>
          <p className="text-sm text-gray-500">Status: {status || 'Pending'}</p>
          <p className="text-sm text-gray-500">Email: {patientEmail}</p>
        </div>
      </div>
      <div className="mt-4 md:mt-0 flex space-x-2">
        {payment === 'completed' ? (
          <>
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-md text-sm font-semibold">
              Payment Done
            </span>
            <button
              onClick={downloadReceipt}
              className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-semibold hover:bg-purple-700 transition"
            >
              Download Receipt
            </button>
          </>
        ) : payment === 'not_required' ? (
          <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-semibold">
            Payment Not Required
          </span>
        ) : (
          <button
            onClick={handlePaymentRedirect}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition"
          >
            Proceed to Pay
          </button>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;